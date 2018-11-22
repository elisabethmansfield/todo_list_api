const convertString = (obj) => {
  obj._id = obj._id.toString();
  return obj;
};

module.exports = convertString;