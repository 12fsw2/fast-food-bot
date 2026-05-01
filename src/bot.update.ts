import { Update, Start, Hears, On, Action, Ctx, Message } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { REGISTRATION_SCENE } from './scenes/registration.scene';
import {
  mainMenuKeyboard,
  drinksKeyboard,
  foodKeyboard,
  sweetsKeyboard,
  productInlineKeyboard,
  cartKeyboard,
  confirmOrderKeyboard,
} from './keyboards/keyboards';
import { MENU, getByCategory, getById, Product } from './data/menu.data';

@Update()
export class BotUpdate {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>) { }

  // ============================================================
  // /START — Ro'yxatdan o'tish yoki Asosiy menyu
  // ============================================================
  @Start()
  async onStart(@Ctx() ctx: Context) {
    const session = (ctx as any).session;

    if (!session) (ctx as any).session = {};

    if (!session?.step || session.step !== 'done') {
      await (ctx as any).scene.enter(REGISTRATION_SCENE);
      return;
    }

    await ctx.reply(
      `👋 Xush kelibsiz, <b>${session.name}</b>!\n\n🍽 Nimа buyurtma qilasiz?`,
      { parse_mode: 'HTML', ...mainMenuKeyboard() },
    );
  }

  // ============================================================
  // 🥤 ICHIMLIKLAR
  // ============================================================
  @Hears('🥤 Ichimliklar')
  async onDrinks(@Ctx() ctx: Context) {
    (ctx as any).session.currentCategory = 'drinks';

    const drinks = getByCategory('drinks');
    const list = drinks.map((d, i) => `${i + 1}. ${d.name} — ${d.price.toLocaleString()} so'm`).join('\n');

    await ctx.reply(
      '🥤 <b>Ichimliklar menyusi</b>\n\n' +
      `${list}\n\n` +
      'Quyidan kerakli mahsulotni tanlang 👇',
      {
        parse_mode: 'HTML',
        ...drinksKeyboard(),
      },
    );
  }

  // ============================================================
  // 🍔 YEGULIKLAR
  // ============================================================
  @Hears('🍔 Yeguliklar')
  async onFood(@Ctx() ctx: Context) {
    (ctx as any).session.currentCategory = 'food';

    const foods = getByCategory('food');
    const list = foods.map((f, i) => `${i + 1}. ${f.name} — ${f.price.toLocaleString()} so'm`).join('\n');

    await ctx.reply(
      '🍔 <b>Yeguliklar menyusi</b>\n\n' +
      `${list}\n\n` +
      'Quyidan kerakli mahsulotni tanlang 👇',
      {
        parse_mode: 'HTML',
        ...foodKeyboard(),
      },
    );
  }

  // ============================================================
  // 🍰 SHIRINLIKLAR
  // ============================================================
  @Hears('🍰 Shirinliklar')
  async onSweets(@Ctx() ctx: Context) {
    (ctx as any).session.currentCategory = 'sweets';

    const sweets = getByCategory('sweets');
    const list = sweets.map((s, i) => `${i + 1}. ${s.name} — ${s.price.toLocaleString()} so'm`).join('\n');

    await ctx.reply(
      '🍰 <b>Shirinliklar menyusi</b>\n\n' +
      `${list}\n\n` +
      'Quyidan kerakli mahsulotni tanlang 👇',
      {
        parse_mode: 'HTML',
        ...sweetsKeyboard(),
      },
    );
  }

  // ============================================================
  // Mahsulot tanlanganda — keyboard text bilan product topamiz
  // ============================================================
  private async sendProduct(ctx: Context, product: Product) {
    const caption =
      `<b>${product.name}</b>\n\n` +
      `💰 Narxi: <b>${product.price.toLocaleString()} so'm</b>\n\n` +
      `📝 <i>${product.description}</i>\n\n` +
      `🧾 <b>Tarkibi:</b>\n${product.composition}`;

    try {
      await ctx.replyWithPhoto(product.photo, {
        caption,
        parse_mode: 'HTML',
        ...productInlineKeyboard(product),
      });
    } catch {
      // Rasm yuklanmasa — matn bilan
      await ctx.reply(caption, {
        parse_mode: 'HTML',
        ...productInlineKeyboard(product),
      });
    }
  }

  // ============================================================
  // DRINK PRODUCT HANDLERS
  // ============================================================
  @Hears('🥤 Coca-Cola 0.5L')
  async onCocaCola(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('d1')!);
  }

  @Hears('🥤 Pepsi 0.5L')
  async onPepsi(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('d2')!);
  }

  @Hears('☕ Latte 300ml')
  async onLatte(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('d3')!);
  }

  @Hears('🍹 Limonad 0.5L')
  async onLemonade(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('d4')!);
  }

  @Hears('🥤 Smoothie 400ml')
  async onSmoothie(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('d5')!);
  }

  // ============================================================
  // FOOD PRODUCT HANDLERS
  // ============================================================
  @Hears('🍔 Burger Classic')
  async onBurger(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('f1')!);
  }

  @Hears('🍕 Pizza Margarita')
  async onPizza(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('f2')!);
  }

  @Hears('🌮 Shawarma')
  async onShawarma(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('f3')!);
  }

  @Hears('🍟 Kartoshka fri')
  async onFries(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('f4')!);
  }

  @Hears('🍗 Tovuq nuggets (10 dona)')
  async onNuggets(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('f5')!);
  }

  // ============================================================
  // SWEETS PRODUCT HANDLERS
  // ============================================================
  @Hears('🍰 Tiramisu')
  async onTiramisu(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('s1')!);
  }

  @Hears('🍩 Donut')
  async onDonut(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('s2')!);
  }

  @Hears('🧁 Cupcake')
  async onCupcake(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('s3')!);
  }

  @Hears('🍦 Muzqaymoq')
  async onIceCream(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('s4')!);
  }

  @Hears('🍫 Shоkolad keki')
  async onChocolateCake(@Ctx() ctx: Context) {
    await this.sendProduct(ctx, getById('s5')!);
  }

  // ============================================================
  // ⬅️ ORQAGA
  // ============================================================
  @Hears('⬅️ Orqaga')
  async onBack(@Ctx() ctx: Context) {
    const session = (ctx as any).session;
    await ctx.reply(
      '🏠 Asosiy menyu',
      { ...mainMenuKeyboard() },
    );
  }

  // ============================================================
  // 🛒 SAVATCHA
  // ============================================================
  @Hears('🛒 Savatcha')
  async onCart(@Ctx() ctx: Context) {
    const session = (ctx as any).session;
    const cart = session?.cart || [];

    if (cart.length === 0) {
      await ctx.reply(
        '🛒 Savatchangiz bo\'sh!\n\nMahsulot tanlash uchun menyudan foydalaning.',
        mainMenuKeyboard(),
      );
      return;
    }

    let total = 0;
    const items = cart
      .map((item: any) => {
        total += item.price * item.quantity;
        return `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm`;
      })
      .join('\n');

    await ctx.reply(
      '🛒 <b>Savatchangizdagi mahsulotlar:</b>\n\n' +
      `${items}\n\n` +
      `💰 <b>Jami: ${total.toLocaleString()} so'm</b>`,
      {
        parse_mode: 'HTML',
        ...cartKeyboard(),
      },
    );
  }

  // ============================================================
  // INLINE ACTIONS — Buyurtma berish
  // ============================================================
  @Action(/^order_(.+)$/)
  async onOrder(@Ctx() ctx: any) {
    const productId = ctx.match[1];
    const product = getById(productId);
    const session = ctx.session;

    if (!product) return ctx.answerCbQuery('❌ Mahsulot topilmadi');

    await ctx.answerCbQuery('');
    await ctx.reply(
      `✅ <b>${product.name}</b> buyurtma berilmoqda...\n\n` +
      `📋 <b>Buyurtma ma'lumotlari:</b>\n` +
      `👤 Ism: ${session.name}\n` +
      `📱 Tel: ${session.phone}\n` +
      `📍 Manzil: ${typeof session.location === 'string' ? session.location : `GPS (${session.location?.lat}, ${session.location?.lon})`}\n` +
      `🍽 Mahsulot: ${product.name}\n` +
      `💰 Narx: ${product.price.toLocaleString()} so'm\n\n` +
      'Buyurtmani tasdiqlaysizmi?',
      {
        parse_mode: 'HTML',
        ...confirmOrderKeyboard(),
      },
    );
  }

  // ============================================================
  // INLINE ACTION — Savatga qo'shish
  // ============================================================
  @Action(/^cart_add_(.+)$/)
  async onCartAdd(@Ctx() ctx: any) {
    const productId = ctx.match[1];
    const product = getById(productId);

    if (!product) return ctx.answerCbQuery('❌ Topilmadi');

    const session = ctx.session;
    if (!session.cart) session.cart = [];

    const existing = session.cart.find((i: any) => i.productId === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      session.cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      });
    }

    const total = session.cart.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
    await ctx.answerCbQuery(`✅ ${product.name} savatga qo'shildi!`);
    await ctx.reply(
      `➕ <b>${product.name}</b> savatga qo'shildi!\n` +
      `🛒 Savatchada: ${session.cart.length} xil mahsulot\n` +
      `💰 Jami: ${total.toLocaleString()} so'm`,
      { parse_mode: 'HTML' },
    );
  }

  // ============================================================
  // INLINE ACTION — Orqaga (kategoriyaga)
  // ============================================================
  @Action(/^back_to_(.+)$/)
  async onBackTo(@Ctx() ctx: any) {
    const category = ctx.match[1];
    await ctx.answerCbQuery('');

    const keyboardMap: any = {
      drinks: drinksKeyboard,
      food: foodKeyboard,
      sweets: sweetsKeyboard,
    };

    const nameMap: any = {
      drinks: '🥤 Ichimliklar',
      food: '🍔 Yeguliklar',
      sweets: '🍰 Shirinliklar',
    };

    await ctx.reply(`${nameMap[category]} menyusiga qaytdingiz`, {
      ...keyboardMap[category]?.(),
    });
  }

  // ============================================================
  // INLINE ACTION — Buyurtmani tasdiqlash
  // ============================================================
  @Action('confirm_order')
  async onConfirmOrder(@Ctx() ctx: any) {
    const session = ctx.session;
    await ctx.answerCbQuery('✅ Qabul qilindi!');

    await ctx.editMessageReplyMarkup(null);
    await ctx.reply(
      '🎉 <b>Buyurtmangiz qabul qilindi!</b>\n\n' +
      '🚴 Kuryer tez orada siz bilan bog\'lanadi.\n' +
      '⏱ Taxminiy vaqt: 30-45 daqiqa\n\n' +
      'Rahmat! Yana buyurtma berish uchun /start bosing',
      {
        parse_mode: 'HTML',
        ...mainMenuKeyboard(),
      },
    );

    // Savatni tozalaymiz
    session.cart = [];
  }

  // ============================================================
  // INLINE ACTION — Bekor qilish
  // ============================================================
  @Action('cancel_order')
  async onCancelOrder(@Ctx() ctx: any) {
    await ctx.answerCbQuery('❌ Bekor qilindi');
    await ctx.editMessageReplyMarkup(null);
    await ctx.reply('❌ Buyurtma bekor qilindi.\n\nBoshqa narsa tanlaysizmi?', mainMenuKeyboard());
  }

  // ============================================================
  // INLINE ACTION — Checkout (savatdan)
  // ============================================================
  @Action('checkout')
  async onCheckout(@Ctx() ctx: any) {
    const session = ctx.session;
    const cart = session?.cart || [];

    if (cart.length === 0) {
      await ctx.answerCbQuery('Savatcha bo\'sh!');
      return;
    }

    let total = 0;
    const items = cart
      .map((item: any) => {
        total += item.price * item.quantity;
        return `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toLocaleString()} so'm`;
      })
      .join('\n');

    await ctx.answerCbQuery('');
    await ctx.reply(
      '📋 <b>Buyurtma tafsilotlari:</b>\n\n' +
      `${items}\n\n` +
      `💰 <b>JAMI: ${total.toLocaleString()} so'm</b>\n\n` +
      `👤 ${session.name} | 📱 ${session.phone}\n` +
      `📍 ${typeof session.location === 'string' ? session.location : 'GPS manzil'}\n\n` +
      'Buyurtmani tasdiqlaysizmi?',
      {
        parse_mode: 'HTML',
        ...confirmOrderKeyboard(),
      },
    );
  }

  // ============================================================
  // INLINE ACTION — Savatni tozalash
  // ============================================================
  @Action('clear_cart')
  async onClearCart(@Ctx() ctx: any) {
    ctx.session.cart = [];
    await ctx.answerCbQuery('🗑 Tozalandi');
    await ctx.editMessageReplyMarkup(null);
    await ctx.reply('🗑 Savatcha tozalandi.', mainMenuKeyboard());
  }

  // ============================================================
  // INLINE ACTION — Xarid davom ettirish
  // ============================================================
  @Action('continue_shopping')
  async onContinueShopping(@Ctx() ctx: any) {
    await ctx.answerCbQuery('');
    await ctx.reply('🛍 Xaridni davom ettiring!', mainMenuKeyboard());
  }
  // ============================================================
  // 📞 BIZ BILAN BOG'LANING
  // ============================================================
  @Hears('📞 Biz bilan bog\'laning')
  async onContact(@Ctx() ctx: Context) {
    await ctx.reply(
      '📞 <b>Biz bilan bog\'laning</b>\n\n' +
      '👨‍💼 Operator: @fastfood_admin\n' +
      '📱 Telefon: +998 90 123 45 67\n' +
      '⏰ Ish vaqti: 09:00 - 23:00\n' +
      '📍 Manzil: Toshkent, Chilonzor tumani\n\n' +
      '💬 Savollar uchun operatorga murojaat qiling!',
      {
        parse_mode: 'HTML',
        ...mainMenuKeyboard(),
      },
    );
  }

}