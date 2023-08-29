import { refs } from './refs';
import {
  createBotMessageMarkup,
  createBotTypingMessageMarkup,
  createInitialMarkup,
  createMyMessageMarkup,
} from './createMarkup';
import { handleTextareaHeight } from './handleTextareaHeight';
import { postCreateChatSession, postSubmitQuery } from './api';

export class Chat {
  initialize = () => {
    document.body.insertAdjacentHTML('beforeend', createInitialMarkup());
    this.setRefs();
    this.setEventListeners();
  };

  setRefs = () => {
    this.textarea = document.getElementById('plugin--input__textarea');
    this.startChatBtn = document.getElementById('plugin--start-chat-btn');
    this.closeChatBtn = document.getElementById('plugin--close-btn');
    this.chatContainer = document.getElementById('plugin--chat-container');
    this.sendBtn = document.getElementById('plugin--input__send-btn');
    this.chatBody = document.getElementById('plugin--chat');
  };

  setEventListeners = () => {
    this.startChatBtn.addEventListener('click', this.toggleChatOpen);

    this.closeChatBtn.addEventListener('click', this.toggleChatOpen);

    this.textarea.addEventListener('input', () =>
      handleTextareaHeight(this.textarea)
    );
    this.textarea.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        if (e.shiftKey) {
          return;
        }
        e.preventDefault();
        this.onSubmit();
      }
    });
    this.sendBtn.addEventListener('click', this.onSubmit);
  };

  toggleChatOpen = async () => {
    if (this.chatContainer.classList.contains('web-plugin-hidden')) {
      setTimeout(() => {
        this.textarea.focus();
      }, 300);
    }
    this.chatContainer.classList.toggle('web-plugin-hidden');
    // if (this.session_id) return;
    //
    // const res = await postCreateChatSession();
    // if (res) {
    //   this.session_id = res.session_id;
    //   const botNewMessage = createBotMessageMarkup({
    //     body: res.greeting,
    //     time: new Date(),
    //   });
    //   refs.lastMessage.innerHTML = '';
    //   refs.lastMessage.innerHTML = botNewMessage;
    // }
  };

  onSubmit = () => {
    const inputValue = this.textarea.value?.trim();
    if (!inputValue || this.sendBtn.disabled) return;

    this.sendBtn.disabled = true;
    const userNewMessage = createMyMessageMarkup({
      body: this.sanitize(inputValue),
      time: new Date(),
    });
    const userNewMessageWithBotTyping = `${userNewMessage}${createBotTypingMessageMarkup()}`;
    this.chatBody.insertAdjacentHTML('beforeend', userNewMessageWithBotTyping);
    this.lastBotMessage = refs.lastMessage.querySelector(
      '.chatbot-message__typing-container'
    );
    this.scrollToElement(this.lastBotMessage, 'start');

    // postSubmitQuery({
    //   session_id: this.session_id,
    //   body: { query: inputValue },
    // });

    this.textarea.value = '';
    handleTextareaHeight(this.textarea);
  };

  checkIfBotFirstMessage = botAnswer => {
    const isFirstStreamAnswer =
      this.lastBotMessage.firstElementChild?.nodeName?.toLowerCase() === 'img';

    if (isFirstStreamAnswer) {
      if (!botAnswer?.trim()) return;

      this.botLastAnswer = document.createElement('p');
      this.botLastAnswer.textContent = botAnswer;
      this.lastBotMessage.firstElementChild.remove();
      this.lastBotMessage.prepend(this.botLastAnswer);
      this.botMessageScrollHeight = this.botLastAnswer.scrollHeight;
      this.scrollToElement(refs.lastMessage);
    }

    return isFirstStreamAnswer;
  };

  scrollToElement = (element, block = 'end') => {
    element.scrollIntoView({
      behavior: 'smooth',
      block,
    });
  };

  sanitize = str => {
    const div = document.createElement('div');
    div.textContent = str;

    return div.innerHTML;
  };
}
