import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import HdTextField from '../text-field/TextField';
import { TextField } from '@material-ui/core';
import HevoDeskLogo from '../hevodesk-logo/HevoDeskLogo';
import './Login.scss';
import { apiCall } from '../../utils/apiService';
import { authenticate, isAuth } from '../../utils/helpers';
import { LoaderContext } from '../context/LoaderContext';

const Login = ({ history }) => {
  // src/components/accounts/create/CreateAccount.tsx
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    submitButton: 'Log In',
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
    setIsFormValid(Boolean(formData.password && formData.email));
  }, [formData]);

  const submitForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      submitButton: 'Logging In...',
    });
    const body = {
      email: formData.email + '@hevodata.com',
      password: formData.password,
    };

    setShowLoader(true);
    apiCall.post('/app/login', body).then((resp) => {
      setShowLoader(false);
      authenticate(resp, () => {
        setFormData({
          email: '',
          password: '',
          submitButton: 'Log In',
        });
        isAuth() ? history.push('/ask-question') : history.push('/login');
      });
    });
  };

  return (
    <div className='h-100 center-flex-col justify-center'>
      <HevoDeskLogo className='mb-5' />
      <div className='text-headline-2 text-medium my-5'>
        Log in to your Account
      </div>
      <form className='mt-4 login-form' onSubmit={submitForm}>
        <div className='row center-flex-row mb-7 position-relative'>
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

        <div className='row mb-7'>
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
      <div className='mt-4 text-accent'>
        <Link className='center-flex-row' to='/auth/password/forgot'>
          <span className='hevo-icon hevo-help mr-1'></span> Forgot Password
        </Link>
      </div>

      <div className='mt-4'>
        <span className='text-secondary mr-1'>Don’t have an account?</span>
        <Link to='/register' className='text-link'>
          Register Now!
        </Link>
      </div>
    </div>
  );
};

export default Login;
