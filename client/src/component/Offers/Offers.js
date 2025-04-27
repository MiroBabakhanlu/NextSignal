import React, { useContext, useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import OfferingsSchema from './OfferSchema';

import { colorContext } from '../../Context/ColorContextProvider';


const data = {

    customChocolates: {
        title: 'شکلات‌های سفارشی',
        content: 'شکلات‌های دست‌ساز با طعم و طراحی منحصربه‌فرد که به سلیقه شما ساخته می‌شوند. از شکلات‌های کلاسیک تا طعم‌های خاص، در ویولا همه چیز به دلخواه شما آماده است.',
        path: '/store'
    },
    giftBoxes: {
        title: 'باکس‌های هدیه شکلاتی',
        content: 'باکس‌های شیک و لوکس شکلات برای مناسبت‌های خاص. هر بسته‌بندی به‌طور ویژه‌ای طراحی شده تا هدیه‌ای خاطره‌انگیز و خوشمزه باشد.',
        path: '/store'
    },
    seasonalSpecials: {
        title: 'شکلات‌های فصلی ویژه',
        content: 'شکلات‌های ویژه برای هر فصل و تعطیلات. طعم‌های جدید و طراحی‌های فصلی که هر مناسبت را به لحظه‌ای خاص تبدیل می‌کنند.',
        path: '/store'
    },
    chocolateCreations: {
        title: 'ساخت شکلات‌های هنری',
        content: 'شکلات‌هایی به‌صورت هنری و با دقت بالا طراحی شده‌اند. هدیه‌ای خاص و متفاوت که ترکیبی از زیبایی و طعم است.',
        path: '/store'
    },
    chocolateMasterclasses: {
        title: 'کارگاه‌های تخصصی شکلات‌سازی',
        content: 'در کارگاه‌های ویولا، هنر شکلات‌سازی را یاد بگیرید و شکلات‌های حرفه‌ای بسازید. یک تجربه آموزشی و سرگرم‌کننده برای دوستداران شکلات.',
        path: '/store'
    },
    personalizedTreats: {
        title: 'شکلات‌های شخصی‌سازی‌شده',
        content: 'شکلات‌های اختصاصی به سبک شما، برای هدیه به عزیزان یا لذت بردن از طعم‌های خاص خودتان. شکلاتی با شخصیت و طعم بی‌نظیر.',
        path: '/store'
    }
};

const description = '>در ویولا، شکلات‌های سفارشی و منحصربه‌فرد به سلیقه شما طراحی می‌شود. با شکلات‌های دست‌ساز ما هر لحظه را خاص کنید.';




const OffersComponent = () => {
    const { config } = useContext(colorContext);
    const [isVisible, setIsVisible] = useState(false); // State to track visibility
    const introRef = useRef(null); // Reference to the container
    const [hover, setHover] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true); // Trigger visibility change when in view
                    observer.unobserve(introRef.current); // Stop observing once it's in view
                }
            },
            { threshold: 0.5 } // Trigger when 50% of the component is visible
        );

        if (introRef.current) {
            observer.observe(introRef.current);
        }

        return () => {
            if (introRef.current) {
                observer.unobserve(introRef.current);
            }
        };
    }, []);

    return (
        <Container theme={config}>
            <Introduction
                ref={introRef}
                theme={config}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                isVisible={isVisible} // Pass visibility state to styled-components
            >
                <h1>خدمات ما</h1>
                <h2>چه چیزی ارائه می‌دهیم؟</h2>
                <p>{description}</p>
            </Introduction>
            <Offers theme={config}>
                <OfferingsSchema
                    // imgSrc={data.customChocolates.img}
                    title={data.customChocolates.title}
                    content={data.customChocolates.content}
                    goto={data.customChocolates.path}
                />
                <OfferingsSchema
                    // imgSrc={data.giftBoxes.img}
                    title={data.giftBoxes.title}
                    content={data.giftBoxes.content}
                    goto={data.giftBoxes.path}
                />
                <OfferingsSchema
                    // imgSrc={data.seasonalSpecials.img}
                    title={data.seasonalSpecials.title}
                    content={data.seasonalSpecials.content}
                    goto={data.seasonalSpecials.path}
                />
                <OfferingsSchema
                    // imgSrc={data.chocolateBouquets.img}
                    title={data.chocolateCreations.title}
                    content={data.chocolateCreations.content}
                    goto={data.chocolateCreations.path}
                />
                <OfferingsSchema
                    // imgSrc={data.chocolateWorkshops.img}
                    title={data.chocolateMasterclasses.title}
                    content={data.chocolateMasterclasses.content}
                    goto={data.chocolateMasterclasses.path}
                />
                <OfferingsSchema
                    // imgSrc={data.chocolateWorkshops.img}
                    title={data.personalizedTreats.title}
                    content={data.personalizedTreats.content}
                    goto={data.personalizedTreats.path}
                />
            </Offers>
        </Container>
    );
};

export default OffersComponent;


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


export const Container = styled.div`
    width: 100%;
    height: fit-content;
    /* background-color: ${({ theme }) => theme.bg}; */
    background-color: ${({ theme }) => theme.mainBg};
    //hello
    padding-top: 100px;
    padding-bottom: 70px;
    overflow: hidden;
    /* background-color: red; */


    @media screen and (max-width: 991px) {
        margin-top: 50px;
    }

`;

export const Introduction = styled.div`
    width: 100%;
    height: fit-content;
    /* background-color: ${({ theme }) => theme.introduction}; */
    margin-bottom: 100px;
    text-align: right;
    animation: ${({ isVisible }) => (isVisible ? slideIn : 'none')} 1s ease-out forwards;
    h1 {
        padding: 30px 80px 0px 0px;
        font-size: 45px;
        /* color: ${({ theme }) => theme.introH1}; */
        color: ${({ theme }) => theme.titile1};
    }

    h2 {
        padding: 20px 80px 10px 0px;
        font-size: 28px;
        /* color: ${({ theme }) => theme.introH2}; */
        color: ${({ theme }) => theme.titile2};
    }

    p {
        padding: 0px 80px 10px 0px;
        font-size: 17px;
        /* color: ${({ theme }) => theme.introP}; */
        color: ${({ theme }) => theme.description};
    }

    @media screen and (max-width: 991px) {

        margin-bottom: 0px;

        h1 {
            padding: 10px 30px 0px 0px ;
            font-size: 32px;
        }

        h2 {
            padding: 10px 30px 0px 0px ;
            font-size: 22px;
        }

        p {
            padding: 10px 30px 0px 0px ;
            font-size: 16px;
            word-wrap: wrap;
            width: 80%;
            // background-color: red;
            margin-left: auto;
        }
    }
    
`;

export const Offers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 18px;
    transition: 1.5s ease;
    margin-top: 40px;
    /* background-color: ${({ theme }) => theme.offers}; */
    background-color: ${({ theme }) => theme.mainBg};

    @media screen and (min-width: 991px) {
        width: 90%;
        margin: auto;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: space-between;
    }
    @media screen and (max-width: 375px) {
        gap: 10px;

    //  div {
    //     width: 90%;
    //     padding: 15px;
    //     margin: 10px 0;
    //     }
    }
`;