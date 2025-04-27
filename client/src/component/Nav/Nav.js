import React, { useContext, useState } from 'react';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';

const Nav = () => {
  const navConfig = {
    logo: 'LOGO',
  };

  const [open, setOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const { config } = useContext(colorContext);

  // Check if we are on the login or register route
  const isDarkTheme = location.pathname === '/login' || location.pathname === '/register';

  return (
    <Container isDarkTheme={isDarkTheme} theme={config}>
      {/* Hamburger menu */}
      <Hamburger open={open} onClick={() => setOpen(!open)} theme={config}>
        <div></div>
        <div></div>
        <div></div>
      </Hamburger>

      <Logo theme={config}>
        <h1>{navConfig.logo}</h1>
      </Logo>

      <Links open={open} theme={config}>
        <li><Link onClick={() => setOpen(false)} to="/services">محصولات</Link></li>
        <li><Link onClick={() => setOpen(false)} to="/contact">تماس با ما</Link></li>
        <li><Link onClick={() => setOpen(false)} to="/about">درباره ما</Link></li>
        <li><Link onClick={() => setOpen(false)} to="/">صفحه اصلی</Link></li>
      </Links>

      <IconContainer theme={config}>
        <Link to="/dashboard">
          <FaUserCircle className="profile" />
        </Link>

        <Link to="/cart">
          <FaShoppingCart className="cart" />
        </Link>

      </IconContainer>

    </Container>
  );
};

export default Nav;

// Styled Components

const shake = keyframes`
  0%, 100% {
    transform: rotate(0deg);
  }
  20%, 60% {
    transform: rotate(-15deg);
  }
  40%, 80% {
    transform: rotate(15deg);
  }
`;

const activeItems = keyframes`
  0%, 100% {
    transform: scale(1.1);
  }
  20%, 60% {
    transform: scale(1);
    color: goldenrod;
  }
  40%, 80% {
    transform: scale(1.2);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
    /* color: red; */
    /* color: ${({ theme }) => theme.pulse}; */
  }
`;

// Main Container
export const Container = styled.div`
    // transform: scale(0.9); //new
    max-height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    width: calc(100% - 245px);
    padding: 20px;
    border-radius: 16px;
    margin: 20px auto;
    /* background: ${({ theme }) => theme.bg}; */
    background: ${({ theme }) => theme.nav};
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  
  @media (max-width: 899px) {
    background-color: ${({ theme }) => theme.bg};
        position: fixed;
        height: 40px;
        z-index: 1000;
        margin: 0px;
        width: 100%;
        border-radius: 0;
  }
`;

// Icon Container
export const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  // background-color: red;

  @media (max-width: 899px) {
    position: fixed;
    top: 10;
    right: 50px;
    z-index: 20;
  }

  a {
    color: ${({ theme }) => theme.iconA};
    margin: 10px;
    transition: color 0.3s ease;
    font-size: 30px;

    &:hover {
      /* color: ${({ theme }) => theme.profile}; */
      color: ${({ theme }) => theme.profileSvg};
    }
  }

  .cart {
    /* color: ${({ theme }) => theme.cart}; */
    color: ${({ theme }) => theme.CartSvg};

    &:hover {
      animation: ${shake} 0.4s ease-in-out;
    }
  }

.profile {
  animation: none; /* No animation by default */
  color: ${({ theme }) => theme.profileSvg};

  &:hover {
    animation: ${pulse} 0.9s ease-in-out infinite; /* Apply pulse on hover */
  }
}

`;

// Links
export const Links = styled.ul`
  list-style: none;
  display: flex;
  gap: 30px;
  padding: 12px 10px;

  li {
    padding: 5px 0;
  }

  li a {
    text-decoration: none;
    /* color: ${({ theme }) => theme.linkA}; */
    color: ${({ theme }) => theme.navLink};
    transition: color 0.3s ease;
    font-size: 18px;
    white-space: nowrap;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      bottom: -3px;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      /* background-color: ${({ theme }) => theme.linkLi}; */
      background-color: ${({ theme }) => theme.navLinkHover};
      transition: width 0.3s ease;
    }

    &:hover {
      color: ${({ theme }) => theme.linkLi};
    }

    &:hover::after {
      width: 100%;
    }
  }

  @media (max-width: 899px) {
  // display:none;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    width: 250px;
    height: 100vh;
    border-radius: 30px 0 0 30px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    padding-top: 80px;
    backdrop-filter: blur(12px);
    background: ${({ theme }) => theme.linksPhone};

    ${(props) =>
    props.open &&
    `
        transform: translateX(0);
        z-index: 1000;
    `}

    li {
      text-align: center;
      padding: 15px;
      cursor: pointer;
      border-radius: 5px;
      margin-bottom: 10px;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
`;

// Logo
export const Logo = styled.div`
  /* color: ${({ theme }) => theme.logoContainer}; */
  color: ${({ theme }) => theme.logo};


  h1 {
    font-size: 24px;
    font-weight: bold;
    /* color: ${({ theme }) => theme.h1}; */
  }

  @media (max-width: 899px) {
    display: none;
  }
`;

// Hamburger Menu
export const Hamburger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 15px;
  left: 10px;
  z-index: 20;
  display: none;
  cursor: pointer;

  div {
    width: 2rem;
    height: 0.25rem;
    background: ${({ theme }) => theme.hamDiv};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
  }

  ${(props) =>
    props.open &&
    `
    div:nth-child(1) {
        transform: rotate(45deg);
    }
    div:nth-child(2) {
        transform: translateX(-500%);
        opacity: 0;
    }
    div:nth-child(3) {
        transform: rotate(-45deg);
    }
  `}

  @media (max-width: 899px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
`;
