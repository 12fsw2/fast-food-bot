import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { session } from 'telegraf';
import { BotUpdate } from './bot.update';
import { PaymentUpdate } from './payment.update';
import { RegistrationScene } from './scenes/registration.scene';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN || '',
      middlewares: [session()],
      launchOptions: {
        webhook: {
          domain: process.env.WEBHOOK_URL as string,
          path: '/webhook',
        },
      },
    }),
  ],
  providers: [BotUpdate, PaymentUpdate, RegistrationScene],
})
export class BotModule {}