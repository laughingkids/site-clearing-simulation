import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {useLocation, useNavigate} from 'react-router-dom';
import {useLayoutContext} from '../../../context/layout.context';
import {BrandIcon} from '../icons';
import {colors} from '../../../styles';

export default function DrawerMenu() {
  const {drawerWidth, routes} = useLayoutContext();
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        backgroundColor: colors.primaryBackground,
        color: colors.primaryText,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar>
        <BrandIcon />
      </Toolbar>
      <Divider />
      <List>
        {routes.map(({route, title}, index) => (
          <ListItem
            key={title}
            disablePadding
            selected={route === location.pathname}
          >
            <ListItemButton
              onClick={() => {
                navigate(route);
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
