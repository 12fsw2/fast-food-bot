import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotUpdate } from './bot.update';
import { PaymentUpdate } from './payment.update';
import { RegistrationScene } from './scenes/registration.scene';

@Module({
  imports: [
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN || '',
      middlewares: [],
    }),
  ],
  providers: [BotUpdate, PaymentUpdate, RegistrationScene],
})
export class BotModule {}