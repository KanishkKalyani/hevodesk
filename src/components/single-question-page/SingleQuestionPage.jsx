import React, { useContext, useEffect, useState } from 'react';
import Layout from '../layout/Layout';
import { apiCall } from '../../utils/apiService';
import { LoaderContext } from '../context/LoaderContext';
import ThreadDisplayCard from './thread-display-card/ThreadDisplayCard';
import HdTextField from '../text-field/TextField';

const SingleQuestionPage = ({ match, history }) => {
  const [subject, setSubject] = useState('');
  const [replyInfo, setReplyInfo] = useState({});
  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    question: '',
    submitButton: 'Send',
  });

  const setShowLoader = useContext(LoaderContext);

  const backToQuestions = () => {
    history.push('/all-questions');
  };

  const topbar = () => (
    <div className='center-flex-row justify-between'>
      <div className='d-flex align-items-center'>
        <span
          onClick={backToQuestions}
          className='hevo-icon hevo-left-arrow mr-3 text-accent text-link'
        ></span>
        <span className='text-title text-medium'>Back to Questions</span>
      </div>
      <button
        className='hevo-icon hevo-refresh btn btn-secondary text-accent'
        onClick={getConversation}
      ></button>
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
            threadId: thread_id,
            from: {
              email: from.email,
              firstName: from.first_name,
              lastName: from.last_name,
            },
          })
        );
        setMessages([...allMessages]);
      });
  };

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
      title: subject,
      text: formData.question,
      hr_group_email: 'kanishk.kalyani@hevodata.com',
    };

    setShowLoader(true);
    apiCall.post(`/app/threads/${replyInfo.id}`, body).then((resp) => {
      setShowLoader(false);
      setFormData({
        question: '',
        submitButton: 'Send',
      });
    });
  };

  useEffect(() => {
    // Fetch Question Thread Data Using Id
    getConversation();
  }, []);

  return (
    <Layout topbar={topbar}>
      <div className='h-100 pb-5'>
        <div className='border h-75 overflow-auto'>
          {subject && <div className='text-medium p-5'>{subject}</div>}
          {messages.map((info) => (
            <ThreadDisplayCard
              key={info.threadId}
              {...info}
              setReplyInfo={setReplyInfo}
            />
          ))}
        </div>
        <div className='box p-5 mt-5 h-25'>
          {replyInfo?.from?.email && (
            <div className='mb-2'>{`To: ${replyInfo?.from?.firstName} < ${replyInfo?.from?.email} >`}</div>
          )}
          <form onSubmit={submitForm}>
            <div className='center-flex-row mb-3'>
              <HdTextField
                value={formData.question}
                placeholder='Question'
                onChange={handleChange}
                label='Question'
                name='question'
                multiline
                minRows='2'
                maxRows='3'
                fullWidth
                required
              />
            </div>
            <div className='d-flex justify-end'>
              <button
                type='submit'
                disabled={!formData.question || !replyInfo?.from?.email}
                className={`btn btn-primary mb-5`}
              >
                {formData.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default SingleQuestionPage;
