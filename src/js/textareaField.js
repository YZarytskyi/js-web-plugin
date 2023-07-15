import { refs } from './refs';
import { createBotTypingMessageMarkup, createMyMessageMarkup } from './createMessageMarkup';

// const { textarea, sendBtn, chatBody, chatMessages } = refs;

// textarea.addEventListener('input', () => handleTextareaHeight(textarea));
// textarea.addEventListener('keydown', (e) => {
//   if (e.key === 'Enter') {
//     if (e.shiftKey) {
//       return;
//     }
//     e.preventDefault();
//     onSubmit();
//   }
// });
// sendBtn.addEventListener('click', onSubmit);

function onSubmit() {
  const inputValue = textarea.value.trim();

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
    chatBody.insertAdjacentHTML('beforeend', newMyMessage);
  }

  lastMessage?.scrollIntoView({ behavior: 'smooth' });

  textarea.value = '';
  handleTextareaHeight(textarea)
}
