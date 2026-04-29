import { Markup } from 'telegraf';
import { Product } from '../data/menu.data';

// ============================================================
// MAIN MENU KEYBOARD
// ============================================================
export const mainMenuKeyboard = () =>
  Markup.keyboard([
    ['🥤 Ichimliklar', '🍔 Yeguliklar'],
    ['🍰 Shirinliklar', '🛒 Savatcha'],
    ['📞 Biz bilan bog\'laning'],
  ])
    .resize()
    .persistent();

// ============================================================
// CATEGORY KEYBOARDS
// ============================================================
export const drinksKeyboard = () =>
  Markup.keyboard([
    ['🥤 Coca-Cola 0.5L', '🥤 Pepsi 0.5L'],
    ['☕ Latte 300ml', '🍹 Limonad 0.5L'],
    ['🥤 Smoothie 400ml'],
    ['⬅️ Orqaga'],
  ])
    .resize()
    .persistent();

export const foodKeyboard = () =>
  Markup.keyboard([
    ['🍔 Burger Classic', '🍕 Pizza Margarita'],
    ['🌮 Shawarma', '🍟 Kartoshka fri'],
    ['🍗 Tovuq nuggets (10 dona)'],
    ['⬅️ Orqaga'],
  ])
    .resize()
    .persistent();

export const sweetsKeyboard = () =>
  Markup.keyboard([
    ['🍰 Tiramisu', '🍩 Donut'],
    ['🧁 Cupcake', '🍦 Muzqaymoq'],
    ['🍫 Shоkolad keki'],
    ['⬅️ Orqaga'],
  ])
    .resize()
    .persistent();

// ============================================================
// PRODUCT INLINE KEYBOARD — to'lov tugmasi bilan
// ============================================================
export const productInlineKeyboard = (product: Product) =>
  Markup.inlineKeyboard([
    [Markup.button.callback(`💳 Click orqali to'lash`, `pay_${product.id}`)],
    [
      Markup.button.callback('➕ Savatga qo\'shish', `cart_add_${product.id}`),
      Markup.button.callback('⬅️ Orqaga', `back_to_${product.category}`),
    ],
  ]);

// ============================================================
// CART KEYBOARD — savatdan to'lash
// ============================================================
export const cartKeyboard = () =>
  Markup.inlineKeyboard([
    [Markup.button.callback('💳 Click orqali to\'lash', 'pay_cart')],
    [Markup.button.callback('🗑 Savatni tozalash', 'clear_cart')],
    [Markup.button.callback('🛍 Xarid davom ettirish', 'continue_shopping')],
  ]);

// ============================================================
// ORDER CONFIRMATION KEYBOARD
// ============================================================
export const confirmOrderKeyboard = () =>
  Markup.inlineKeyboard([
    [
      Markup.button.callback('✅ Tasdiqlash', 'confirm_order'),
      Markup.button.callback('❌ Bekor qilish', 'cancel_order'),
    ],
  ]);

// ============================================================
// PHONE REQUEST KEYBOARD
// ============================================================
export const phoneRequestKeyboard = () =>
  Markup.keyboard([
    [Markup.button.contactRequest('📱 Telefon raqamni yuborish')],
  ])
    .resize()
    .oneTime();

// ============================================================
// LOCATION REQUEST KEYBOARD
// ============================================================
export const locationRequestKeyboard = () =>
  Markup.keyboard([
    [Markup.button.locationRequest('📍 Lokatsiyani yuborish')],
    ['📝 Manzilni matn ko\'rinishida yozish'],
  ])
    .resize()
    .oneTime();