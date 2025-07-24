"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Plus, Minus, Star, Phone, MapPin, Clock } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface Flower {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const flowers: Flower[] = [
  {
    id: "roos",
    name: "Roos",
    price: 3,
    image: "https://res.cloudinary.com/effichat/image/upload/v1753343986/ju1fgyinhpnhzqhpnkbx.png",
    description: "Klassikaline punane roos"
  },
  {
    id: "nelk",
    name: "Nelk",
    price: 2,
    image: "https://res.cloudinary.com/effichat/image/upload/v1753343988/hb7jhbqh4pjugiletnsp.png",
    description: "Värviline nelk"
  },
  {
    id: "krusanteem",
    name: "Krüsanteem",
    price: 4,
    image: "https://res.cloudinary.com/effichat/image/upload/v1753343985/ntyhjwvcfkrbmlcqbaes.png",
    description: "Kaunis krüsanteem"
  },
  {
    id: "iiris",
    name: "Iiris",
    price: 2,
    image: "https://res.cloudinary.com/effichat/image/upload/v1753343990/yx07lu1jufzjbzowipue.png",
    description: "Sinine iiris"
  },
  {
    id: "liilia",
    name: "Liilia",
    price: 7,
    image: "https://res.cloudinary.com/effichat/image/upload/v1753343990/jsk3sv3fzxpsaa7ekdhw.png",
    description: "Roosa liilia"
  }
];

export default function Home() {
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = (flowerId: string, change: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      const currentQuantity = newCart[flowerId] || 0;
      const newQuantity = Math.max(0, currentQuantity + change);
      
      if (newQuantity === 0) {
        delete newCart[flowerId];
      } else {
        newCart[flowerId] = newQuantity;
      }
      
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [flowerId, quantity]) => {
      const flower = flowers.find(f => f.id === flowerId);
      return sum + (flower ? flower.price * quantity : 0);
    }, 0);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create line items for Stripe
      const lineItems = Object.entries(cart).map(([flowerId, quantity]) => {
        const flower = flowers.find(f => f.id === flowerId);
        if (!flower) return null;
        
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: flower.name,
              description: flower.description,
              images: [flower.image],
            },
            unit_amount: flower.price * 100, // Stripe expects cents
          },
          quantity: quantity,
        };
      }).filter(Boolean);

      // In a real application, you would send this to your backend
      // For demo purposes, we'll simulate the checkout
      console.log('Checkout items:', lineItems);
      
      // Simulate successful checkout
      setTimeout(() => {
        alert('Aitäh ostu eest! Teie tellimus on vastu võetud.');
        setCart({});
        setIsLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Viga tellimuse esitamisel. Palun proovige uuesti.');
      setIsLoading(false);
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
              <Button 
                variant="outline" 
                className="relative border-purple-300 hover:bg-purple-50"
                onClick={() => getTotalItems() > 0 && handleCheckout()}
                disabled={getTotalItems() === 0 || isLoading}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Ostukorv
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs">
                    {getTotalItems()}
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
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
                  Osta Kohe
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
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
            {flowers.map((flower) => (
              <Card key={flower.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden">
                <div className="relative">
                  <img 
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">{flower.name}</h3>
                    <p className="text-sm text-gray-600">{flower.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-purple-600">{flower.price}€</span>
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
                        onClick={() => updateQuantity(flower.id, -1)}
                        disabled={!cart[flower.id]}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">
                        {cart[flower.id] || 0}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(flower.id, 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      onClick={() => updateQuantity(flower.id, 1)}
                    >
                      Lisa korvi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Summary */}
      {getTotalItems() > 0 && (
        <section className="py-8 bg-purple-50 border-t border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <p className="text-lg font-semibold text-gray-900">
                  Ostukorvis: {getTotalItems()} tk
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  Kokku: {getTotalPrice()}€
                </p>
              </div>
              <Button 
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Töötleb...' : 'Maksa kohe'}
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
      <section className="py-16 bg-gray-50">
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
          
          <div className="rounded-2xl overflow-hidden shadow-xl" style={{ height: '400px' }}>
            <gmp-map 
              center="59.41129684448242,24.637178421020508" 
              zoom="14" 
              map-id="DEMO_MAP_ID"
              style={{ height: '100%', width: '100%' }}
            >
              <gmp-advanced-marker 
                position="59.41129684448242,24.637178421020508" 
                title="Jessylilled - Lillepood"
              ></gmp-advanced-marker>
            </gmp-map>
          </div>
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