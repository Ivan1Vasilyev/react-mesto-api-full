import { useState } from 'react';

const useForm = (inputValues) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return { values, setValues, handleChange };
};

export default useForm;
