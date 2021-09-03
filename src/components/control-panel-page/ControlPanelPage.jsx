import React from 'react';
import Layout from '../layout/Layout';
import AddCategories from './add-categories/AddCategories';
import AddTeamMembers from './add-team-members/AddTeamMembers';

const ControlPanelPage = () => {
  const topbar = () => (
    <div>
      <div className='text-title text-medium'>Control Panel</div>
      <div className='text-secondary'>
        Add team members, manage permissions and categories
      </div>
    </div>
  );

  return (
    <Layout topbar={topbar}>
      <AddCategories />
      <AddTeamMembers />
    </Layout>
  );
};

export default ControlPanelPage;
