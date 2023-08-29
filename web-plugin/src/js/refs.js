export const refs = {
  chatMessages: document.getElementsByClassName('plugin__chat-message'),
  get lastMessage() {
    return this.chatMessages[this.chatMessages.length - 1];
  },
};
