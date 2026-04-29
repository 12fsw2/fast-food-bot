import { Update, Action, On, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { getById } from './data/menu.data';

// Click Terminal Test token
const CLICK_TOKEN = '398062629:TEST:999999999_F91D8F69C042267444B74CC0B3C747757EB0E065';

@Update()
export class PaymentUpdate {

  // ============================================================
  // Buyurtma berilganda invoice yuborish
  // ============================================================
  @Action(/^pay_(.+)$/)
  async onPay(@Ctx() ctx: any) {
    const productId = ctx.match[1];
    const product = getById(productId);

    if (!product) return ctx.answerCbQuery('❌ Mahsulot topilmadi');

    await ctx.answerCbQuery('💳 To\'lov sahifasi ochilmoqda...');

    // Click orqali to'lov invoice
    await ctx.replyWithInvoice({
      title: product.name,
      description: product.description,
      payload: `product_${product.id}`,
      provider_token: CLICK_TOKEN,
      currency: 'UZS',
      prices: [
        {
          label: product.name,
          amount: product.price * 100, // tiyin (100 = 1 so'm)
        },
      ],
      photo_url: product.photo,
      photo_width: 400,
      photo_height: 300,
      need_name: true,
      need_phone_number: true,
      need_shipping_address: false,
      is_flexible: false,
    });
  }

  // ============================================================
  // Savatdan checkout qilganda invoice
  // ============================================================
  @Action('pay_cart')
  async onPayCart(@Ctx() ctx: any) {
    const session = ctx.session;
    const cart = session?.cart || [];

    if (cart.length === 0) {
      return ctx.answerCbQuery('🛒 Savatcha bo\'sh!');
    }

    await ctx.answerCbQuery('💳 To\'lov sahifasi ochilmoqda...');

    const total = cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0,
    );

    const prices = cart.map((item: any) => ({
      label: `${item.name} x${item.quantity}`,
      amount: item.price * item.quantity * 100,
    }));

    await ctx.replyWithInvoice({
      title: '🛒 FastFood Buyurtma',
      description: cart.map((i: any) => `${i.name} x${i.quantity}`).join(', '),
      payload: `cart_${Date.now()}`,
      provider_token: CLICK_TOKEN,
      currency: 'UZS',
      prices,
      need_name: true,
      need_phone_number: true,
      need_shipping_address: false,
      is_flexible: false,
    });
  }

  // ============================================================
  // PRE-CHECKOUT — Telegram tasdiqlash so'rovi
  // ============================================================
  @On('pre_checkout_query')
  async onPreCheckout(@Ctx() ctx: any) {
    // Har doim true — to'lovni tasdiqlash
    await ctx.answerPreCheckoutQuery(true);
  }

  // ============================================================
  // SUCCESSFUL PAYMENT — To'lov muvaffaqiyatli
  // ============================================================
  @On('successful_payment')
  async onSuccessfulPayment(@Ctx() ctx: any) {
    const payment = (ctx.message as any).successful_payment;
    const session = ctx.session;

    const totalAmount = payment.total_amount / 100; // so'mga qaytarish
    const payload = payment.invoice_payload;

    // Savatni tozalash
    if (payload.startsWith('cart_')) {
      session.cart = [];
    }

    await ctx.reply(
      '✅ <b>To\'lov muvaffaqiyatli amalga oshirildi!</b>\n\n' +
        `💰 To\'langan summa: <b>${totalAmount.toLocaleString()} so'm</b>\n` +
        `🧾 Tranzaksiya: <code>${payment.telegram_payment_charge_id}</code>\n\n` +
        '🚴 Kuryer tez orada jo\'nash oladi!\n' +
        '⏱ Taxminiy vaqt: 30-45 daqiqa\n\n' +
        'Rahmat! 🙏',
      { parse_mode: 'HTML' },
    );
  }
}