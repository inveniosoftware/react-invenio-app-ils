export const prettyPrintBooleanValue = (value) => {
  return value ? 'Yes' : 'No';
};

export const screenIsWiderThan = (pixels) => {
  return window.matchMedia(`(max-width: ${pixels}px)`).matches ? false : true;
};
