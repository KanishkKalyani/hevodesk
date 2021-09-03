import React, { useState } from 'react';
import axios from 'axios';
import { getCookie, signout } from './utils/helpers';
import Routes from './routes/Routes';
import './styles/app.scss';
import { ThemeProvider } from '@material-ui/styles';
import { muiHevoTheme } from './mui-hevo-theme';
import Loader from './components/loader/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import { LoaderContext } from './components/context/LoaderContext';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

axios.interceptors.request.use((config) => {
  console.log('RECEPTOR');
  const token = getCookie('token');
  config.headers.authorization =
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MzA2NjU2NDYsImlhdCI6MTYzMDU3OTI0Nn0.d21dvo-5KDCl59kFLwN_bBxHGpEzHD8Q-6J3ZKeQ--I';
  return config;
});

axios.interceptors.response.use(null, (error) => {
  console.log('ERROR', error);
  if (error.response?.status === 401) {
    signout(() => {
      window.location.href = '/';
    });
  }

  return Promise.reject(error);
});

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function App() {
  const classes = useStyles();
  const [showLoader, setShowLoader] = useState(false);

  return (
    <ThemeProvider theme={muiHevoTheme}>
      <>
        <LoaderContext.Provider value={setShowLoader}>
          <Backdrop className={classes.backdrop} open={showLoader}>
            <Loader />
          </Backdrop>
          <Routes></Routes>
        </LoaderContext.Provider>
      </>
    </ThemeProvider>
  );
}

export default App;
