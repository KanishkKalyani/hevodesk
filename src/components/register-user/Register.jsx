import React, { useState, useEffect, useContext } from 'react';
import HdTextField from '../text-field/TextField';
import { TextField } from '@material-ui/core';
import HevoDeskLogo from '../hevodesk-logo/HevoDeskLogo';
import './Register.scss';
import { apiCall } from '../../utils/apiService';
import { authenticate, isAuth } from '../../utils/helpers';
import { LoaderContext } from '../context/LoaderContext';

const Register = ({ history }) => {
  // src/components/accounts/create/CreateAccount.tsx
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    submitButton: 'Register',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const setShowLoader = useContext(LoaderContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const { firstName, lastName, password, email } = formData;
    setIsFormValid(Boolean(password && email && firstName && lastName));
  }, [formData]);

  const submitForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      submitButton: 'Registering...',
    });
    const body = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email + '@hevodata.com',
      password: formData.password,
    };

    setShowLoader(true);
    apiCall.post('/app/signup', body).then((resp) => {
      setShowLoader(false);
      authenticate(resp, () => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          submitButton: 'Register',
        });
        isAuth() ? history.push('/ask-question') : history.push('/login');
      });
    });
  };

  return (
    <div className='h-100 center-flex-col justify-center'>
      <HevoDeskLogo className='mb-5' />
      <div className='text-headline-2 text-medium my-5'>
        Register with Hevodesk
      </div>
      <form className='mt-4 register-form' onSubmit={submitForm}>
        <div className='mb-7 center-flex-row justify-between'>
          <HdTextField
            value={formData.firstName}
            placeholder='First Name'
            onChange={handleChange}
            label='First Name'
            name='firstName'
            required
          />
          <HdTextField
            value={formData.lastName}
            placeholder='Last Name'
            onChange={handleChange}
            label='Last Name'
            name='lastName'
            required
          />
        </div>
        <div className='center-flex-row mb-7 position-relative'>
          <HdTextField
            value={formData.email}
            placeholder='Email ID'
            onChange={handleChange}
            label='Hevo Email ID'
            name='email'
            fullWidth
            required
          />
          <span className='text-secondary ml-1 email-suffix'>
            @hevodata.com
          </span>
        </div>

        <div className='mb-7'>
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            name='password'
            onChange={handleChange}
            autoComplete='current-password'
            variant='outlined'
            fullWidth
            required
          />
        </div>

        <button
          type='submit'
          disabled={!isFormValid}
          className={`btn btn-primary w-100 mb-5`}
        >
          {formData.submitButton}
        </button>
      </form>
    </div>
  );
};

export default Register;
