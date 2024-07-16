import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { logOut } from '~/actions';

import Logo from '~/components/Logo';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';

const HeaderWrapper = styled.header`
  background-color: #113740;
  height: ${headerHeight}px;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 200;

  &:before {
    background-color: ${appColor};
    bottom: 0;
    content: '';
    height: 2px;
    left: 0;
    position: absolute;
    right: 0;
  }
`;

const Logout = styled.button`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;

  ${responsive({ lg: { fontSize: '16px' } })};

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`;

const Login = styled.button`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 14px;

  ${responsive({ lg: { fontSize: '16px' } })};

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`;
export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector(selectUser);

  const handleClickLogout = () => {
    dispatch(logOut());
  };
  const handleClickLogin = () => {
    navigate("/login");
  }

  return (

    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        {
          isAuthenticated ? (
            <Logout data-component-name="Logout" onClick={handleClickLogout}>
              <Text>Logout</Text>
              <Icon ml="xs" name="sign-out" />
            </Logout>
          ) : (
            <Login data-component-name="Login" onClick={handleClickLogin}>
              <Text>Login</Text>
              <Icon ml="xs" name="sign-in" />
            </Login>
          )
        }
      </Container>
    </HeaderWrapper>
  );
}
