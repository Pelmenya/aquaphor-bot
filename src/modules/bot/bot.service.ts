import { Injectable } from '@nestjs/common';
import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';

@Update()
@Injectable()
export class BotService {
    @Start()
    async onStart(@Ctx() ctx: Context) {
        await ctx.telegram.setMyCommands([
            { command: 'start', description: 'Запустить бота' },
            { command: 'help', description: 'Получить список команд' },
            { command: 'info', description: 'Получить информацию' },
        ]);

        await ctx.reply(
            'Добро пожаловать! Используйте меню команд для начала.',
            Markup.inlineKeyboard([
                Markup.button.callback('Контакты', 'contacts'),
                Markup.button.callback('Опция 2', 'option_2'),
            ]),
        );
    }
    @Action('contacts')
    async onContacts(@Ctx() ctx: Context) {
        await ctx.reply(
            '*Контакты:*\n'+
            '• *Офис*: _Московская область, г\\. Ступино, ул\\. Пристанционная 6 стр\\. 3, эт\\. 2\\._\n' +
            '• *Офис*: _Москва, ул\\. Ленинская Слобода, 26с5, эт\\. 1, оф\\. 1312, БЦ "Симонов Плаза"\\._\n' +
            '• *Склад*: _Московская область, г\\. Ступино, ул\\. Транспортная 3\\._',
            { parse_mode: 'MarkdownV2' }
        );
    }

    @Action('option_2')
    async onOption2(@Ctx() ctx: Context) {
        await ctx.reply('Вы выбрали опцию 2');
    }

    // Обработка команд
    @Command('help')
    async onHelp(@Ctx() ctx: Context) {
        await ctx.reply('Вот список доступных команд: /start, /help, /info');
    }

    @Command('info')
    async onInfo(@Ctx() ctx: Context) {
        await ctx.reply('Это информация о боте.');
    }
}
