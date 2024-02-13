export const ignoreRJSFEnterEvent = (document) => {
  /* For unknown reasons empty fields are spawned when pressing
  the 'enter' key inside a RJSF input element so we have to manually prevent it */
  const inputElements = document.getElementsByTagName('input');
  for (const input of inputElements) {
    const isRJSFInput = input.id.includes('root');
    if (isRJSFInput) {
      input.onkeydown = (event) =>
        event.key === 'Enter' ? event.preventDefault() : null;
    }
  }
};
