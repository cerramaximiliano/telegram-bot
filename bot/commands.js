const TelegramBot = require("node-telegram-bot-api");
const { telegramToken } = require("../config");

const bot = new TelegramBot(telegramToken, { polling: true });

bot.setMyCommands([
  { command: "/welcome", description: "Mensaje bienvenida" },
  { command: "/start", description: "Mostrar el menú principal" },
]);

module.exports = bot;