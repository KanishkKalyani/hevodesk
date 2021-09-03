import React, { useState } from 'react';
import Routes from './routes/Routes';
import './styles/app.scss';
import { ThemeProvider } from '@material-ui/styles';
import { muiHevoTheme } from './mui-hevo-theme';
import Loader from './components/loader/Loader';
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop } from '@material-ui/core';
import { LoaderContext } from './components/context/LoaderContext';

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
