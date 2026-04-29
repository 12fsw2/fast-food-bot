export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface UserSession {
  // Onboarding
  step: 'name' | 'phone' | 'location' | 'done';
  name?: string;
  phone?: string;
  location?: { lat: number; lon: number } | string; // koordinat yoki matn

  // Savatcha
  cart: CartItem[];

  // Joriy ko'rilayotgan kategoriya
  currentCategory?: 'drinks' | 'food' | 'sweets';
}
