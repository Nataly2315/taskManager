const { Telegraf } = require('telegraf');

const bot = new Telegraf('825758597:AAG2QQPDGbq4MR6gjayPJc6e71bvNeEnrSg');
let id="344101336";
bot.start((ctx) => {ctx.reply('Welcome!'), console.log(id=ctx.message.chat.id)});
bot.telegram.sendMessage(id, "cool");
bot.launch();

module.exports
