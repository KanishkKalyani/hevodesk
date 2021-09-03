import React from 'react';
import loader from '../../assets/images/ajax-loader-big.gif';

import './loader.scss';

function Loader({ msg }) {
  return (
    <div id='data-loading'>
      <div className='loading-content clearfix'>
        <img src={loader} alt='loader' />
        <div className='loading-text'>
          <div>
            <b>LOADING YOUR DATA</b>
          </div>
          <div>{msg || 'Please wait...'}</div>
        </div>
      </div>
    </div>
  );
}

export default Loader;
