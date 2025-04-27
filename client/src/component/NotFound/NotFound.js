import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f7f7f7;
  color: #333;
`;

const Message = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const SubMessage = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
`;

const HomeLink = styled(Link)`
  font-size: 1.2rem;
  color: white;
  background-color: grey; 
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    transform: scale(1.05);
  }
`;

const NotFound = () => {
    return (
        <NotFoundContainer>
            <Message>۴۰۴ - صفحه یافت نشد</Message>
            <SubMessage>متأسفیم! صفحه‌ای که دنبال آن هستید وجود ندارد.</SubMessage>
            <HomeLink to="/">بازگشت به خانه</HomeLink>
        </NotFoundContainer>
    );
};

export default NotFound;
