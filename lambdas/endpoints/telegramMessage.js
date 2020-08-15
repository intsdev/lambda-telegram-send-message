import axios from "axios";
import Responses from "../common/API_Responses";

exports.handler = async (event) => {
  try {
    const { message } = JSON.parse(event.body);

    if (!message) {
      return Responses._400({ message: "message required in the body" });
    }

    await sendToTelegram(message);

    return Responses._200();
  } catch (error) {
    console.log("error in try catch", error);
    return Responses._400();
  }
};

const sendToTelegram = (text) => {
  const token = process.env.telegramToken;
  const telegramURL = `https://api.telegram.org/bot${token}/sendMessage`;

  return axios.post(telegramURL, {
    chat_id: process.env.telegramChatId,
    text,
  });
};
