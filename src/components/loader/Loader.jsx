import React from 'react';
import loader from '../../assets/images/ajax-loader-big.gif';

import './loader.scss';

function Loader({ msg }) {
  return (
    <div id='data-loading'>
      <div class='loading-content clearfix'>
        <img src={loader} alt='loader' />
        <div class='loading-text'>
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
