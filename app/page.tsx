"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star, Phone, MapPin, Clock, User, LogOut } from "lucide-react";
import { stripeProducts, type StripeProduct } from "@/src/stripe-config";
import { supabase } from "@/lib/supabase";
import { 
  getCartFromStorage, 
  addToCart, 
  getCartTotal, 
  getCartItemCount,
  type CartItem 
} from "@/lib/cart";

// Google Maps component that only renders on client
function GoogleMapsSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="rounded-2xl overflow-hidden shadow-xl bg-gray-200 flex items-center justify-center" style={{ height: '400px' }}>
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: '400px' }}>
      <iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyAP3z24jYgZ3LiQqTpTkSiLVFjZc5lqIdg&q=Õismäe+tee+107,+Tallinn,+Estonia&zoom=15"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Jessylilled - Lillepood asukoht Õismäe tee 107, Tallinn"
      ></iframe>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [subscription, setSubscription] = useState<any>(null);

  // Load cart and user data on component mount
  useEffect(() => {
    const loadData = async () => {
      // Load cart
      const cart = getCartFromStorage();
      setCartItems(cart);

      // Load user
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Load subscription if user exists
      if (user) {
        const { data: subscriptionData } = await supabase
          .from('stripe_user_subscriptions')
          .select('*')
          .maybeSingle();
        
        setSubscription(subscriptionData);
      }
    };

    loadData();

    // Listen for cart updates
    const handleCartUpdate = () => {
      const cart = getCartFromStorage();
      setCartItems(cart);
    };

    // Listen for auth changes
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        
        if (session?.user) {
          const { data: subscriptionData } = await supabase
            .from('stripe_user_subscriptions')
            .select('*')
            .maybeSingle();
          
          setSubscription(subscriptionData);
        } else {
          setSubscription(null);
        }
      }
    );

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      authSubscription.unsubscribe();
    };
  }, []);

  const addFlowerToCart = (flower: StripeProduct, quantity: number = 1) => {
    const cartItem: Omit<CartItem, 'quantity'> = {
      id: flower.id,
      name: flower.name,
      price: flower.price,
      image: getFlowerImage(flower.name),
      description: flower.description,
      stripePriceId: flower.priceId
    };
    
    addToCart(cartItem, quantity);
    
    // Update local state
    const updatedCart = getCartFromStorage();
    setCartItems(updatedCart);
    
    // Dispatch event to update other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const getFlowerImage = (name: string): string => {
    const imageMap: { [key: string]: string } = {
      'Roos': 'https://res.cloudinary.com/effichat/image/upload/v1753343986/ju1fgyinhpnhzqhpnkbx.png',
      'Nelk': 'https://res.cloudinary.com/effichat/image/upload/v1753343988/hb7jhbqh4pjugiletnsp.png',
      'Krüsanteem': 'https://res.cloudinary.com/effichat/image/upload/v1753343985/ntyhjwvcfkrbmlcqbaes.png',
      'Iiris': 'https://res.cloudinary.com/effichat/image/upload/v1753343990/yx07lu1jufzjbzowipue.png',
      'Liilia': 'https://res.cloudinary.com/effichat/image/upload/v1753343990/jsk3sv3fzxpsaa7ekdhw.png'
    };
    return imageMap[name] || '';
  };

  const getItemQuantityInCart = (productId: string): number => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (cartItems.length === 0) return;

    setIsLoading(true);
    
    try {
      // Get user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      // For now, let's use the old format but with multiple items
      // If multiple items, we'll use the first item for now and note this limitation
      const firstItem = cartItems[0];
      
      if (!firstItem.stripePriceId) {
        throw new Error(`Toote "${firstItem.name}" hinnainfo puudub`);
      }

      console.log('Attempting checkout with:', {
        price_id: firstItem.stripePriceId,
        quantity: firstItem.quantity
      });

      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: firstItem.stripePriceId,
          success_url: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${window.location.origin}/`,
          mode: 'payment'
        }),
      });

      const data = await response.json();
      
      console.log('Response from Stripe function:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
      
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSubscription(null);
  };

  // Smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-purple-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://www.jessylilled.ee/_next/static/media/logo.26ea0e97.svg" 
                alt="Jessylilled Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-gray-900">Jessylilled</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#avaleht" className="text-gray-700 hover:text-purple-600 transition-colors">Avaleht</a>
              <a href="#lilled" className="text-gray-700 hover:text-purple-600 transition-colors">Lilled</a>
              <a href="#meist" className="text-gray-700 hover:text-purple-600 transition-colors">Meist</a>
              <a href="#kontakt" className="text-gray-700 hover:text-purple-600 transition-colors">Kontakt</a>
            </nav>
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {subscription && subscription.subscription_status === 'active' && (
                    <Badge className="bg-green-100 text-green-700">
                      Aktiivne tellimus
                    </Badge>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleSignOut}
                    className="text-gray-700 hover:text-purple-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logi välja
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => router.push('/auth/login')}
                    className="text-gray-700 hover:text-purple-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Logi sisse
                  </Button>
                </div>
              )}
              <Button 
                variant="outline" 
                className="relative border-purple-300 hover:bg-purple-50"
                onClick={() => router.push('/checkout')}
                disabled={getCartItemCount(cartItems) === 0}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ostukorv
                {getCartItemCount(cartItems) > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                    {getCartItemCount(cartItems)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* New Hero Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Värsked <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Lilled</span>
                  <br />
                  60 sekundiga
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Saada suurepäraseid lillekimpe, mis on loodud kõikideks puhkudeks. 
                  Kaunis seade, armastusega valmistatud.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-white hover:bg-gray-50 border border-gray-200 px-8 shadow-md"
                  onClick={() => scrollToSection('lilled')}
                >
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 bg-clip-text text-transparent font-semibold">
                    Osta Kohe
                  </span>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-gray-300 hover:bg-gray-50"
                  onClick={() => scrollToSection('kaart')}
                >
                  Leia Meid
                </Button>
              </div>

              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 text-sm px-4 py-2 w-fit">
                🎉 5% allahindlus esimesele tellimusele
              </Badge>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                    <div className="w-8 h-8 bg-yellow-400 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">1000+</p>
                    <p className="text-sm text-gray-600">Rahulolev klient</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-purple-600 fill-current" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gray-900">100+</p>
                    <p className="text-sm text-gray-600">Kliendi arvustust</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://lh3.googleusercontent.com/gps-cs-s/AC9h4nq5W6zWs_twY5dtQG0hVUwtCZFgEH6lf7FTz6IQD6bVzz_kfp92C_DbX5TmpAHCRLO2D3y2t988Duamog9dx4d6IB-K6g3M8CcOap2xHeFul9zLLd-auuYV8dCdJhAGaZXzJRyI=s1360-w1360-h1020-rw"
                  alt="Kaunis lillekimp"
                  className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-xl"
                />
              </div>
              
              {/* Background decorative elements */}
              <div className="absolute top-8 right-8 w-32 h-32 bg-yellow-300 rounded-2xl -z-10"></div>
              <div className="absolute bottom-8 left-8 w-24 h-24 bg-coral-400 rounded-2xl -z-10"></div>
              <div className="absolute top-1/2 -right-4 w-16 h-16 bg-purple-300 rounded-full -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 text-lg px-4 py-2">
              ✨ Värskeid lilli igaks puhuks
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Populaarsed <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">Lilled</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Avasta meie kaunite lillede valikut. Iga lill on hoolikalt valitud ja värskelt kohale toodud.
            </p>
          </div>
        </div>
      </section>

      {/* Flowers Grid */}
      <section id="lilled" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {stripeProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={getFlowerImage(product.name)}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-600">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">{product.price.toFixed(2)}€</span>
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        1 tk
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addFlowerToCart(product, -1)}
                        disabled={getItemQuantityInCart(product.id) === 0}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {getItemQuantityInCart(product.id)}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => addFlowerToCart(product, 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white ml-4 px-1.5 py-0.5 text-xs h-6"
                      onClick={() => {
                        if (getItemQuantityInCart(product.id) === 0) {
                          // Add item to cart and go to checkout
                          addFlowerToCart(product, 1);
                          router.push('/checkout');
                        } else {
                          // Item already in cart, go to checkout
                          router.push('/checkout');
                        }
                      }}
                    >
                      {getItemQuantityInCart(product.id) === 0 ? 'Lisa korvi' : 'Ostma'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {getCartItemCount(cartItems) > 0 && (
        <section className="py-8 bg-purple-50 border-t border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-900">
                  Ostukorvis: {getCartItemCount(cartItems)} tk
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  Kokku: {getCartTotal(cartItems).toFixed(2)}€
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => router.push('/checkout')}
                disabled={isLoading}
              >
                Vormista tellimus
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="meist" className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-yellow-100 text-yellow-700">Meist</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Värskeid lilli juba üle 10 aasta
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Jessylilled on Eesti juhtiv lillepood, mis pakub kõige värskemaid ja kaunimaid lilli. 
                Meie kogemus ja kirg lillede vastu tagab, et iga klient saab parima teeninduse.
              </p>
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">500+</p>
                  <p className="text-sm text-gray-600">Rahulolev klient</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-3xl font-bold text-purple-600">4.9</p>
                  <p className="text-sm text-gray-600">Keskmine hinnang</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
src="https://lh3.googleusercontent.com/p/AF1QipMZL3iL1yZRhAMjI8NqhGJ0hjta0kP2fb_ezuIk=s1360-w1360-h1020-rw"
                alt="Lillepoe sisevaade"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-green-100 text-green-700">Kontakt</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Külasta meie poodi või telli veebist
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Aadress</h3>
                  <p className="text-gray-600">Õismäe tee 107, Tallinn</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Telefon</h3>
                  <p className="text-gray-600">+372 5380 2101</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-md">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lahtiolekuajad</h3>
                  <p className="text-gray-600">E-R 9-19 L 10-17 P 10-17</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section id="kaart" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-blue-100 text-blue-700">Asukoht</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Leia meid kaardilt
            </h2>
            <p className="text-lg text-gray-600">
              Külasta meie poodi Tallinnas või telli mugavalt veebist
            </p>
          </div>
          
          <GoogleMapsSection />
        </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <Badge className="bg-yellow-100 text-yellow-700">Arvustused</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Mida meie kliendid ütlevad
            </h2>
            <p className="text-lg text-gray-600">
              Loe päriseid arvustusi meie rahulolevatelt klientidelt
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8">
            <div className='sk-ww-google-reviews' data-embed-id='25581234'></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://www.jessylilled.ee/_next/static/media/logo.26ea0e97.svg" 
                  alt="Jessylilled Logo" 
                  className="h-8 w-auto"
                />
                <span className="text-xl font-bold">Jessylilled</span>
              </div>
              <p className="text-gray-400">
                Kaunid lilleseaded igaks eluhetkeks.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kiirlingid</h3>
              <div className="space-y-2">
                <a href="#avaleht" className="block text-gray-400 hover:text-white transition-colors">Avaleht</a>
                <a href="#lilled" className="block text-gray-400 hover:text-white transition-colors">Lilled</a>
                <a href="#meist" className="block text-gray-400 hover:text-white transition-colors">Meist</a>
                <a href="#kontakt" className="block text-gray-400 hover:text-white transition-colors">Kontakt</a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Kontaktinfo</h3>
              <div className="space-y-2 text-gray-400">
                <p>Õismäe tee 107</p>
                <p>Tallinn, Eesti</p>
                <p>+372 5380 2101</p>
                <p>jessylilled107@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 Jessy OÜ. Kõik õigused kaitstud.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}