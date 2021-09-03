import React, { useContext, useEffect, useState } from 'react';
import HdTextField from '../../text-field/TextField';
import './AddForm.scss';
import { apiCall } from '../../../utils/apiService';
import { LoaderContext } from '../../context/LoaderContext';

const AddForm = ({ getAllForms }) => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    description: '',
    submitButton: 'Add',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const setShowLoader = useContext(LoaderContext);

  useEffect(() => {
    const { title, link, description } = formData;
    setIsFormValid(Boolean(title && link && description));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createForm = () => {
    const body = {
      title: formData.title,
      link: formData.link,
      description: formData.description,
    };

    setShowLoader(true);
    apiCall.post('/app/forms', body).then((resp) => {
      setShowLoader(false);
      setFormData({
        title: '',
        link: '',
        description: '',
        submitButton: 'Add',
      });

      getAllForms();
    });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      submitButton: 'Adding...',
    });

    createForm();
  };

  return (
    <div className='box p-5 mr-5'>
      <div className='text-bold mb-7'>Add Form</div>
      <form onSubmit={submitForm}>
        <div className='center-flex-row mb-7'>
          <HdTextField
            value={formData.title}
            placeholder='Title'
            onChange={handleChange}
            label='Title'
            name='title'
            fullWidth
            required
          />
        </div>
        <div className='center-flex-row mb-7'>
          <HdTextField
            value={formData.link}
            placeholder='Link'
            onChange={handleChange}
            label='Link'
            name='link'
            fullWidth
            required
          />
        </div>
        <div className='center-flex-row mb-7'>
          <HdTextField
            value={formData.description}
            placeholder='Description'
            onChange={handleChange}
            label='Description'
            name='description'
            multiline
            minRows='9'
            maxRows='9'
            fullWidth
            required
          />
        </div>
        <div className='d-flex justify-end'>
          <button
            type='submit'
            disabled={!isFormValid}
            className={`btn btn-primary mb-5`}
          >
            {formData.submitButton}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
