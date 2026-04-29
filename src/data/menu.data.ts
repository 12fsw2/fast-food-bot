export interface Product {
  id: string;
  name: string;
  price: number;
  photo: string;
  description: string;
  composition: string;
  category: 'drinks' | 'food' | 'sweets';
}

export const MENU: Product[] = [
  // ========== ICHIMLIKLAR ==========
  {
    id: 'd1',
    name: '🥤 Coca-Cola 0.5L',
    price: 8000,
    photo: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&q=80',
    description: 'Sovuq va yangilovchi gazlangan ichimlik',
    composition: '💧 Suv, 🍬 Shakar, CO₂, Karamel rang, Fosfor kislota, Tabiiy aromalar',
    category: 'drinks',
  },
  {
    id: 'd2',
    name: '🥤 Pepsi 0.5L',
    price: 7000,
    photo: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&q=80',
    description: 'Klassik gazlangan ichimlik',
    composition: '💧 Suv, 🍬 Shakar, CO₂, Karamel rang, Limon kislota',
    category: 'drinks',
  },
  {
    id: 'd3',
    name: '☕ Latte 300ml',
    price: 18000,
    photo: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80',
    description: 'Issiq kremli kofe. Ertalabki energiya uchun!',
    composition: '☕ Espresso, 🥛 Sutli ko\'pik, Shakar (ixtiyoriy)',
    category: 'drinks',
  },
  {
    id: 'd4',
    name: '🍹 Limonad 0.5L',
    price: 12000,
    photo: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&q=80',
    description: 'Uy tayyorlangan tabiiy limonad',
    composition: '🍋 Limon, 💧 Suv, 🍬 Shakar, 🌿 Na\'na, 🧊 Muz',
    category: 'drinks',
  },
  {
    id: 'd5',
    name: '🥤 Smoothie 400ml',
    price: 22000,
    photo: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&q=80',
    description: 'Mevali yangilovchi ichimlik',
    composition: '🍌 Banan, 🍓 Qulupnay, 🥛 Yogurt, 🍯 Asal, 🧊 Muz',
    category: 'drinks',
  },

  // ========== YEGULIKLAR ==========
  {
    id: 'f1',
    name: '🍔 Burger Classic',
    price: 35000,
    photo: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    description: 'Klassik mol go\'shtli burger. To\'q va mazali!',
    composition: '🍞 Non, 🥩 Mol go\'shti 150g, 🥬 Salat, 🍅 Pomidor, 🧅 Piyoz, Ketçup, Sous',
    category: 'food',
  },
  {
    id: 'f2',
    name: '🍕 Pizza Margarita',
    price: 55000,
    photo: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    description: 'Italyan klassik pizzasi. Ø32cm',
    composition: '🍞 Pizza xamiri, 🍅 Tomat sousi, 🧀 Mozzarella, 🌿 Rayhon, Zaytun moyi',
    category: 'food',
  },
  {
    id: 'f3',
    name: '🌮 Shawarma',
    price: 28000,
    photo: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80',
    description: 'To\'la va mazali tovuq shaurma',
    composition: '🫓 Lavaş, 🍗 Tovuq 120g, 🥬 Salat, 🍅 Pomidor, 🧅 Piyoz, Sarımsoq sousi',
    category: 'food',
  },
  {
    id: 'f4',
    name: '🍟 Kartoshka fri',
    price: 15000,
    photo: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&q=80',
    description: 'Qaynoq va xrustli kartoshka fri. Katta porsiya',
    composition: '🥔 Kartoshka, 🫒 O\'simlik moyi, 🧂 Tuz',
    category: 'food',
  },
  {
    id: 'f5',
    name: '🍗 Tovuq nuggets (10 dona)',
    price: 32000,
    photo: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&q=80',
    description: 'Juicy va mazali nuggets. Bolalar sevimli!',
    composition: '🍗 Tovuq go\'shti, Kraşmal, Tuxum, Non uvog\'i, Tuz, Ziravorlar',
    category: 'food',
  },

  // ========== SHIRINLIKLAR ==========
  {
    id: 's1',
    name: '🍰 Tiramisu',
    price: 28000,
    photo: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    description: 'Italyan klassik Tiramisu. Bir dilim',
    composition: '🧀 Mascarpone, ☕ Espresso, 🥚 Tuxum, 🍬 Shakar, 🍪 Savoiardi, Kakao',
    category: 'sweets',
  },
  {
    id: 's2',
    name: '🍩 Donut',
    price: 12000,
    photo: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&q=80',
    description: 'Rangli glazurli donut. Bir dona',
    composition: '🌾 Un, 🥚 Tuxum, 🥛 Sut, 🧈 Yog\', 🍬 Shakar, Xamirturush, Glazur',
    category: 'sweets',
  },
  {
    id: 's3',
    name: '🧁 Cupcake',
    price: 15000,
    photo: 'https://images.unsplash.com/photo-1599785209707-a456fc1337bb?w=400&q=80',
    description: 'Kremi bilan bezatilgan cupcake',
    composition: '🌾 Un, 🧈 Sariyog\', 🥚 Tuxum, 🍬 Shakar, 🥛 Sut, Vanil, Krem',
    category: 'sweets',
  },
  {
    id: 's4',
    name: '🍦 Muzqaymoq',
    price: 18000,
    photo: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80',
    description: 'Vanilli slivochni muzqaymoq. 2 shap',
    composition: '🥛 Qaymoq, 🍬 Shakar, 🥚 Tuxum sarig\'i, Vanil ekstrakti',
    category: 'sweets',
  },
  {
    id: 's5',
    name: '🍫 Shоkolad keki',
    price: 25000,
    photo: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80',
    description: 'Qoramtir shokolad keki. Bir dilim',
    composition: '🍫 Qora shokolad, 🌾 Un, 🧈 Yog\', 🥚 Tuxum, 🍬 Shakar, Kakao kukuni',
    category: 'sweets',
  },
];

export const getByCategory = (category: Product['category']): Product[] =>
  MENU.filter((p) => p.category === category);

export const getById = (id: string): Product | undefined =>
  MENU.find((p) => p.id === id);