export const uxWrap = (setter, callback, textLoading = 'Сохранение...') => {
  setter(textLoading);
  return callback().finally(() => setter(''));
};

export const handleError = async (err, message) => {
  const error = await err;
  if (message) console.log(message);
  console.log(error.message);
  return error.message;
};
