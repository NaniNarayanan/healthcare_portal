
/* eslint-disable */

import React from 'react';
import Approutes from './routes/AppRoutes';
import AuthProvider from './context/AuthContext';

function App(props) {
  return (
    <>
      <AuthProvider>
        <Approutes {...props} />
      </AuthProvider>
    </>
  );
}

export default App;
