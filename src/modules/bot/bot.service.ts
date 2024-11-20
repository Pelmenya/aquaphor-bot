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
                Markup.button.callback('Опция 1', 'option_1'),
                Markup.button.callback('Опция 2', 'option_2'),
            ]),
        );
    }

    @Action('option_1')
    async onOption1(@Ctx() ctx: Context) {
        await ctx.reply('Вы выбрали опцию 1');
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
