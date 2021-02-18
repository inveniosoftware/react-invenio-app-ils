export const STEPS = {
  CHOOSE_DOCUMENT: 0,
  CHOOSE_PROVIDER: 1,
  ACCEPT: 2,
  COMPLETED: 3,
};

export const getCurrentStep = (
  state,
  documentPid = undefined,
  providerPid = undefined
) => {
  if (state !== 'PENDING') {
    return STEPS.COMPLETED;
  }

  const hasDocument = !!documentPid;
  const hasProvider = !!providerPid;

  let step = STEPS.CHOOSE_DOCUMENT; // !hasDocument
  if (hasDocument && !hasProvider) {
    step = STEPS.CHOOSE_PROVIDER;
  } else if (hasDocument && hasProvider) {
    step = STEPS.ACCEPT;
  }
  return step;
};
