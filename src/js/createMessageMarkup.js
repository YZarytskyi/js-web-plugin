import { format } from 'date-fns';

import { typing } from '../icons/typing';
import { closeIcon } from '../icons/closeIcon'
import { gallery } from '../icons/gallery';
import { sendIcon } from '../icons/sendIcon';
import { chatBot } from '../icons/chatBot';


export function createChatMarkup() {
  return `
<div class='chat-container hidden'>
  <div class='title'>
    <div class='title__top-section'>
      <button class='close-btn' type='button'>
        ${closeIcon}
      </button>
    </div>
    <div class='title__bottom-section'>
      <h1>Chat Bot</h1>
    </div>
  </div>

  <div class='chat'></div>

  <div class='input__container'>
    <textarea placeholder='Reply...' class='input__textarea'></textarea>
    <button class='input__gallery-btn' type='button'>
      ${gallery}
    </button>
    <button class='input__send-btn' type='submit'>
      ${sendIcon}
    </button>
  </div>
</div>
<button class='start-chat-btn'>
  AI Chat
</button>
`
}

export function createMyMessageMarkup({ body, time }) {
  return `<div class='chat__message chat__my-message'>
        <div class='chat__my-message-body'>
          <p>
            ${body}
          </p>
        </div>
        <p class='chat__my-message-time'>${format(new Date(time), 'hh:mm a')}</p>
      </div>`;
}

export function createBotMessageMarkup({ body, time }) {
  return `<div class='chat__message chat_bot-message'>
      <div class='chat__bot-message-container'>
        <img src='icons/chat-bot.svg' alt='ChatBot' loading='lazy' />
        <div>
          <h2 class='chat__bot-message-title'>AI Bot</h2>
          <div class='chat__bot-message-body'>
            <p>
              ${body}
            </p>
          </div>
        </div>
      </div>
      <p class='chat__bot-message-time'>${format(new Date(time), 'hh:mm a')}</p>
    </div>`;
}

export const createBotTypingMessageMarkup = () => {
  return `<div class='chat__message chat__bot-message'>
        <div class='chat__bot-message-container'>
         ${chatBot}
         <div>
            <h2 class='chat__bot-message-title'>Assistant</h2>
            <div class='chat__bot-message-body'>
              ${typing}
           </div>
         </div>
        </div>
      </div>`;
};