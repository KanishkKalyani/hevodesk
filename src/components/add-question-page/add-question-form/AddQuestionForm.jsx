import React, { useContext, useEffect, useState } from 'react';
import HdTextField from '../../text-field/TextField';
import './AddQuestionForm.scss';
import Dropdown from '../../dropdown/Dropdown';
import { apiCall } from '../../../utils/apiService';
import { LoaderContext } from '../../context/LoaderContext';

const AddQuestionForm = () => {
  const categories = ['Payroll', 'Wfh', 'Onboarding', 'HelpDesk'];

  const [formData, setFormData] = useState({
    category: '',
    assignee: '',
    subject: '',
    question: '',
    submitButton: 'Send',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const setShowLoader = useContext(LoaderContext);

  useEffect(() => {
    const { category, subject, question } = formData;
    setIsFormValid(Boolean(category && subject && question));
  }, [formData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    setFormData({
      ...formData,
      submitButton: 'Sending...',
    });

    const body = {
      title: formData.subject,
      text: formData.question,
      hr_group_email: 'kanishk.kalyani@hevodata.com',
    };

    setShowLoader(true);
    apiCall.post('/app/threads', body).then((resp) => {
      setShowLoader(false);
      setFormData({
        category: '',
        assignee: '',
        subject: '',
        question: '',
        submitButton: 'Send',
      });
    });
  };

  return (
    <div className='w-100 h-100 center-flex-row justify-center'>
      <div className='box add-question-form-container p-5'>
        <div className='text-bold mb-7'>Question Form</div>
        <form onSubmit={submitForm}>
          <div className='center-flex-row justify-between mb-7'>
            <Dropdown
              value={formData.category}
              options={categories}
              handleChange={handleChange}
              required={true}
              name='category'
              label='Category'
              width={360}
            />
            <Dropdown
              value={formData.assignee}
              options={categories}
              handleChange={handleChange}
              name='assignee'
              label='Assignee'
              width={360}
            />
          </div>
          <div className='center-flex-row mb-7'>
            <HdTextField
              value={formData.subject}
              placeholder='Subject'
              onChange={handleChange}
              label='Subject'
              name='subject'
              fullWidth
              required
            />
          </div>
          <div className='center-flex-row mb-7'>
            <HdTextField
              value={formData.question}
              placeholder='Question'
              onChange={handleChange}
              label='Question'
              name='question'
              multiline
              minRows='7'
              maxRows='7'
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
    </div>
  );
};

export default AddQuestionForm;
