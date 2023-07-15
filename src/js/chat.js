import { refs } from './refs';
import { createBotTypingMessageMarkup, createChatMarkup, createMyMessageMarkup } from './createMessageMarkup';
import { handleTextareaHeight } from './handleTextareaHeight';

const {
  startChatBtn, chatContainer, textarea,
  chatMessages, chatBody, sendBtn,
  closeChatBtn,
} = refs;

export class Chat {
  constructor() {
    this.open = false;
  }

  initialize = () => {
    document.body.insertAdjacentHTML('beforeend', createChatMarkup());
    this.setEventListeners();
  };

  setEventListeners = () => {
    startChatBtn[0].addEventListener('click', () => {
      chatContainer[0].classList.toggle('hidden');
    });

    closeChatBtn[0].addEventListener('click', () => {
      chatContainer[0].classList.add('hidden');
    });

    textarea[0].addEventListener('input', () => handleTextareaHeight(textarea[0]));
    textarea[0].addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          return;
        }
        e.preventDefault();
        this.onSubmit();
      }
    });
    sendBtn[0].addEventListener('click', this.onSubmit);
  };

  onSubmit = () => {
    const inputValue = textarea[0].value.trim();

    if (!inputValue) return;

    const lastMessage = chatMessages[chatMessages.length - 1];
    const isLastMessageFromBot = lastMessage?.classList?.contains('chat__bot-message');

    let newMyMessage = createMyMessageMarkup({ body: inputValue, time: new Date() });

    if (!isLastMessageFromBot) {
      newMyMessage = `${newMyMessage}${createBotTypingMessageMarkup()}`;
    }

    if (lastMessage) {
      const insertPosition = isLastMessageFromBot ? 'beforebegin' : 'afterend';
      lastMessage.insertAdjacentHTML(insertPosition, newMyMessage);
    } else {
      chatBody[0].insertAdjacentHTML('beforeend', newMyMessage);
    }

    lastMessage?.scrollIntoView({ behavior: 'smooth' });

    textarea[0].value = '';
    handleTextareaHeight(textarea[0]);
  };
}
