const bot = require("./bot/handlers");
const scheduler = require("./bot/scheduler");

bot.on("polling_error", console.log);
