export const SELECT_OPTION = 'relationSelections/SELECT_OPTION';
export const REMOVE_SELECTION = 'relationSelections/REMOVE_SELECTION';
export const RESET_SELECTIONS = 'relationSelections/RESET_SELECTIONS';

export const selectOption = (option) => {
  return (dispatch) => {
    dispatch({
      type: SELECT_OPTION,
      option: option,
    });
  };
};

export const removeSelection = (removePid) => {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SELECTION,
      removePid: removePid,
    });
  };
};

export const resetSelections = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_SELECTIONS,
    });
  };
};
