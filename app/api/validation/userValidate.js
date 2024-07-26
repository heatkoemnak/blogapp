import * as yup from 'yup';

export const userValidate = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  // confirmPassword: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});