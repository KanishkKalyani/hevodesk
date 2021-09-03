import React, { useCallback, useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { apiCall } from '../../utils/apiService';
import { LoaderContext } from '../context/LoaderContext';
import ThreadDisplayCard from './thread-display-card/ThreadDisplayCard';

const SingleQuestionPage = ({ match, history }) => {
  const [subject, setSubject] = useState('');
  const [messages, setMessages] = useState([]);

  const setShowLoader = useContext(LoaderContext);

  const backToQuestions = () => {
    history.push('/all-questions');
  };

  const topbar = () => (
    <div className='h-100 center-flex-row'>
      <span
        onClick={backToQuestions}
        className='hevo-icon hevo-left-arrow mr-3 text-accent text-link'
      ></span>
      <span className='text-title text-medium'>Back to Questions</span>
    </div>
  );

  const getConversation = () => {
    setShowLoader(true);
    apiCall
      .get(`/app/threads/${match.params.id}`)
      .then(({ subject, messages }) => {
        setShowLoader(false);
        setSubject(subject);

        const allMessages = messages.map(
          ({ id, snippet, text, thread_id, time, from }) => ({
            id,
            time,
            description: text,
            threadid: thread_id,
            from,
          })
        );
        setMessages([...allMessages]);
      });
  };

  useEffect(() => {
    // Fetch Question Thread Data Using Id
    getConversation();
  }, []);

  return (
    <Layout topbar={topbar}>
      {messages.map((info) => (
        <ThreadDisplayCard key={info.id} />
      ))}
    </Layout>
  );
};

export default SingleQuestionPage;
