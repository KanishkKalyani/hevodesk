import React, { useEffect } from 'react';
import FormRow from './form-row/FormRow';

const AllFormsList = ({ formsList, getAllForms }) => {
  return (
    <div className='box'>
      <div className='text-medium p-5'>All Forms</div>
      {formsList.map(({ id, title, link, description }) => (
        <FormRow
          key={id}
          id={id}
          title={title}
          link={link}
          description={description}
          getAllForms={getAllForms}
        />
      ))}
    </div>
  );
};

export default AllFormsList;
