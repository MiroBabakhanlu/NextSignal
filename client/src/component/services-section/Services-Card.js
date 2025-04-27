import React, { useContext } from 'react';
import { colorContext } from '../../Context/ColorContextProvider';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const ServicesCard = ({ CardData }) => {

    const { config } = useContext(colorContext);
    const { IconImg, title, goTo , linkContent} = CardData;

    return (
        <Card theme={config}>
            <ImgContainer>
                <img src={IconImg} />
            </ImgContainer>


            <TitleContainer theme={config}>
                {title}
            </TitleContainer>


            <LInkContainer theme={config}>
                <Link to={`${goTo}`}> {linkContent} </Link>
            </LInkContainer>

        </Card>
    );
};

export default ServicesCard;

const Card = styled.div`
  background-color: ${(props) => props.theme.boxBg};
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 1rem;
  text-align: center;

  margin-top: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0,0,0,0.15);
  }
`;

const ImgContainer = styled.div`
  margin-bottom: 0.75rem;

  img {
    max-width: 250px;
    height: auto;
    border-radius: 0.5rem;
    transition: transform 0.3s ease;
  }
`;

const TitleContainer = styled.h3`
  font-size: 1.1rem;
  color: ${(props) => props.theme.titile2};
  margin-bottom: 0.5rem;
`;

const LInkContainer = styled.div`
  a {
    font-size: 0.9rem;
    color: ${(props) => props.theme.link1};
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;

    &:hover {
      color: ${(props) => props.theme.svgHover};
      border-color: ${(props) => props.theme.svgHover};
    }
  }
`;



