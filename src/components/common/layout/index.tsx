import {Box, CssBaseline, Toolbar} from '@mui/material';
import * as React from 'react';
import {Header} from '../';
import {useLayoutContext, LayoutContext} from '../../../context/layout.context';
import DrawerMenu from '../drawer-menu';

const Layout = ({children}: {children: JSX.Element}) => {
  const value = useLayoutContext();
  return (
    <LayoutContext.Provider value={value}>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <Header />
        <DrawerMenu />
        <Box
          component="main"
          sx={{flexGrow: 1, bgcolor: 'background.default', p: 3}}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </LayoutContext.Provider>
  );
};

export default Layout;
