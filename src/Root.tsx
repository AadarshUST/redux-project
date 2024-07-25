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

// import Footer from '~/components/Footer';
import Header from '~/components/Header';
import PrivateRoute from '~/components/PrivateRoute';
import PublicRoute from '~/components/PublicRoute';
import SystemAlerts from '~/containers/SystemAlerts';
// import Home from '~/routes/Home';
import NotFound from '~/routes/NotFound';
// import Private from '~/routes/Private';
import Login from '~/routes/Login';
import Register from '~/routes/Register';

import { selectUser } from '~/selectors';
import { UserState } from '~/types';
import Dashboard from './routes/Dashboard';
import Post from './routes/Post';
import DashboardHome from './components/DashboardComponents/Home'
import LandingPage from './routes/LandingPage';
import EachRecipe from './routes/EachRecipe';
import RecipeForm from './routes/RecipeForm';
import './Style/Global.css';

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
  // const [handelAdmin, setHandelAdmin] = useState(false);

  const { isAuthenticated, role } = user;

  // console.log(user.role);

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
                  <LandingPage />
                }
                path="/"
              />
              <Route
                // element={<LandingPage />}
                element={<EachRecipe />}
                path='/:id'
              />
              <Route
                element={
                  <PrivateRoute isAuthenticated={isAuthenticated} to="/Login">
                    <RecipeForm />
                  </PrivateRoute>

                }
                path='/edit-recipe/:id'
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
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <Login />
                  </PublicRoute>
                }
                path="/Login"
              />
              <Route element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard isAdmin={role} />
                </PrivateRoute>
              } path="/dashboard">
                <Route element={<DashboardHome />} path="/dashboard" />
                <Route element={<Post />} path="post" />
              </Route>

              {/* <Route
                element={
                  // <PrivateRoute isAuthenticated={isAuthenticated} isAdmin={false} to="/private">
                  <Dashboard />
                  // </PrivateRoute>
                }
                path="/Dashboard"
              /> */}
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
