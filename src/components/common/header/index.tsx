import * as React from 'react';
import {AppBar, Toolbar, Typography} from '@mui/material';
import {useLayoutContext} from '../../../context/layout.context';
import {useLocation} from 'react-router-dom';
import {defaultRoutes} from '../../../types/route';

const Header = () => {
  const {drawerWidth} = useLayoutContext();
  const location = useLocation();
  const headerTitle =
    defaultRoutes.find(({route}) => route === location.pathname)?.title ||
    'Not Found';
  return (
    <AppBar
      position="fixed"
      sx={{width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {headerTitle}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
