"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowLeft, Package, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { clearCart } from "@/lib/cart";

interface OrderDetails {
  order_id: number;
  amount_total: number;
  currency: string;
  payment_status: string;
  order_date: string;
}

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (!sessionId) {
      router.push('/');
      return;
    }

    const fetchOrderDetails = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          router.push('/auth/login');
          return;
        }

        // Fetch order details from the view
        const { data: orders, error } = await supabase
          .from('stripe_user_orders')
          .select('*')
          .eq('checkout_session_id', sessionId)
          .order('order_date', { ascending: false })
          .limit(1);

        if (error) {
          console.error('Error fetching order:', error);
        } else if (orders && orders.length > 0) {
          setOrderDetails(orders[0]);
        }

        // Clear the cart after successful payment
        clearCart();
        window.dispatchEvent(new CustomEvent('cartUpdated'));
        
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [searchParams, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Laeb tellimuse andmeid...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Makse õnnestus!</h1>
          <p className="text-lg text-gray-600">Aitäh teie tellimuse eest</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Tellimuse üksikasjad</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orderDetails ? (
              <>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tellimuse number:</span>
                  <Badge variant="secondary">#{orderDetails.order_id}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Summa:</span>
                  <span className="font-semibold text-lg">
                    {(orderDetails.amount_total / 100).toFixed(2)} {orderDetails.currency.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Makse staatus:</span>
                  <Badge className="bg-green-100 text-green-700">
                    {orderDetails.payment_status === 'paid' ? 'Makstud' : orderDetails.payment_status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tellimuse kuupäev:</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{new Date(orderDetails.order_date).toLocaleDateString('et-EE')}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">Tellimuse andmeid ei leitud</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Järgmised sammud</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold text-xs">1</span>
                  </div>
                  <p>Teie tellimus on vastu võetud ja töötlemisel</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold text-xs">2</span>
                  </div>
                  <p>Võtame teiega ühendust järeletuleku aja kinnitamiseks</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-semibold text-xs">3</span>
                  </div>
                  <p>Teie lilled on valmis järeletulekuks</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <Button 
            onClick={() => router.push('/')}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tagasi avalehele
          </Button>
          
          <div className="text-sm text-gray-500">
            <p>Küsimuste korral võtke meiega ühendust:</p>
            <p className="font-medium">+372 5380 2101</p>
          </div>
        </div>
      </div>
    </div>
  );
}