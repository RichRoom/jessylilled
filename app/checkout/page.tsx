"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Calendar, User, Phone, Mail, Plus, Minus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loadStripe } from '@stripe/stripe-js';
import { 
  getCartFromStorage, 
  updateCartItemQuantity, 
  removeFromCart, 
  getCartTotal, 
  getCartItemCount,
  clearCart,
  type CartItem 
} from "@/lib/cart";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

interface OrderForm {
  name: string;
  phone: string;
  email: string;
  pickupDateTime: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderForm, setOrderForm] = useState<OrderForm>({
    name: '',
    phone: '',
    email: '',
    pickupDateTime: ''
  });
  const [errors, setErrors] = useState<Partial<OrderForm>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      const cart = getCartFromStorage();
      setCartItems(cart);
    };

    loadCart();

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);
    window.addEventListener('storage', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
      window.removeEventListener('storage', handleCartUpdate);
    };
  }, []);

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

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderForm> = {};

    if (!orderForm.name.trim()) {
      newErrors.name = 'Nimi on kohustuslik';
    }

    if (!orderForm.phone.trim()) {
      newErrors.phone = 'Telefon on kohustuslik';
    } else if (!/^[\+]?[0-9\s\-\(\)]{7,}$/.test(orderForm.phone.trim())) {
      newErrors.phone = 'Telefon ei ole korrektne';
    }

    if (!orderForm.email.trim()) {
      newErrors.email = 'Email on kohustuslik';
    } else if (!/\S+@\S+\.\S+/.test(orderForm.email)) {
      newErrors.email = 'Email ei ole korrektne';
    }

    if (!orderForm.pickupDateTime) {
      newErrors.pickupDateTime = 'Järeletuleku aeg on kohustuslik';
    } else {
      const selectedDate = new Date(orderForm.pickupDateTime);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.pickupDateTime = 'Järeletuleku aeg peab olema tulevikus';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setShowPayment(true);
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to initialize');

      // Create line items for Stripe
      const lineItems = cartItems.map(item => {
        if (item.stripePriceId) {
          return {
            price: item.stripePriceId,
            quantity: item.quantity,
          };
        } else {
          return {
            price_data: {
              currency: 'eur',
              product_data: {
                name: item.name,
                description: item.description,
                images: [item.image],
              },
              unit_amount: item.price * 100,
            },
            quantity: item.quantity,
          };
        }
      });

      // In a real application, you would send this to your backend
      console.log('Order details:', { orderForm, lineItems });
      
      // Simulate successful payment
      setTimeout(() => {
        const pickupDate = new Date(orderForm.pickupDateTime).toLocaleString('et-EE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        alert(`Aitäh tellimuse eest, ${orderForm.name}! Teie tellimus on vastu võetud. Tulge järele ${pickupDate}.`);
        clearCart();
        setCartItems([]);
        
        // Dispatch event to update other components
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
        router.push('/');
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Viga tellimuse esitamisel. Palun proovige uuesti.');
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof OrderForm, value: string) => {
    setOrderForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Get minimum date/time (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
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
                      <p className="text-sm font-medium text-purple-600">{item.price}€ / tk</p>
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
              </CardContent>
            </Card>
          </div>

          {/* Order Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>Tellija andmed</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="flex items-center space-x-2 mb-2">
                      <User className="w-4 h-4" />
                      <span>Nimi *</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={orderForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                      placeholder="Sisestage oma nimi"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center space-x-2 mb-2">
                      <Phone className="w-4 h-4" />
                      <span>Telefon *</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={errors.phone ? 'border-red-500 focus:border-red-500' : ''}
                      placeholder="+372 5XXX XXXX"
                    />
                    {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center space-x-2 mb-2">
                      <Mail className="w-4 h-4" />
                      <span>Email *</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500 focus:border-red-500' : ''}
                      placeholder="teie@email.ee"
                    />
                    {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="pickupDateTime" className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>Millal järgi tuled *</span>
                    </Label>
                    <Input
                      id="pickupDateTime"
                      type="datetime-local"
                      value={orderForm.pickupDateTime}
                      onChange={(e) => handleInputChange('pickupDateTime', e.target.value)}
                      className={errors.pickupDateTime ? 'border-red-500 focus:border-red-500' : ''}
                      min={getMinDateTime()}
                    />
                    {errors.pickupDateTime && <p className="text-sm text-red-600 mt-1">{errors.pickupDateTime}</p>}
                    <p className="text-xs text-gray-500 mt-1">Palun valige aeg vähemalt 1 tund ette</p>
                  </div>

                  {!showPayment ? (
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                      Jätka maksmisega
                    </Button>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h3 className="font-semibold text-green-800 mb-2">Tellimus kinnitatud!</h3>
                        <p className="text-sm text-green-700">
                          Teie andmed on edukalt sisestatud. Klõpsake "Maksa" nupul, et lõpetada tellimus.
                        </p>
                      </div>
                      <Button 
                        onClick={handlePayment}
                        disabled={isLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        {isLoading ? 'Töötleb...' : `Maksa ${getCartTotal(cartItems).toFixed(2)}€`}
                      </Button>
                    </div>
                  )}
                </form>
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
    </div>
  );
}