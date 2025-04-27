import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';


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
    transform: translateX(-50%);
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
// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: space-around;
  width: 100%;
  height: fit-content;
  /* background: ${({ theme }) => theme.bg}; */
  background: ${({ theme }) => theme.boxBg};
  padding-top: 50px;
  padding-bottom: 60px;
  animation: ${({ isVisible }) => (isVisible ? riseUp : 'none')} 1s ease-out forwards;

  @media screen and (min-width: 1000px) {
    flex-direction: row;
    justify-content: center;
  }
`;

const CounterWrapper = styled.div`
  margin: 20px;
  width: 300px;
//  background-color: ${({ theme }) => theme.countWrapper};
`;

const Number = styled.span`
  /* color:  ${({ theme }) => theme.number}; */
  color:  ${({ theme }) => theme.links2};
  padding: 10px;
  font-weight: bold;
  font-size: 38px;
  transition: all 0.3s ease-out;
`;

const Counter = styled.h2`
  /* color:  ${({ theme }) => theme.counter}; */
  color:  ${({ theme }) => theme.link1};
  padding: 20px;
  font-weight: bold;
  font-size: 23px;
`;

const ClientCounter = () => {

    const { config } = useContext(colorContext);
    const [isVisible, setIsVisible] = useState(false); // State to track visibility
    const sectionRef = useRef(null);
    const [hover, setHover] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger visibility change when in view
                    observer.unobserve(sectionRef.current); // Stop observing once it's in view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the component is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const [currentClients, setCurrentClients] = useState(0);
    const [happyClients, setHappyClients] = useState(0);
    const [yearsOfExprience, setYearsOfExprience] = useState(0);
    const targetCurrentClients = 91;
    const targetHappyClients = 1873;
    const targetYearsOfExperience = 3;

    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    startCounter(setCurrentClients, targetCurrentClients);
                    startCounter(setHappyClients, targetHappyClients);
                    startCounter(setYearsOfExprience, targetYearsOfExperience);

                    window.removeEventListener('scroll', handleScroll); // Remove event listener after triggering
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const startCounter = (setStateFunction, target) => {
        let count = 0;
        const increment = target / 200; // Smaller increment for smoother animation
        const interval = setInterval(() => {
            count += increment;
            if (count >= target) {
                clearInterval(interval);
                count = target;
            }
            setStateFunction(Math.floor(count));
        }, 15); // Longer interval for smoother animation
    };

    return (
        <Container
            theme={config}
            ref={sectionRef}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            isVisible={isVisible}
        >
            <CounterWrapper>
                <Number theme={config}>{happyClients}</Number>
                <Counter theme={config} >مشتریان راضی</Counter>
            </CounterWrapper>
            <CounterWrapper theme={config}>
                <Number theme={config}>{currentClients}</Number>
                <Counter theme={config}>مشتریان فعلی</Counter>
            </CounterWrapper>
            <CounterWrapper theme={config}>
                <Number theme={config}>{yearsOfExprience}</Number>
                <Counter theme={config}>سال‌های تجربه</Counter>
            </CounterWrapper>
        </Container>
    );
};

export default ClientCounter;
