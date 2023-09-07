import { format } from 'date-fns';

import * as style from '../styles/styles.module.scss';

import botMessageCornerIcon from '../icons/botMessageCorner.svg';
import myMessageCornerIcon from '../icons/myMessageCorner.svg';

export const createInitialMarkup = () => {
  return `<div id="plugin--chat-container" class="${
    style.chatContainer
  } web-plugin-hidden">
  <div class="${style.title}">
    <div class="${style.titleTopSection}">
      <img src="https://marketing.brain.com.ua/static/articles_description_ua/img_20230126150626.png" alt="AI Chat Bot" loading="lazy" width="50px" height="50px" />
      <h1>AI Chat Bot</h1>
      <button id="plugin--close-btn" class="${style.closeBtn}" type='button'>
        <img src="https://static.thenounproject.com/png/1954009-200.png" alt="Close" width="20" height="20" loading="lazy" />
      </button>
    </div>
    <div class="${style.titleBottomSection}">
      <p>Enhance your online interactions with AI Chat Bot – your virtual assistant for seamless and responsive assistance, catering to all your inquiries.</p>
    </div>
  </div>

  <div id='plugin--chat' class="${style.chat}">
    ${createBotMessageMarkup({
      body: "👋 Welcome to our website! I'm your AI Chat Bot assistant, here to help with any questions or information you need. Feel free to ask me anything!",
      time: new Date(),
    })}
  </div>

  <div class="${style.inputContainer}">
    <textarea id="plugin--input__textarea" placeholder='Reply...' class="${
      style.textarea
    }"></textarea>
    <button id="plugin--input__send-btn" class="${style.sendBtn}" type='submit'>
      <img src="https://cdn-icons-png.flaticon.com/512/60/60525.png" alt="Send" width="17" height="17" loading="lazy" />
    </button>
  </div>
</div>

<button id="plugin--start-chat-btn" class="${style.startChatBtn}">
  <img src="https://marketing.brain.com.ua/static/articles_description_ua/img_20230126150626.png" alt="AI chatbot" />
</button>`;
};

export function createMyMessageMarkup({ body, time }) {
  return `<div class="${style.message} ${style.myMessage} plugin__chat-message">
        <div class="${style.myMessageBody}">
          <p>${body}</p>
          <img src=${myMessageCornerIcon} alt="" width={19} height={16} class="${
    style.myMessageCornerIcon
  }">
        </div>
        <p class="${style.myMessageTime}">${format(
    new Date(time),
    'hh:mm a'
  )}</p>
      </div>`;
}

export function createBotMessageMarkup({ body, time }) {
  return `<div class="${
    style.message
  } plugin__chat-message plugin__chatbot-message">
      <div class="${style.botMessageContainer}">
        <img src="https://marketing.brain.com.ua/static/articles_description_ua/img_20230126150626.png" alt="AI ChatBot" width="38" height="38" />
          <div class="${style.botMessageBody}">
            <p>${body}</p>
            <img src=${botMessageCornerIcon} alt="" width={19} height={16} class="${
    style.botMessageCornerIcon
  }">
          </div>
      </div>
      ${createBotMessageTimeMarkup(time)}
    </div>`;
}

export const createBotTypingMessageMarkup = () => {
  return `<div class="${style.message} plugin__chat-message plugin__chatbot-message">
        <div class="${style.botMessageContainer}">
         <img src="https://marketing.brain.com.ua/static/articles_description_ua/img_20230126150626.png" alt="AI ChatBo" width="38" height="38" />
            <div class="${style.botMessageBody} chatbot-message__typing-container">
              <img src="https://cdn1.iconfinder.com/data/icons/blobby-iconset/100/More-512.png" alt="Typing..." />
              <img src=${botMessageCornerIcon} alt="" width={19} height={16} class="${style.botMessageCornerIcon}">
           </div>
        </div>
      </div>`;
};

export const createBotMessageTimeMarkup = time => {
  return `<p class="${style.botMessageTime}">${format(
    new Date(time),
    'hh:mm a'
  )}</p>`;
};
