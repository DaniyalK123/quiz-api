const createResponse = (success, data, errors) => {
  return {
    success,
    errors,
    data,
  };
};

module.exports = { createResponse };
