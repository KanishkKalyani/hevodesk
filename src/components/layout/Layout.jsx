import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import Image from '../image-upload/Image';
import { isAuth, signout } from '../../utils/helpers';
import './Layout.scss';
import HevoDeskLogo from '../hevodesk-logo/HevoDeskLogo';
import './Layout.scss';

const Layout = ({ children, history, topbar }) => {
  const userData = isAuth();

  const userCard = () => (
    <>
      <div className='bg-surface-alternate center-flex-col p-3 mb-2'>
        <span className='hevo-icon hevo-user'></span>
        <div className='center-flex-col align-items-start'>
          <span>Hello {userData.first_name}!</span>
        </div>
      </div>
      <div className='text-secondary text-ellipsis'>{userData.email}</div>
    </>
  );

  const logout = () => {
    signout(() => {
      history.push('/');
    });
  };

  const nav = () => (
    <div className='navbar center-flex-col bg-surface-navbar'>
      <HevoDeskLogo className='navbar-logo' />

      <div
        className={`w-100 center-flex-col align-items-start ${
          userData.hr && 'border-bottom'
        } pb-2 px-2`}
      >
        <div className='navbar-option p-2'>
          <Link to='/ask-question' className='center-flex-row'>
            <span className='hevo-icon hevo-help mr-1 text-accent'></span>
            Ask Question
          </Link>
        </div>
        <div className='navbar-option p-2'>
          <Link to='/all-questions' className='center-flex-row'>
            <span className='hevo-icon hevo-history mr-1 text-accent'></span>
            All Questions
          </Link>
        </div>
        <div className='navbar-option p-2'>
          <Link to='/forms' className='center-flex-row'>
            <span className='hevo-icon hevo-table mr-1 text-accent'></span>
            Forms
          </Link>
        </div>
      </div>

      {userData.hr && (
        <div className='w-100 center-flex-col align-items-start px-2 mt-4'>
          <div className='navbar-option p-2'>
            <Link to='/employee-queries' className='center-flex-row'>
              <span className='hevo-icon hevo-team mr-1 text-accent'></span>
              Employee queries
            </Link>
          </div>
          <div className='navbar-option p-2'>
            <Link to='/control-panel' className='center-flex-row'>
              <span className='hevo-icon hevo-settings mr-1 text-accent'></span>
              Control Panel
            </Link>
          </div>
        </div>
      )}

      <div className='w-100 user-details p-2'>
        <button
          className='btn text-capitalize text-normal navbar-option mb-2'
          onClick={logout}
        >
          <span className='hevo-icon hevo-logout text-accent mr-2'></span>
          Logout
        </button>
        <div className='border-top center-flex-col p-3'>{userCard()}</div>
      </div>
    </div>
  );

  return (
    <div className='layout h-100'>
      {nav()}
      <ToastContainer draggable={false} transition={Zoom} autoClose={2000} />
      {topbar && <div className='topbar p-5 border-bottom'>{topbar()}</div>}
      <div className='children-container p-5'>{children}</div>
    </div>
  );
};

export default withRouter(Layout);
