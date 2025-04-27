import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTelegram, FaYoutube, FaTwitter } from 'react-icons/fa';
import styled from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';

const footerConfig = {
    name: 'name',
    cd: 'در شکلات خوشمزه بهترین شکلات‌های دست‌ساز را تجربه کنید. ما شکلات‌های سفارشی برای تمام مناسبت‌ها با طعم‌ها و طراحی‌های منحصر به فرد ارائه می‌دهیم.',
    service: 'شکلات‌های ما',
    links: {
        insta: 'https://www.instagram.com',
        tele: 'https://t.me',
        utube: 'https://www.youtube.com',
        twitter: 'https://twitter.com',
    },
    services: {
        a: 'سفارشات سفارشی',
        b: 'هدایای شکلاتی',
        c: 'برنامه‌های اشتراک',
        d: 'هدایای شرکتی',
    },

}


const Footer = () => {

    const { config } = useContext(colorContext);

    return (
        <Container theme={config}>
            <FooterWrapper theme={config}>
                <Section theme={config}>
                    <CompanyTitle theme={config}>{footerConfig.name}</CompanyTitle>
                    <CompanyDescription theme={config}>
                        {footerConfig.cd}
                    </CompanyDescription>
                </Section>

                <Section theme={config}>
                    <SectionTitle theme={config}>ناوبری سایت</SectionTitle>
                    <StyledLink theme={config} to="/">خانه</StyledLink>
                    <StyledLink theme={config} to="/store">{footerConfig.service}</StyledLink>
                    <StyledLink theme={config} to="/about">درباره ما</StyledLink>
                    <StyledLink theme={config} to="/contact">تماس با ما</StyledLink>
                </Section>

                <Section theme={config}>
                    <SectionTitle theme={config}>ما را دنبال کنید</SectionTitle>
                    <StyledLink theme={config} to={footerConfig.links.insta} target="_blank">
                        <FaInstagram size={18} />
                    </StyledLink>
                    <StyledLink theme={config} to={footerConfig.links.tele} target="_blank">
                        <FaTelegram size={18} />
                    </StyledLink>
                    <StyledLink theme={config} to={footerConfig.links.utube} target="_blank">
                        <FaYoutube size={18} />
                    </StyledLink>
                    <StyledLink theme={config} to={footerConfig.links.twitter} target="_blank">
                        <FaTwitter size={18} />
                    </StyledLink>
                </Section>

                <Section theme={config}>
                    <SectionTitle theme={config}>خدمات ما</SectionTitle>
                    <StyledLink theme={config} to="#">{footerConfig.services.a}</StyledLink>
                    <StyledLink theme={config} to="#">{footerConfig.services.b}</StyledLink>
                    <StyledLink theme={config} to="#">{footerConfig.services.c}</StyledLink>
                    <StyledLink theme={config} to="#">{footerConfig.services.d}</StyledLink>
                </Section>
            </FooterWrapper>

            <FinalSection theme={config}>
                <FinalText theme={config}>
                    &copy; 2024 طراحی شده توسط: <HighlightSpan>شکلات خوشمزه</HighlightSpan>
                </FinalText>
                <FinalLink theme={config} to="/terms">شرایط و سیاست حفظ حریم خصوصی</FinalLink>
            </FinalSection>
        </Container>
    );
};

export default Footer;


const Container = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-item: center;
    /* background:  ${({ theme }) => theme.bg}; */
    background:  ${({ theme }) => theme.footer};
    padding-top: 40px;
    overflow: hidden;
`;

const Section = styled.div`
    margin: auto;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    padding: 40px;
    height: 200px;
    // background-color:  ${({ theme }) => theme.section};

    gap: 25px;
    margin-bottom:15px;
        @media screen and (max-width: 991px) {
        padding: 0px;
        padding-top:80px;
    }
`;


const FooterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    // background-color:  ${({ theme }) => theme.footWrapper};

    @media screen and (max-width: 991px) {
        flex-direction: column;
        align-items: center;
    }
`;


const CompanyTitle = styled.h1`
    /* color:  ${({ theme }) => theme.companyTitile}; */
    color:  ${({ theme }) => theme.logo};
    font-size: 35px;
    font-weight: bold;
    text-align: center;
    // padding: 10px;
`;

const CompanyDescription = styled.p`
    // padding: 10px;
    line-height: 22px;
    font-size: 14px;
    /* color:  ${({ theme }) => theme.companyDescription}; */
    color:  ${({ theme }) => theme.description};
    text-align: center;
        @media screen and (max-width: 991px) {
        padding: 15px;
    }
`;

const SectionTitle = styled.h2`
    /* color:  ${({ theme }) => theme.sectionTitile}; */
    color:  ${({ theme }) => theme.link1};
    font-weight: 900;
    font-size: 20px;
`;

const StyledLink = styled(Link)`
    /* color:  ${({ theme }) => theme.styledLink}; */
    color:  ${({ theme }) => theme.links2};
    text-decoration: none;
    // padding: 8px;
    font-size: 12px;
    transition: all 0.1s ease-in;

    &:hover {
        /* color:  ${({ theme }) => theme.aboutSection}; */
        color:  ${({ theme }) => theme.link1};
        font-size: 16px;
    }
`;

const FinalSection = styled.div`
    width: 100%;
    height: fit-content;
    border-top: #bcbcbc4f solid 1px;
    display: flex;
    flex-direction: row;
    align-self: center;
    gap: 10px;
    justify-content: space-around;
    transition: all 0.3s ease-in-out;
    // background-color:  ${({ theme }) => theme.finalSection};
    /* background-color: red; */

    align-items: center;
    opacity: 0.4;
    padding: 15px;
        &:hover {
            opacity: 1;
        }
    @media screen and (max-width: 991px) {
        text-align: center;
        flex-direction: column;
        align-self: center;
        justify-content: center;
        margin-top: 30px;
        &:hover {
            opacity: 1;
        }
    }
`;

const FinalText = styled.p`
    // padding: 15px;
    /* color:  ${({ theme }) => theme.finalText}; */
    color:  ${({ theme }) => theme.logo};
    font-weight: bold;
    /* background-color: red; */
`;

const HighlightSpan = styled.span`
    color: gold;
    cursor: pointer;
`;

const FinalLink = styled(Link)`
    // padding: 15px;
    font-weight: bold;
    text-decoration: none;
    /* color:  ${({ theme }) => theme.finalLink}; */
    color:  ${({ theme }) => theme.links2};
`;

