"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, ShoppingCart, Calendar, User, Phone, Mail, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { 
  getCartFromStorage, 
  updateCartItemQuantity, 
  removeFromCart, 
  getCartTotal, 
  getCartItemCount,
  type CartItem 
} from "@/lib/cart";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [error, setError] = useState("");

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      const cart = getCartFromStorage();
      setCartItems(cart);
    };

    const checkAuth = async () => {
      // Get initial session
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setIsAuthLoading(false);
    };

    loadData();
    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setIsAuthLoading(false);
      }
    );
    // Listen for cart updates
    const handleCartUpdate = () => {
      const cart = getCartFromStorage();
      setCartItems(cart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
      subscription.unsubscribe();
    };
  }, [router]);

  // Redirect to login only after auth check is complete
  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push('/auth/login');
    }
  }, [isAuthLoading, user, router]);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }

    const updatedCart = updateCartItemQuantity(itemId, newQuantity);
    setCartItems(updatedCart);
    
    // Dispatch event to update other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const removeItem = (itemId: string) => {
    const updatedCart = removeFromCart(itemId);
    setCartItems(updatedCart);
    
    // Dispatch event to update other components
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  };

  const handleCheckout = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (cartItems.length === 0) return;

    setIsLoading(true);
    setError("");
    
    try {
      // Get user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
        return;
      }

      // For now, let's use the old format but with the first item
      // TODO: Implement proper multi-item checkout once Supabase function is updated
      const firstItem = cartItems[0];
      
      if (!firstItem.stripePriceId) {
        setError("Toote hinnainfo puudub");
        return;
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
          cancel_url: `${window.location.origin}/checkout`,
          mode: 'payment'
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      }
      
    } catch (error) {
      console.error('Payment error:', error);
      setError('Viga tellimuse esitamisel. Palun proovige uuesti.');
      setIsLoading(false);
    }
  };

  // Show loading screen while checking authentication
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Kontrollib autentimist...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Teie ostukorv on tühi</h1>
          <p className="text-gray-600 mb-8">Lisage tooteid ostukorvi, et jätkata tellimisega.</p>
          <Button onClick={() => router.push('/')} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tagasi poodi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={() => router.push('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tagasi poodi</span>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Tellimuse vormistamine</h1>
          <div></div>
        </div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Ostukorv ({getCartItemCount(cartItems)} tk)</span>
                </div>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {getCartTotal(cartItems).toFixed(2)}€
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <p className="text-sm font-medium text-purple-600">{item.price.toFixed(2)}€ / tk</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <p className="font-semibold text-gray-900">{(item.price * item.quantity).toFixed(2)}€</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 text-xs p-1 h-auto"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Eemalda
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tooteid kokku:</span>
                  <span>{getCartItemCount(cartItems)} tk</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-600">
                  <span>Kokku:</span>
                  <span>{getCartTotal(cartItems).toFixed(2)}€</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <Button 
                  onClick={handleCheckout}
                  disabled={isLoading || cartItems.length === 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {isLoading ? 'Suunab maksmisele...' : `Maksa ${getCartTotal(cartItems).toFixed(2)}€`}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Store Info */}
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <Badge className="bg-blue-100 text-blue-700">Järeletulemine</Badge>
                <p className="text-sm text-gray-600">
                  <strong>Aadress:</strong> Õismäe tee 107, Tallinn
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Lahtiolekuajad:</strong> E-R 9-19, L 10-17, P 10-17
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Telefon:</strong> +372 5380 2101
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}