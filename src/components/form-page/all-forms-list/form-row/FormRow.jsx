import React, { useContext } from 'react';
import { apiCall } from '../../../../utils/apiService';
import { isAuth } from '../../../../utils/helpers';
import { LoaderContext } from '../../../context/LoaderContext';

const FormRow = ({ id, title, link, description, getAllForms }) => {
  const setShowLoader = useContext(LoaderContext);

  const deleteForm = () => {
    setShowLoader(true);
    apiCall.delete(`/app/forms/${id}`).then(() => {
      setShowLoader(false);
      getAllForms();
    });
  };

  const userData = isAuth();

  return (
    <div className='border-top p-5 center-flex-row justify-between'>
      <div>
        <div className='text-medium mb-1'>{title}</div>
        <div className='text-secondary'>{description}</div>
      </div>
      <div>
        {userData.hr && (
          <button
            className='btn btn-secondary text-error text-body-3'
            onClick={deleteForm}
          >
            <span className='hevo-icon hevo-delete mr-1 text-body-3'></span>
            Delete
          </button>
        )}
        <a
          href={link}
          className='btn btn-primary ml-2 text-body-3'
          target='_blank'
          rel='noreferrer'
        >
          Fill Form
        </a>
      </div>
    </div>
  );
};

export default FormRow;
