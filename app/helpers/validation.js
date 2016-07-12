const validation = {
  email: (text) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = reg.test(text);
    return {
      valid: valid,
      error: !valid ? 'Please enter a valid email.' : null
    };
  },
  name: (text) => {
    const reg = /^[a-z0-9_ ]+$/i;
    const valid = reg.test(text);
    return {
      valid: valid,
      error: !valid ? 'Must contain only a-z, A-Z, 0-9, _ and space.' : null
    };
  },
  phone: (text) => {
    const reg = /^(?:\d{1,3}|0\d{1,3}|00\d{1,2})?(?:\s?\(\d+\))?(?:[-\/\s.]|\d)+$/;
    const valid = reg.test(text);
    return {
      valid: valid,
      error: !valid ? 'Phone invalid.' : null
    };
  },
  isRequired: (text) => {
    const valid = text && text.length > 0;
    return {
      valid: valid,
      error: !valid ? 'This field is required.' : null
    };
  },
  comparePassword: (text1, text2) => {
    const valid = text1 ? text1.localeCompare(text2) === 0 : false;
    return {
      valid: valid,
      error: !valid ? 'Repeat new-password must equal new-password.' : null
    };
  },
  passwordLength: (password) => {
    const valid = password && password.length > 5;
    return {
      valid: valid,
      error: !valid ? "it's too short" : null
    };
  }
};

export default validation;
