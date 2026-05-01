import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { getBotToken } from 'nestjs-telegraf';
import { Telegraf, session } from 'telegraf';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const bot = app.get<Telegraf>(getBotToken());

  bot.use(session());

  app.use(bot.webhookCallback('/webhook'));

  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    await bot.telegram.setWebhook(`${webhookUrl}/webhook`);
    logger.log(`✅ Webhook o'rnatildi: ${webhookUrl}/webhook`);
  }

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');
  logger.log(`🤖 FastFood Bot ishga tushdi! Port: ${PORT}`);
}

bootstrap();