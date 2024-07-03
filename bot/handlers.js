const bot = require("./commands");

function sendWelcomeMessage(chatId, topicId) {
  const welcomeMessage = `¡Bienvenido al topic "Menú test"!
  Aquí tienes los comandos disponibles:
  /start - Mostrar el menú principal
  /option1 - Seleccionar Opción 1
  /option2 - Seleccionar Opción 2
  /option3 - Seleccionar Opción 3
  /option4 - Seleccionar Opción 4
  /option5 - Seleccionar Opción 5
  /option6 - Seleccionar Opción 6`;
  const options = {
    chat_id: chatId,
    text: welcomeMessage,
    message_thread_id: topicId,
  };
  bot.sendMessage(options.chat_id, options.text, options);
}

function sendMainMenu(chatId, messageId, topicId) {
  const options = {
    chat_id: chatId,
    message_id: messageId,
    text: "Menú Principal:",
    reply_markup: {
      inline_keyboard: [
        [
          { text: "Opción 1", callback_data: "option1" },
          { text: "Opción 2", callback_data: "option2" },
        ],
        [
          { text: "Opción 3", callback_data: "option3" },
          { text: "Opción 4", callback_data: "option4" },
        ],
        [
          { text: "Opción 5", callback_data: "option5" },
          { text: "Opción 6", callback_data: "option6" },
        ],
      ],
    },
    message_thread_id: topicId,
  };

  bot.editMessageText(options.text, options);
}

function sendSubMenu(chatId, messageId, menuTitle, options, topicId) {
  const keyboard = options.map((option) => [
    { text: option.text, callback_data: option.callback_data },
  ]);
  keyboard.push([{ text: "<< Volver Atrás", callback_data: "back" }]);

  const sendOptions = {
    chat_id: chatId,
    message_id: messageId,
    text: menuTitle,
    reply_markup: {
      inline_keyboard: keyboard,
    },
    message_thread_id: topicId,
  };

  bot.editMessageText(menuTitle, sendOptions);
}

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const topicId = msg.is_topic_message ? msg.message_thread_id : undefined;
  console.log(msg);
  if (topicId) {
    const topicName = msg.reply_to_message.forum_topic_created.name;
    if (topicName === "Menú test") {
      console.log(messageText);
      if (/\/welcome/.test(messageText)) {
        sendWelcomeMessage(chatId, topicId);
      }
    }
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const topicId = msg.is_topic_message ? msg.message_thread_id : undefined;

  if (topicId) {
    const topicName = msg.reply_to_message.forum_topic_created.name;
    if (topicName === "Menú test") {
      bot.sendMessage(chatId, "Menú Principal:", {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Opción 1", callback_data: "option1" },
              { text: "Opción 2", callback_data: "option2" },
            ],
            [
              { text: "Opción 3", callback_data: "option3" },
              { text: "Opción 4", callback_data: "option4" },
            ],
            [
              { text: "Opción 5", callback_data: "option5" },
              { text: "Opción 6", callback_data: "option6" },
            ],
          ],
        },
        message_thread_id: topicId,
      });
    }
  }
});

bot.on("callback_query", (callbackQuery) => {
  const message = callbackQuery.message;
  const data = callbackQuery.data;
  const topicId = message.is_topic_message ? message.message_thread_id : undefined;

  if (topicId) {
    const topicName = message.reply_to_message.forum_topic_created.name;
    if (topicName !== "Menú test") {
      bot.answerCallbackQuery(callbackQuery.id, {
        text: "Este comando solo está disponible en el topic 'Menú test'.",
      });
      return;
    }
  } else {
    bot.answerCallbackQuery(callbackQuery.id, {
      text: "Este comando solo está disponible en el topic 'Menú test'.",
    });
    return;
  }

  switch (data) {
    case "option1":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 1:",
        [
          { text: "Sub-Opción 1.1", callback_data: "suboption1_1" },
          { text: "Sub-Opción 1.2", callback_data: "suboption1_2" },
        ],
        topicId
      );
      break;
    case "option2":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 2:",
        [{ text: "Sub-Opción 2.1", callback_data: "suboption2_1" }],
        topicId
      );
      break;
    case "option3":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 3:",
        [
          { text: "Sub-Opción 3.1", callback_data: "suboption3_1" },
          { text: "Sub-Opción 3.2", callback_data: "suboption3_2" },
        ],
        topicId
      );
      break;
    case "option4":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 4:",
        [{ text: "Sub-Opción 4.1", callback_data: "suboption4_1" }],
        topicId
      );
      break;
    case "option5":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 5:",
        [
          { text: "Sub-Opción 5.1", callback_data: "suboption5_1" },
          { text: "Sub-Opción 5.2", callback_data: "suboption5_2" },
        ],
        topicId
      );
      break;
    case "option6":
      sendSubMenu(
        message.chat.id,
        message.message_id,
        "Menú de Opción 6:",
        [{ text: "Sub-Opción 6.1", callback_data: "suboption6_1" }],
        topicId
      );
      break;
    case "back":
      sendMainMenu(message.chat.id, message.message_id, topicId);
      break;
    default:
      bot.sendMessage(
        message.chat.id,
        "Opción no reconocida. Vuelve a intentar.",
        {
          ...(topicId && { message_thread_id: topicId }),
        }
      );
  }

  bot.answerCallbackQuery(callbackQuery.id); // Finaliza el callback query
});

module.exports = bot;
