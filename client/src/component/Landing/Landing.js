import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';

// Keyframes for animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInContainer = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const float = keyframes`
  0% {
    transform: translate(-50%, -50%) translateY(0);
  }
  50% {
    transform: translate(-50%, -50%) translateY(-30px);
  }
  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
`;

const orbit1 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(200px) rotate(-360deg);
  }
`;

const orbit2 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(250px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(250px) rotate(-360deg);
  }
`;

const orbit3 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(300px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(300px) rotate(-360deg);
  }
`;

const orbit4 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(350px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(350px) rotate(-360deg);
  }
`;

const orbit5 = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg) translateX(400px) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg) translateX(400px) rotate(-360deg);
  }
`;

const Landing = () => {
  const lettersConfig = {
    1: 'V',
    2: 'I',
    3: 'O',
    4: 'L',
    5: 'A',
    6: '',
    7: '',
    8: '',
    9: '',
  }
  const { config } = useContext(colorContext); // Access the color context

  return (
    <Container theme={config}>
      <Left theme={config}>
        <TextLeft theme={config}>
          {lettersConfig[1]} <span className="i">{lettersConfig[2]}</span>
        </TextLeft>
      </Left>

      <Center theme={config} fontSize="300px" >
        <ShopLink theme={config} href="#shop">{lettersConfig[1]}</ShopLink>
        <ShopLink theme={config} href="#shop">{lettersConfig[2]}</ShopLink>
        <ShopLink theme={config} href="#shop">{lettersConfig[3]}</ShopLink>
        <ShopLink theme={config} href="#shop">{lettersConfig[4]}</ShopLink>
        <ShopLink theme={config} href="#shop">{lettersConfig[5]}</ShopLink>
        {lettersConfig[3]}
      </Center>

      <CenterButtons theme={config}>
        <Link to="/store">
          <StoreButton theme={config}>فروشگاه</StoreButton>
        </Link>
      </CenterButtons>

      <CenterButtons2 theme={config}>
        <Link to="/about">
          <AboutButton theme={config}>درباره ما</AboutButton>
        </Link>
      </CenterButtons2>

      <Right theme={config}>
        <TextRight theme={config}>
          {lettersConfig[4]} <span className="a">{lettersConfig[5]}</span>
        </TextRight>
      </Right>
    </Container>
  );
};

// Styled Components

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  position: relative;
  opacity: 0;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  /* background-color: ${(props) => props.bg}; */
  animation: ${fadeInContainer} 2s ease-in-out forwards;
  overflow: hidden;
`;

const Left = styled.div`
  flex: 1;
  height: 100%;
  backdrop-filter: blur(18px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: ${(props) => props.left}; */
  background-color: ${({ theme }) => theme.landingLeftBg};
`;

const Right = styled.div`
  flex: 1;
  height: 100%;
  /* background: ${(props) => props.right}; */
  background: ${({ theme }) => theme.landingRightBg};
  backdrop-filter: blur(18px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Center = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  font-family: 'Times New Roman', Times, serif;
  transform: translate(-50%, -50%);
  /* font-size: ${(props) => props.fontSize}; */
  font-size: 300px;
  font-weight: bold;
  /* color: ${(props) => props.color}; */
  color: ${({ theme }) => theme.textCenter};
  text-shadow: 4px 4px 40px rgba(0, 0, 0, 0.3);
  z-index: 2;
  opacity: 0;
  animation: ${fadeIn} 3s ease-in-out forwards, ${float} 2s infinite ease-in-out;
  cursor: pointer;


     @media screen and (max-width: 500px) {
        font-size: 300px;
    }
`;

const ShopLink = styled.p`
  position: absolute;
  font-size: 20px;
  font-weight: bold;
  /* color: ${(props) => props.centerButtons}; */
  color: ${({ theme }) => theme.shopBtn};
  text-decoration: none;
  opacity: 0.5;
  z-index: 3;
  transition: color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:nth-child(1) {
    animation: ${orbit1} 12s infinite linear;
  }
  &:nth-child(2) {
    animation: ${orbit2} 14s infinite linear;
  }
  &:nth-child(3) {
    animation: ${orbit3} 16s infinite linear;
  }
  &:nth-child(4) {
    animation: ${orbit4} 18s infinite linear;
  }
  &:nth-child(5) {
    animation: ${orbit5} 20s infinite linear;
  }
`;

const CenterButtons = styled.div`
  z-index: 100;
  right: 50%;
  top: 80%;
  position: absolute;
`;

const CenterButtons2 = styled.div`
  z-index: 100;
  top: 80%;
  left: 50%;
  position: absolute;
`;

const StoreButton = styled.button`
  color: white;
  z-index: 100;
  border-radius: 50px 0px 0px 500px;
  /* background-color: ${(props) => props.storeButton}; */
  background-color: ${({ theme }) => theme.shopBtn};
  border: none;
  padding: 30px;
  font-family: 'Vazir', 'Playfair Display', serif;
  text-align: center;

  &:hover {
    /* background-color: ${(props) => props.aboutButton}; */
    background-color: ${({ theme }) => theme.aboutBtn};
    transform: scale(1.05);
  }

  &:active {
    /* background-color: ${(props) => props.storeButton}; */
    background-color: ${({ theme }) => theme.shopBtn};
    transform: scale(1);
  }
`;

const AboutButton = styled.button`
  color: white;
  z-index: 100;
  border-radius: 0px 50px 500px 0px;
  /* background-color: ${(props) => props.aboutButton}; */
  background-color: ${({ theme }) => theme.aboutBtn};
  text-align: center;
  border: none;
  font-family: 'Vazir', 'Playfair Display', serif;
  padding: 30px;
`;

const TextLeft = styled.div`
  font-size: 120px;
  font-weight: bold;
  /* color: ${(props) => props.textLeft}; */
  color: ${({ theme }) => theme.textLeft};
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in-out forwards;
  animation-delay: 0.5s;
  cursor: pointer;
  font-family: 'Times New Roman', Times, serif;
  transition: transform 0.4s ease, color 0.3s ease, text-shadow 0.4s ease;


     @media screen and (max-width: 500px) {
        font-size: 100px
    }
`;

const TextRight = styled.div`
  font-size: 120px;
  font-weight: bold;
  /* color: ${(props) => props.textRight}; */
  color: ${({ theme }) => theme.textRight};
  z-index: 1;
  opacity: 0;
  animation: ${fadeIn} 2s ease-in-out forwards;
  animation-delay: 0.5s;
  cursor: pointer;
  font-family: 'Times New Roman', Times, serif;
  transition: transform 0.4s ease, color 0.3s ease, text-shadow 0.4s ease;

   @media screen and (max-width: 500px) {
        font-size: 100px
    }
`;

export default Landing;
