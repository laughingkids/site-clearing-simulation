import {Alert} from '@mui/material';
import * as React from 'react';
import {Layout} from '../../components/common';

const NotFoundPage = () => {
  return (
    <Layout>
      <Alert severity="error">404</Alert>
    </Layout>
  );
};

export default NotFoundPage;
