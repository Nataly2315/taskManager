const { Telegraf } = require('telegraf');
const user = require('../models/User');

const bot = new Telegraf('825758597:AAG2QQPDGbq4MR6gjayPJc6e71bvNeEnrSg');
bot.start((ctx) => {ctx.reply('Welcome! Please send your gmail to match chat with your account')});
//bot.telegram.sendMessage(id, "cool");
bot.on('message', async (ctx) => {
    const text = ctx.message.text;
    const chatId = ctx.message.chat.id;
    if (/^[\w.+\-]+@gmail\.com$/.test(text)){
        const account = await user.findOneAndUpdate({email:text},{chatId});
        console.log(account);
        if (!account) {
            ctx.reply(`Account ${text} does not exist. Please type gmail what you logged in`)
        }else{
            ctx.reply(`Succes! You will get alerts about task statuses here`)
        }
    }else{
    ctx.reply('Wrong format of gmail. Please check and try again')}});

bot.launch();

module.exports.bot = bot;
