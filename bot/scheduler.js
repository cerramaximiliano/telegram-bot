const cron = require("node-cron");
const bot = require("./commands");
const { chatId, topicId } = require("../config");

/* cron.schedule(
  "0 9,17 * * 1-5",
  () => {
    const now = new Date();
    const hour = now.getHours();

    if (hour === 9) {
      bot.sendMessage(chatId, "Análisis Apertura de Mercado", {
        message_thread_id: topicId,
      });
    } else if (hour === 17) {
      bot.sendMessage(chatId, "Análisis Cierre de Mercado", {
        message_thread_id: topicId,
      });
    }
  },
  {
    scheduled: true,
    timezone: "America/Argentina/Buenos_Aires",
  }
);
 */