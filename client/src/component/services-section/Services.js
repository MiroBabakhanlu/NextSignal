import React, { useContext } from 'react';
import { colorContext } from '../../Context/ColorContextProvider';
import styled from 'styled-components';
import ServicesCard from './Services-Card';
import vps1 from '../../imgs/indicator-blue.png';
import vps2 from '../../imgs/vpnBlue.png';
import vps3 from '../../imgs/vpsBlue.png';

const Services = () => {

    const { config } = useContext(colorContext);

    const services = [
        { IconImg: vps1, title: 'VPS', goTo: '/store', linkContent: 'شروع کنید'},
        { IconImg: vps2, title: 'INDICATORS', goTo: '/service/indicator', linkContent: 'شروع کنید'  },
        { IconImg: vps3, title: 'VPNS', goTo: '/service/vpns', linkContent: 'شروع کنید' },
    ];

    return (
        <Container theme={config}>
            <Header theme={config}>
                خدمات ما
                <br />
                لطفا یک سرویس را انتخاب کنید
            </Header>
            <ServicesContainer theme={config}>
                <ServicesCard CardData={services[0]} />
                <ServicesCard CardData={services[1]} />
                <ServicesCard CardData={services[2]} />
            </ServicesContainer>
        </Container>
    );
};

export default Services;





const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background-color: ${(props) => props.theme.mainBg};
  padding: 2rem 1rem;
  box-sizing: border-box;
  padding-top: 80px;
`;

const Header = styled.h2`
  font-size: 1.5rem;
  text-align: center;
  color: ${(props) => props.theme.titile1};
  margin-bottom: 1.5rem;

  @media(min-width: 768px) {
    font-size: 2rem;
  }
`;

const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  width: 100%;

  @media(min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media(min-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
