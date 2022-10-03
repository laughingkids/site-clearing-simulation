import {createContext, useContext} from 'react';
import {defaultRoutes, NavMenuItem} from '../types/route';

interface LayoutContextInterface {
  drawerWidth: number;
  routes: NavMenuItem[];
}

const defaultContext = {
  drawerWidth: 240,
  routes: defaultRoutes,
};

export const LayoutContext =
  createContext<LayoutContextInterface>(defaultContext);

export function useLayoutContext() {
  const context = useContext(LayoutContext);
  return context;
}
