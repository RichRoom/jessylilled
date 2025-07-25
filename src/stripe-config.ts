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
    name: 'Nelkide Kimp',
    description: 'Värviline nelk',
    price: 20,
    mode: 'payment'
  },
  {
    id: 'prod_SjqyR8WH6YpcA2',
    priceId: 'price_1RoNGA01mQ6htghp3Ny0c4B2',
    name: 'Iiriste Kimp',
    description: 'Sinine iiris',
    price: 20,
    mode: 'payment'
  },
  {
    id: 'prod_SjqxAZ47ySibhH',
    priceId: 'price_1RoNFk01mQ6htghpfaxxxPzW',
    name: 'Krüsanteemide Kimp',
    description: 'Kaunis krüsanteem',
    price: 20,
    mode: 'payment'
  },
  {
    id: 'prod_Sjo0tM8iOtSjI0',
    priceId: 'price_1RoKOD01mQ6htghpP7HGG7Jz',
    name: 'Inkaliilia Kimp',
    description: 'Roosa liilia',
    price: 25,
    mode: 'payment'
  },
  {
    id: 'prod_SjnyNM0Yadymqz',
    priceId: 'price_1RoKMJ01mQ6htghpfWLfu8Z1',
    name: 'Rooside Kimp',
    description: 'Klassikaline punane roos',
    price: 27,
    mode: 'payment'
  }
];

export const getProductByPriceId = (priceId: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.priceId === priceId);
};

export const getProductById = (id: string): StripeProduct | undefined => {
  return stripeProducts.find(product => product.id === id);
};