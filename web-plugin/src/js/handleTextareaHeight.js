export function handleTextareaHeight(element, height = 200) {
  if (!element) return;

  element.style.height = '0';

  if (element.scrollHeight > height) {
    element.style.height = `${height}px`;
    return;
  }

  element.style.height = `${element.scrollHeight}px`;
}
