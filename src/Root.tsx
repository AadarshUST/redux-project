import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import { px } from '@gilbarbara/components';
import useTreeChanges from 'tree-changes-hook';

import { name } from '~/config';

import { useAppSelector } from '~/modules/hooks';
import theme, { headerHeight } from '~/modules/theme';

import { alertShow } from '~/actions';

import Footer from '~/components/Footer';
import Header from '~/components/Header';
import PrivateRoute from '~/components/PrivateRoute';
import PublicRoute from '~/components/PublicRoute';
import SystemAlerts from '~/containers/SystemAlerts';
import Home from '~/routes/Home';
import NotFound from '~/routes/NotFound';
import Private from '~/routes/Private';
import Login from '~/routes/Login';
import Register from '~/routes/Register';

import { selectUser } from '~/selectors';
import { UserState } from '~/types';
import Dashoard from './routes/Dashoard';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  opacity: 1 !important;
  position: relative;
  transition: opacity 0.5s;
`;

const Main = styled.main<Pick<UserState, 'isAuthenticated'>>`
  min-height: 100vh;
  padding: ${({ isAuthenticated }) => (isAuthenticated ? `${px(headerHeight)} 0 0` : 0)};
`;

function Root() {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const { changed } = useTreeChanges(user);

  const { isAuthenticated } = user;

  useEffect(() => {
    if (changed('isAuthenticated', true)) {
      dispatch(alertShow('Login SuccessFull!', { type: 'success', icon: 'bell', timeout: 10 }));
    }
  }, [dispatch, changed]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AppWrapper data-component-name="app">
          <Helmet
            defaultTitle={name}
            defer={false}
            encodeSpecialCharacters
            htmlAttributes={{ lang: 'pt-br' }}
            titleAttributes={{ itemprop: 'name', lang: 'pt-br' }}
            titleTemplate={`%s | ${name}`}
          >
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap"
              rel="stylesheet"
            />
          </Helmet>
          {isAuthenticated && <Header />}
          <Main isAuthenticated={isAuthenticated}>
            <Routes>
              <Route
                element={
                  <PublicRoute isAuthenticated={isAuthenticated} to="/private">
                    <Home />
                  </PublicRoute>
                }
                path="/"
              />
              <Route
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/">
                    <Private />
                  </PrivateRoute>
                }
                path="/private"
              />
              <Route
                element={
                  <PublicRoute isAuthenticated={isAuthenticated} to="/private">
                    <Register />
                  </PublicRoute>
                }
                path="/Register"
              />
              <Route
                element={
                  <PublicRoute isAuthenticated={isAuthenticated} to="/private">
                    <Login />
                  </PublicRoute>
                }
                path="/Login"
              />
              <Route
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated} isAdmin={false} to="/private">
                    <Dashoard />
                  // </PrivateRoute>
                }
                path="/Dashoard"
              />
              <Route element={<NotFound />} path="*" />
            </Routes>
          </Main>
          {/* <Footer /> */}
          <SystemAlerts />
        </AppWrapper>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default Root;
