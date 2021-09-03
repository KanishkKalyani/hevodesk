import React, { useState, useEffect } from 'react';
import HdTextField from '../text-field/TextField';
import HevoDeskLogo from '../hevodesk-logo/HevoDeskLogo';

const ForgotPassword = (props) => {
  // src/components/accounts/create/CreateAccount.tsx
  const [formData, setFormData] = useState({
    email: '',
    submitButton: 'Submit',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const { email } = formData;
    setIsFormValid(Boolean(email));
  }, [formData]);

  const submitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className='h-100 center-flex-col justify-center'>
      <HevoDeskLogo className='mb-5' />
      <div className='text-headline-2 text-medium my-5'>
        Enter Hevo Mail Id for Recovery
      </div>
      <form className='mt-4 register-form' onSubmit={submitForm}>
        <div className='center-flex-row mb-7'>
          <HdTextField
            value={formData.email}
            placeholder='Email ID'
            onChange={handleChange}
            label='Hevo Email ID'
            name='email'
            required
          />
          <span className='text-secondary ml-1'>@hevodata.com</span>
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

export default ForgotPassword;
