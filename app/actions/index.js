import * as Types from '../constants/ActionTypes';

const sendReset = () => {
  return {
    type: Types.RESET_INDEX
  };
};

export const reset = () => {
  return (dispatch, getState) => {
    dispatch(sendReset());
  };
};

//change locale
const handleChangeLocale = (locale) => {
  return {
    type: Types.CHANGE_LOCALE,
    locale
  };
};

export const changeLocale = (locale) => {
  return (dispatch, getState) => {
    dispatch(handleChangeLocale(locale));
  };
};
