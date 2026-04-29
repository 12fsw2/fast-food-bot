import { Wizard, WizardStep, On, Ctx } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';
import {
  phoneRequestKeyboard,
  locationRequestKeyboard,
  mainMenuKeyboard,
} from '../keyboards/keyboards';

export const REGISTRATION_SCENE = 'REGISTRATION_SCENE';

@Wizard(REGISTRATION_SCENE)
export class RegistrationScene {

  // STEP 1 — Ism so'rash
  @WizardStep(1)
  async step1(@Ctx() ctx: Scenes.WizardContext) {
    await ctx.reply(
      '👋 Xush kelibsiz! FastFood botimizga!\n\n📝 Iltimos, ismingizni yuboring:',
      { reply_markup: { remove_keyboard: true } },
    );
    ctx.wizard.next();
  }

  // STEP 2 — Ismni qabul qilib telefon so'rash
  @WizardStep(2)
  @On('text')
  async step2(@Ctx() ctx: Scenes.WizardContext) {
    const msg = ctx.message as any;
    const name = msg?.text?.trim();

    if (!name || name.length < 2) {
      await ctx.reply('❌ Ism kamida 2 ta harf. Qaytadan kiriting:');
      return;
    }

    (ctx.wizard.state as any).name = name;

    await ctx.reply(
      `✅ Rahmat, ${name}!\n\n📱 Telefon raqamingizni yuboring:`,
      phoneRequestKeyboard(),
    );
    ctx.wizard.next();
  }

  // STEP 3a — Contact orqali telefon
  @WizardStep(3)
  @On('contact')
  async step3Contact(@Ctx() ctx: Scenes.WizardContext) {
    const msg = ctx.message as any;
    const phone = msg.contact.phone_number;
    await this.askLocation(ctx, phone);
  }

  // STEP 3b — Matn orqali telefon
  @WizardStep(3)
  @On('text')
  async step3Text(@Ctx() ctx: Scenes.WizardContext) {
    const msg = ctx.message as any;
    const phone = msg?.text?.trim();
    const phoneRegex = /^\+?[0-9]{9,13}$/;

    if (!phoneRegex.test(phone)) {
      await ctx.reply(
        '❌ Noto\'g\'ri format! Masalan: +998901234567',
        phoneRequestKeyboard(),
      );
      return;
    }
    await this.askLocation(ctx, phone);
  }

  private async askLocation(ctx: Scenes.WizardContext, phone: string) {
    (ctx.wizard.state as any).phone = phone;
    await ctx.reply(
      `✅ Telefon: ${phone}\n\n📍 Yetkazib berish manzilini yuboring:`,
      locationRequestKeyboard(),
    );
    ctx.wizard.next();
  }

  // STEP 4a — GPS Lokatsiya
  @WizardStep(4)
  @On('location')
  async step4Location(@Ctx() ctx: Scenes.WizardContext) {
    const msg = ctx.message as any;
    const { latitude, longitude } = msg.location;
    await this.finishRegistration(
      ctx,
      { lat: latitude, lon: longitude },
      `📍 GPS: ${latitude}, ${longitude}`,
    );
  }

  // STEP 4b — Matn manzil
  @WizardStep(4)
  @On('text')
  async step4Text(@Ctx() ctx: Scenes.WizardContext) {
    const msg = ctx.message as any;
    const address = msg?.text?.trim();

    if (!address || address.length < 5) {
      await ctx.reply(
        '❌ Manzil kamida 5 ta harf. Masalan: Toshkent, Chilonzor 15-uy',
        locationRequestKeyboard(),
      );
      return;
    }
    await this.finishRegistration(ctx, address, `📝 ${address}`);
  }

  private async finishRegistration(ctx: Scenes.WizardContext, location: any, locationDisplay: string) {
    const state = ctx.wizard.state as any;
    const session = (ctx as any).session;

    session.name = state.name;
    session.phone = state.phone;
    session.location = location;
    session.cart = [];
    session.step = 'done';

    await ctx.reply(
      '🎉 <b>Ro\'yxatdan muvaffaqiyatli o\'tdingiz!</b>\n\n' +
        `👤 Ism: <b>${state.name}</b>\n` +
        `📱 Telefon: <b>${state.phone}</b>\n` +
        `${locationDisplay}\n\n` +
        '🍽 Menyudan tanlang:',
      {
        parse_mode: 'HTML',
        ...mainMenuKeyboard(),
      },
    );

    await ctx.scene.leave();
  }
}