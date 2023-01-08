const Field = ({ formik, name, errorClass, ...props }) => (
  <>
    <input
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onFocus={formik.handleBlur}
      {...props}
    />
    <span className={`${errorClass}__input-error`}>{formik.touched[name] ? formik.errors[name] : ''}</span>
  </>
);

export default Field;
