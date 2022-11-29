const validator = require('validator');

const signup = (user) => {
  let output = {
    error: false,
    message: '',
  };
  // Check if empty
  if (
    validator.isEmpty(user.email) ||
    validator.isEmpty(user.password) ||
    validator.isEmpty(user.username)
  ) {
    const output = {
      error: true,
      message: 'Please enter all fields',
    };
    return output;
  }

  if (!validator.isEmail(user.email)) {
    const output = {
      error: true,
      message: 'Please enter a valid Email',
    };
    return output;
  }
  if (!validator.isStrongPassword(user.password)) {
    const output = {
      error: true,
      message:
        'Please enter a valid Password, password should be at least 8 and contains uppercase, number, and symbol',
    };
    return output;
  }

  return output;
};

const login = (user) => {
  let output = {
    error: false,
    message: '',
  };
  // Check if empty
  if (validator.isEmpty(user.email) || validator.isEmpty(user.password)) {
    const output = {
      error: true,
      message: 'Please enter all fields',
    };
    return output;
  }

  if (!validator.isEmail(user.email)) {
    const output = {
      error: true,
      message: 'Please enter a valid Email',
    };
    return output;
  }
  if (!validator.isStrongPassword(user.password)) {
    const output = {
      error: true,
      message:
        'Please enter a valid Password, password should be at least 8 and contains uppercase, number, and symbol',
    };
    return output;
  }

  return output;
};

module.exports = {
  signup,
  login,
};
