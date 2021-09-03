import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import QuestionDisplayCard from './question-display-card/QuestionDisplayCard';
import './AllQuestionsPage.scss';
import { apiCall } from '../../utils/apiService';
import { LoaderContext } from '../context/LoaderContext';

const AllQuestionsPage = ({ history }) => {
  const [questions, setQuestions] = useState([]);

  const setShowLoader = useContext(LoaderContext);

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  const topbar = () => (
    <div className='center-flex-row justify-between'>
      <div>
        <div className='text-title text-medium'>
          {questions.length > 0
            ? `${questions.length} Questions`
            : 'No Questions Found'}
        </div>
        <div className='text-secondary'>
          List of all the question asked by you
        </div>
      </div>
      <button
        className='hevo-icon hevo-refresh btn btn-secondary text-accent'
        onClick={getAllQuestions}
      ></button>
    </div>
  );

  const getAllQuestions = () => {
    setShowLoader(true);
    apiCall.get('/app/threads').then(({ data }) => {
      setShowLoader(false);
      const newQuestions = data.threads.map((info) => ({
        id: info.id,
        description: info.snippet,
        assignee: info.assigned_to?.first_name,
        assigneeMail: info.assigned_to?.email,
      }));
      setQuestions([...newQuestions]);
    });
  };

  const toQuestionPage = () => {
    history.push('/ask-question');
  };

  useEffect(() => {
    // set admin/hr mode here
    getAllQuestions();
  }, []);

  const noQuestionsBox = () => (
    <div className='no-item-box m-0 w-100 h-100'>
      <div className='no-item-box-icon-container'>
        <span className='no-item-box-icon hevo-icon hevo-help'></span>
      </div>
      <div className='no-item-box-title'>There are no Questions 😊</div>
      <div className='no-item-box-desc'>
        You have not asked any questions till now.
      </div>
      <div className='no-item-actions-container'>
        <button className='btn btn-primary' onClick={toQuestionPage}>
          + Ask a Question
        </button>
      </div>
    </div>
  );
  const header = () => <div className='box__header'>All Questions</div>;

  return (
    <Layout topbar={topbar}>
      {questions.length === 0 ? (
        noQuestionsBox()
      ) : (
        <div className='w-100 box p-5'>
          {header()}
          <div>
            {questions.map((questionData, index) => (
              <QuestionDisplayCard
                key={questionData.id}
                questionData={questionData}
                names={names}
                className={`${index % 2 !== 0 && 'bg-surface-navbar'}`}
              />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AllQuestionsPage;
