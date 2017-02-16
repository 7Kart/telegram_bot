var config = require("config");
var mongoose = require("./lib/mongoose.js");

const TelegramBot = require('node-telegram-bot-api');
var  token = config.get("bot.telegramToken");
var bot = new TelegramBot(token, {
	polling: true
});

const router = require('./router.js')(bot);
 