import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const errorMessages = {
  required: 'Заполните это поле',
  min: 'Должно быть 2 символа или больше',
  max: 'Должно быть 30 символов или меньше',
  url: 'Введите корректный URL-адрес',
  email: 'Введите корректный email',
  password: 'Должно быть 4 символа или больше',
};

const validators = {
  name: Yup.string().min(2, errorMessages.min).max(30, errorMessages.max).required(errorMessages.required),
  nameReg: Yup.string().min(2, errorMessages.min).max(30, errorMessages.max),
  about: Yup.string().min(2, errorMessages.min).max(30, errorMessages.max).required(errorMessages.required),
  aboutReg: Yup.string().min(2, errorMessages.min).max(30, errorMessages.max),
  avatar: Yup.string().url(errorMessages.url).required(errorMessages.required),
  avatarReg: Yup.string().url(errorMessages.url),
  link: Yup.string().url(errorMessages.url).required(errorMessages.required),
  email: Yup.string().email(errorMessages.email).required(errorMessages.required),
  password: Yup.string().min(4, errorMessages.password).required(errorMessages.required),
};

const useForm = (inputs, submitHandler) => {
  const [disabled, setDisabled] = useState(true);

  const formik = useFormik({
    initialValues: inputs,
    validationSchema: Yup.object(Object.keys(inputs).reduce((acc, item) => ({ ...acc, [item]: validators[item] }), {})),
    onSubmit: values => {
      values = Object.keys(values).reduce(
        (acc, item) => (values[item] ? { ...acc, [item]: validators[item] } : { ...acc }),
        {}
      );
      setDisabled(true);
      return submitHandler(values);
    },
  });

  useEffect(() => {
    formik.isValid && formik.dirty ? setDisabled(false) : setDisabled(true);
  }, [formik.dirty, formik.isValid, formik.isValidating]);

  return { formik, disabled };
};

export default useForm;
