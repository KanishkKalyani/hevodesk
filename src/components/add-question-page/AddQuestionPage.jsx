import React from 'react';
import Layout from '../layout/Layout';
import AddQuestionForm from './add-question-form/AddQuestionForm';

const AddQuestionPage = () => {
  const topbar = () => (
    <div>
      <div className='text-title text-medium'>Ask a question</div>
      <div className='text-secondary'>Form to ask questions</div>
    </div>
  );

  return (
    <Layout topbar={topbar}>
      <AddQuestionForm />
    </Layout>
  );
};

export default AddQuestionPage;
