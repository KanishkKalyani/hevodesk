import React from 'react';
import './ThreadDisplay.scss';

const ThreadDisplayCard = ({
  time,
  description,
  threadId,
  from,
  setReplyInfo,
}) => {
  return (
    <div className='border-top position-relative p-5'>
      <div>{from.firstName}</div>
      <div className='mt-2'>{from.email}</div>
      <div className='mt-5'>{description}</div>
      <div className='time text-caption-1 text-secondary'>{time}</div>
      <button
        className='btn btn-primary text-body-3 mt-5'
        onClick={() => {
          setReplyInfo({ id: threadId, from });
        }}
      >
        <span className='hevo-icon hevo-undo mr-2 text-body-3'></span>
        Reply
      </button>
    </div>
  );
};

export default ThreadDisplayCard;
