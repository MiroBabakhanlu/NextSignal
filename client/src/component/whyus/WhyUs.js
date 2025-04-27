import React, { useContext, useState, useRef, useEffect } from 'react';
import { Container, Introduction, Offers } from '../Offers/Offers';
import { colorContext } from '../../Context/ColorContextProvider';
import OfferingsSchema from '../Offers/OfferSchema';

const WhyUs = () => {
    const { config } = useContext(colorContext);
    const [isVisible, setIsVisible] = useState(false); // State to track visibility
    const introRef = useRef(null); // Reference to the container
    const [hover, setHover] = useState(false);

    const data = {

        1: {
            title: '.1',
            content: 'ما شکلات‌های سفارشی و دست‌ساز با طعم و طرح دلخواه شما تولید می‌کنیم. این شکلات‌ها به‌طور اختصاصی برای شما طراحی شده و هر لحظه را ویژه می‌کنند.',
            path: '/store'
        },
        2: {
            title: '.2',
            content: 'باکس‌های شکلات لوکس و شیک که برای هر مناسبت خاص طراحی و بسته‌بندی می‌شوند. این باکس‌ها هدیه‌ای بی‌نظیر برای عزیزانتان خواهند بود.',
            path: '/store'
        },
        3: {
            title: '.3',
            content: 'شکلات‌های ویژه فصلی که به مناسبت تعطیلات و فصول مختلف طراحی شده‌اند. هر فصل طعمی جدید و تزئیناتی خاص دارد.',
            path: '/store'
        },
    };

    const description = '>مشتریان ما به‌خاطر کیفیت عالی، طراحی‌های خاص و تعهد به ارائه بهترین خدمات، ما را انتخاب می‌کنند.';

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
                isVisible={isVisible}
            >
                <h1>چرا ما   </h1>
                <h2>چرا مشتریان ما را انتخاب می‌کنند</h2>
                <p>{description}</p>
            </Introduction>
            <Offers theme={config}>
                <OfferingsSchema
                    title={data[1].title}
                    content={data[1].content}
                    goto={data[1].path}
                />
                <OfferingsSchema
                    title={data[2].title}
                    content={data[2].content}
                    goto={data[2].path}
                />
                <OfferingsSchema
                    title={data[3].title}
                    content={data[3].content}
                    goto={data[3].path}
                />
            </Offers>
        </Container>

    );
};

export default WhyUs;