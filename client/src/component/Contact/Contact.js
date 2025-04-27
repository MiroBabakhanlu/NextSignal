import React, { useContext, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaInstagram, FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';  // Import specific icons
import { colorContext } from '../../Context/ColorContextProvider';



const Contact = () => {

  const { config } = useContext(colorContext);
  const [isVisible, setIsVisible] = useState(false); // State to track visibility
  const containerRef = useRef(null); // Reference to the container
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger visibility change when in view
          observer.unobserve(containerRef.current); // Stop observing once it's in view
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <ContactContainer
      ref={containerRef}
      theme={config}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      isVisible={isVisible}
    >
      <Title theme={config}>تماس با ما</Title> {/* Persian for "Contact Us" */}

      <Description theme={config}>شما می‌توانید از طریق پلتفرم‌های زیر با ما ارتباط برقرار کنید:</Description> {/* Persian for "You can contact us via the following platforms:" */}

      {/* Social Media Links */}
      <SocialLinks theme={config}>
        <SocialLink theme={config} href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </SocialLink>

        <SocialLink theme={config} href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </SocialLink>

        <SocialLink theme={config} href="https://t.me/yourtelegramusername" target="_blank" rel="noopener noreferrer">
          <FaTelegramPlane />
        </SocialLink>
      </SocialLinks>

      <p style={{ color: `${config.description}` }}>ما منتظر پیام‌های شما هستیم!</p> {/* Persian for "We look forward to your messages!" */}
    </ContactContainer>
  );
};

export default Contact;

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

const ContactContainer = styled.div`
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 100px;
  padding-top: 100px;
  /* background-color: ${({ theme }) => theme.bg}; */
  /* background-color: ${({ theme }) => theme.mainBg}; */
        transform: scale(0.95);
    animation: ${({ isVisible }) => (isVisible ? riseUp : 'none')} 2s ease-out forwards;


`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  /* color: ${({ theme }) => theme.title}; */
  color: ${({ theme }) => theme.titile1};
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
  /* color: ${({ theme }) => theme.description}; */
  color: ${({ theme }) => theme.description};
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 30px;
  // background-color:${({ theme }) => theme.socialLinks} ;
`;

const SocialLink = styled.a`
  display: block;
  width: 50px;
  height: 50px;
  /* color: ${({ theme }) => theme.socialLink} ; */
  color: ${({ theme }) => theme.links2} ;
  font-size: 2rem;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`;
