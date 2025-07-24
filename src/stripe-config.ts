export interface StripeProduct {
  id: string;
  priceId: string;
  name: string;
  description: string;
  price: number;
  mode: 'payment' | 'subscription';
}

export const stripeProducts: StripeProduct[] = [
  {
    id: 'prod_SjqyLEI9bHsYyI',
    priceId: 'price_1RoNGp01mQ6htghpnMwz8Mgu',
    name: 'Nelk',
    description: 'Värviline nelk',
    price: 2.00,
    mode: 'payment'
  },
  {
    id: 'prod_SjqyR8WH6YpcA2',
    priceId: 'price_1RoNGA01mQ6htghp3Ny0c4B2',
    name: 'Iiris',
    description: 'Sinine iiris',
    price: 2.00,
    mode: 'payment'
  },
  {
    id: 'prod_SjqxAZ47ySibhH',
    priceId: 'price_1RoNFk01mQ6htghpfaxxxPzW',
    name: 'Krüsanteem',
    description: 'Kaunis krüsanteem',
    price: 4.00,
    mode: 'payment'
  },
  {
    id: 'prod_Sjo0tM8iOtSjI0',
    priceId: 'price_1RoKOD01mQ6htghpP7HGG7Jz',
    name: 'Liilia',
    description: 'Roosa liilia',
    price: 7.00,
    mode: 'payment'
  },
  {
    id: 'prod_SjnyNM0Yadymqz',
    priceId: 'price_1RoKMJ01mQ6htghpfWLfu8Z1',
    name: 'Roos',
    description: 'Klassikaline punane roos',
    price: 3.00,
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};