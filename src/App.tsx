import React from 'react';
import {SiteCleaningPage, HomePage, NotFoundPage} from './pages';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {RouteUrl} from './types/route';

export default function App() {
  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path={RouteUrl.HOME} element={<HomePage />} />
          <Route path={RouteUrl.SITE_CLEAN} element={<SiteCleaningPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
}
