import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import AddForm from './add-form/AddForm';
import AllFormsList from './all-forms-list/AllFormsList';
import './FormPage.scss';
import { isAuth } from '../../utils/helpers';
import { apiCall } from '../../utils/apiService';
import { LoaderContext } from '../context/LoaderContext';

const FormPage = () => {
  const topbar = () => (
    <div>
      <div className='text-title text-medium'>Forms</div>
      <div className='text-secondary'>Links for all the available forms</div>
    </div>
  );

  const userData = isAuth();

  const [formsList, setFormsList] = useState([]);

  const setShowLoader = useContext(LoaderContext);

  const getAllForms = () => {
    setShowLoader(true);
    apiCall.get('/app/forms').then(({ forms }) => {
      setShowLoader(false);
      setFormsList(forms);
    });
  };

  useEffect(() => {
    getAllForms();
  }, []);

  return (
    <Layout topbar={topbar}>
      <div className={`w-100 ${userData.hr && 'forms-display-container'}`}>
        {userData.hr && (
          <AddForm className='add-form' getAllForms={getAllForms} />
        )}
        <AllFormsList
          className='add-forms-list'
          formsList={formsList}
          getAllForms={getAllForms}
        />
      </div>
    </Layout>
  );
};

export default FormPage;
