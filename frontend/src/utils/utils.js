export const uxWrap = (setter, callback, textLoading = 'Сохранение...') => {
  setter(textLoading);
  return callback().finally(() => setTimeout(() => setter(''), 700));
};

export const handleError = async (err, message) => {
  const error = await err;
  if (message) console.log(message);
  console.log(error.message);
  return error.message;
};
