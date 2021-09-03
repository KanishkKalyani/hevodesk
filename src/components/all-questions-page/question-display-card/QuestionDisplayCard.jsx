import React, { useState } from 'react';
import Dropdown from '../../dropdown/Dropdown';
import './QuestionDisplayCard.scss';

const QuestionDisplayCard = ({ questionData, className, history, names }) => {
  const { description, assignee, id } = questionData;

  const [assignedPerson, setAssignedPerson] = useState('');

  const testAssignees = [
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

  const openQuestion = (event) => {
    event.stopPropagation();
    history.push(`/question/${id}`);
  };

  return (
    <div
      className={`question-display-card px-5 py-4 center-flex-row justify-between ${className}`}
    >
      <div className='question-description'>{description}</div>
      <div className='question-status-wrapper center-flex-row justify-end'>
        {assignee ? (
          <div>{assignee}</div>
        ) : (
          <Dropdown
            value={assignedPerson}
            options={testAssignees}
            handleChange={(e) => {
              setAssignedPerson(e.target.value);
            }}
            name='assignee'
            label='Assignee'
            width={150}
          />
        )}
        {/* {resolved ? (
          <div className='bg-success ml-2'>Resolved</div>
        ) : (
          <div className='bg-error ml-2'>Pending</div>
        )}
        <div className='ml-2 text-medium'>{date}</div> */}
      </div>
    </div>
  );
};

export default QuestionDisplayCard;
