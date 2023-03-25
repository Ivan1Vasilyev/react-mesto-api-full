import styles from './Field.module.scss';

const Field = ({ formik, name, styleType, ...props }) => (
  <>
    <input
      name={name}
      value={formik.values[name]}
      onChange={formik.handleChange}
      onFocus={formik.handleBlur}
      className={`${styles[styleType]} ${
        formik.touched[name] && formik.errors[name] ? styles[styleType + '_error'] : ''
      }`}
      {...props}
    />
    <span className={styles[`${styleType}_error_message`]}>{formik.touched[name] ? formik.errors[name] : ''}</span>
  </>
);

export default Field;
