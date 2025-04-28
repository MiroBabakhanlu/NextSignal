import React, { useContext } from 'react';
import styled from 'styled-components';
import { FaBox, FaUserCircle, FaDollarSign, FaTrophy, FaChartLine, FaShoppingCart, FaCartPlus } from 'react-icons/fa';
import { colorContext } from '../../Context/ColorContextProvider';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Helper/apiInterceptors';

// InfoBox Component
const InfoBox = ({ icon: Icon, title, data, isLoading, onClick, theme }) => (
    <InfoBoxContainer theme={theme} onClick={onClick}>
        <Icon theme={theme} />
        <Title theme={theme}>{title}</Title>
        {
            isLoading ? (
                <LoadingText theme={theme}>در حال بارگذاری...</LoadingText>
            ) : (
                <UserCountText theme={theme}>{data !== null ? data : 'خطا در دریافت اطلاعات'}</UserCountText>
            )
        }
    </InfoBoxContainer>
);

// Overview Component
const Overview = ({ selectFunction }) => {
    const { config } = useContext(colorContext);

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['overviewData'],
        queryFn: async () => {
            const response = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}/get-overview`);
            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to fetch overview data');
            }
            return response.data.data || {
                userCount: 0,
                productsCount: 0,
                ordersInfo: { ordersCount: 0, pendingOrdersCount: 0 },
                salesInfo: {
                    mostSoldProduct: { name: "نامشخص" },
                    totalSales: 0,
                    totalNetProfit: 0
                }
            };
        },
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });

    // Safely extract data with fallbacks
    const overviewData = data || {
        userCount: 0,
        productsCount: 0,
        ordersInfo: { ordersCount: 0, pendingOrdersCount: 0 },
        salesInfo: {
            mostSoldProduct: { name: "نامشخص" },
            totalSales: 0,
            totalNetProfit: 0
        }
    };

    return (
        <OverviewContainer theme={config}>
            <OverviewTitle theme={config}>بررسی کلی</OverviewTitle>
            {isError && <ErrorText theme={config}>{error.message}</ErrorText>}
            
            <InfoBoxesContainer theme={config}>
                <InfoBox
                    theme={config}
                    icon={FaUserCircle}
                    title="تعداد کاربران"
                    data={overviewData.userCount}
                    isLoading={isLoading}
                />
                <InfoBox
                    theme={config}
                    icon={FaBox}
                    title="تعداد محصولات"
                    data={overviewData.productsCount}
                    isLoading={isLoading}
                    onClick={() => selectFunction('products')}
                />
                <InfoBox
                    theme={config}
                    icon={FaShoppingCart}
                    title="تعداد سفارشات"
                    data={overviewData.ordersInfo.ordersCount}
                    isLoading={isLoading}
                    onClick={() => selectFunction('orders')}
                />
                <InfoBox
                    theme={config}
                    icon={FaCartPlus}
                    title="تعداد سفارشات جدید"
                    data={overviewData.ordersInfo.pendingOrdersCount}
                    isLoading={isLoading}
                    onClick={() => selectFunction('orders')}
                />
                <InfoBox
                    theme={config}
                    icon={FaTrophy}
                    title="محصول پر فروش"
                    data={overviewData.salesInfo.mostSoldProduct.name}
                    isLoading={isLoading}
                    onClick={() => selectFunction('products')}
                />
                <InfoBox
                    theme={config}
                    icon={FaDollarSign}
                    title="فروش کل"
                    data={overviewData.salesInfo.totalSales}
                    isLoading={isLoading}
                />
                <InfoBox
                    theme={config}
                    icon={FaChartLine}
                    title="درآمد (تومان)"
                    data={overviewData.salesInfo.totalNetProfit.toLocaleString()}
                    isLoading={isLoading}
                />
            </InfoBoxesContainer>
        </OverviewContainer>
    );
};

export default Overview;

// Styled Components
const OverviewContainer = styled.div`
    width: 100%;
    height: auto;
    background-color: ${({ theme }) => theme.boxBg};
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const OverviewTitle = styled.h2`
    font-size: 28px;
    color: ${({ theme }) => theme.titile1};
    text-align: center;
    margin-bottom: 20px;
`;

const ErrorText = styled.div`
    color: ${({ theme }) => theme.error};
    background-color: ${({ theme }) => theme.errorBg};
    padding: 10px 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    text-align: center;
`;

const InfoBoxesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    width: 100%;
`;

const InfoBoxContainer = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 200px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: ${({ onClick }) => onClick ? 'pointer' : 'default'};

    svg {
        color: ${({ theme }) => theme.svg2};
        font-size: 35px;
        margin-bottom: 10px;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;

const Title = styled.span`
    font-size: 18px;
    color: ${({ theme }) => theme.titile1};
    margin-bottom: 10px;
`;

const LoadingText = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.titile1};
`;

const UserCountText = styled.span`
    font-size: 22px;
    color: ${({ theme }) => theme.textCenter};
    font-weight: bold;
`;
