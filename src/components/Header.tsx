import { useDispatch } from 'react-redux';
import styled from '@emotion/styled';
import { Container, Icon, Input, responsive, Text } from '@gilbarbara/components';

import { appColor, headerHeight } from '~/modules/theme';

import { logOut } from '~/actions';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import Logo from '~/components/Logo';
import { useAppSelector } from '~/modules/hooks';
import { selectUser } from '~/selectors';
import { Button, Modal } from 'react-bootstrap';
import { useState } from 'react';
import AddRecipes from './DashboardComponents/AddRecipes';

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

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  border-radius: 4px;
  padding: 2px 8px;
  margin-left: 16px;
  width: 240px; /* Adjust width as needed */
  svg {
    color: #fff;
    cursor: pointer;
  }
     input {
    outline: none;
    color: ${appColor};
    &:focus {
      border: 1px solid #fff;
      outline: none;
      box-shadow: none;
    }
  }
    
`;

const NavLinkContainer = styled.nav`
  display: flex;
  align-items: center;
`;

const NavLinkItem = styled(RouterNavLink)`
  color: #fff;
  text-decoration: none;
  margin-left: 16px;
  font-size: 14px;
  ${responsive({ lg: { fontSize: '14px' } })};
  &.active {
    font-weight: bold;
    color: ${appColor};
  }
    &:hover{
    color: ${appColor};
    }
`;
const AddRecipeLink = styled.button`
  color: #fff;
  background: none;
  border: none;
  margin-left: 16px;
  font-size: 14px;
  ${responsive({ lg: { fontSize: '14px' } })};
  &:hover {
    color: ${appColor};
  }
  &:focus {
    outline: none;
  }
`;



export default function Header() {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useAppSelector(selectUser);
  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(logOut());
  };

  const handleClickLogin = () => {
    navigate('/Login');
  }

  const [show, setShow] = useState<boolean>(false); // Explicitly annotate show as boolean

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <HeaderWrapper data-component-name="Header">
      <Container direction="row" justify="space-between" padding="md">
        <Logo />
        {/* changes */}
        <NavLinkContainer>

          <NavLinkItem to="/">Home</NavLinkItem>

          {isAuthenticated && role === 1 && (<NavLinkItem to="/dashboard">Dashboard</NavLinkItem>)}

          {isAuthenticated && role === 2 && (
            <>
              <AddRecipeLink onClick={handleShow}>
                Add Recipe
              </AddRecipeLink>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Recipe</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddRecipes closeModal={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </>
          )}

          <NavLinkItem to="/about">
            About
          </NavLinkItem>
        </NavLinkContainer>

        <SearchContainer>
          <Input type="text" placeholder="Search..." name={''} />
          <Icon ml="xs" name="search" />
        </SearchContainer>

        {/* changes */}
        {
          !isAuthenticated ?
            <Login data-component-name="Login" onClick={handleClickLogin}>
              <Text>login</Text>
              <Icon ml="xs" name="sign-in" />
            </Login>
            :
            <Logout data-component-name="Logout" onClick={handleClickLogout}>
              <Text>logout</Text>
              <Icon ml="xs" name="sign-out" />
            </Logout>
        }
      </Container>
    </HeaderWrapper>
  );
}