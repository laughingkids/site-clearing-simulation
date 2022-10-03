//NOTE: update this config when introducing new pages

export enum RouteUrl {
  HOME = '/',
  SITE_CLEAN = '/site-clean',
}

export type NavMenuItem = {
  route: RouteUrl;
  title: 'Readme' | 'Site Clean Tool';
};

export const defaultRoutes: NavMenuItem[] = [
  {
    route: RouteUrl.HOME,
    title: 'Readme',
  },
  {
    route: RouteUrl.SITE_CLEAN,
    title: 'Site Clean Tool',
  },
];
