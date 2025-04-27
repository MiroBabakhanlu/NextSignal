import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaGift, FaLeaf, FaCandyCane, FaChalkboardTeacher, FaSeedling, FaPersonBooth } from 'react-icons/fa';
import { colorContext } from '../../Context/ColorContextProvider';

const OfferingsSchema = ({ imgSrc, title, content, goto }) => {
    const [hover, setHover] = useState(false);
    const { config } = useContext(colorContext);
    // Icon selection based on Persian title
    const renderIcon = () => {
        switch (title) {
            case 'شکلات‌های سفارشی':
                return <Icon theme={config} as={FaCandyCane} />;
            case 'باکس‌های هدیه شکلاتی':
                return <Icon theme={config} as={FaGift} />;
            case 'شکلات‌های فصلی ویژه':
                return <Icon theme={config} as={FaLeaf} />;
            case 'ساخت شکلات‌های هنری':
                return <Icon theme={config} as={FaSeedling} />;
            case 'کارگاه‌های تخصصی شکلات‌سازی':
                return <Icon theme={config} as={FaChalkboardTeacher} />;
            case 'شکلات‌های شخصی‌سازی‌شده':
                return <Icon theme={config} as={FaPersonBooth} />;
            case '.1':
                return '';
            case '.2':
                return '';
            case '.3':
                return '';
            default:
                return <Icon theme={config} as={FaGift} />; // Default icon if no match
        }
    };

    return (
        <Container theme={config}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {renderIcon()}
            <Title theme={config}>{title}</Title>
            <Description theme={config}>{content}</Description>
            <StyledLink to={goto} theme={config}>بیشتر بدانید</StyledLink>
        </Container>
    );
};

export default OfferingsSchema;


const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const riseUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;


// Styled Components
const Container = styled.div`
    width: 90%;
    max-width: 300px;
    height: 250px;
    overflow: hidden;
    word-wrap: wrap;
    background-color:  ${({ theme }) => theme.boxBg};
    border: 2px solid ${({ theme }) => theme.boxBg};
    border-radius: 20px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-align: center;

    &:hover {
        transform: scale(1.05);
    }

    @media screen and (max-width: 768px) {
        width: 80%;
        transform: scale(0.85);
        &:hover {
            transform: scale(0.9);
         }
    }
`;

const Icon = styled.div`
    font-size: 120px;
    color:  ${({ theme }) => theme.svg};
    margin-bottom: 10px;
    transition: color 0.3s ease;
    &:hover {
        color:  ${({ theme }) => theme.svgHover};
    }
  animation: ${fadeIn} 1s ease-out forwards;

`;

const Title = styled.h1`
    font-size: 22px;
    color: ${({ theme }) => theme.titile2};
    margin: 10px 0;
`;

const Description = styled.p`
     font-size: 16px;
    color: ${({ theme }) => theme.description};
    margin: 15px 0;
    width: 100%;
    overflow: hidden;
    word-wrap: break-word;
    height: 250px;
    line-height: 1.6;
    padding: 15px;
`;

const StyledLink = styled(Link)`
    font-size: 16px;
    color: ${({ theme }) => theme.links2};
    text-decoration: none;
    font-weight: bold;
    margin-top: 15px;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.svgHover};
    }
`;
