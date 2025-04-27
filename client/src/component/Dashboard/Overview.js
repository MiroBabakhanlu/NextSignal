import React, { useContext, useEffect, useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import { FaBox, FaUserCircle, FaDollarSign, FaTrophy, FaChartLine, FaShoppingCart, FaCartPlus } from 'react-icons/fa';
import { colorContext } from '../../Context/ColorContextProvider';
import axiosInstance from '../../Helper/apiInterceptors';



// InfoBox Component
const InfoBox = ({ icon: Icon, title, data, loading, onClick, theme }) => (

    < InfoBoxContainer theme={theme} onClick={onClick} >
        <Icon theme={theme} />
        <Title theme={theme}>{title}</Title>
        {
            loading ? (
                <LoadingText theme={theme}>در حال بارگذاری...</LoadingText>
            ) : (
                <UserCountText theme={theme}>{data !== null ? data : 'خطا در دریافت اطلاعات'}</UserCountText>
            )
        }
    </InfoBoxContainer >
);

// Overview Component
const Overview = ({ selectFunction }) => {
    const { config } = useContext(colorContext);
    const [dataCounts, setDataCounts] = useState({
        userCount: null,
        productsCount: null,
        ordersInfo: {
            ordersCount: null, // Placeholder count for demo purposes
            pendingOrdersCount: null,
        },
        salesInfo: {
            mostSoldProduct: null,
            totalSales: null,
            totalNetProfit: null,
        }
    });
    const [loadingStates, setLoadingStates] = useState({
        users: true,
        products: true,
        orders: true,
        sales: true,
    });
    const [responseMsg, setResponseMsg] = useState('');

    const fetchData = async (url, dataKey, loadingKey) => {
        try {
            const response = await axiosInstance.get(url);
            if (response.status === 200 && response.data) {
                if (dataKey === 'salesInfo') {
                    setDataCounts((prev) => ({
                        ...prev, [dataKey]: {
                            mostSoldProduct: response.data.salesInfo.mostSoldProduct,
                            totalSales: response.data.salesInfo.totalSales,
                            totalNetProfit: response.data.salesInfo.totalNetProfit,
                        }
                    }))

                } if (dataKey === 'ordersInfo') {
                    setDataCounts((prev) => ({
                        ...prev, [dataKey]: {
                            ordersCount: response.data.counts.ordersCount,
                            pendingOrdersCount: response.data.counts.pendingOrdersCount,
                        }
                    }))

                }
                else {
                    setDataCounts((prev) => ({ ...prev, [dataKey]: response.data[dataKey] }));
                }
            }
        } catch (error) {
            setResponseMsg(error.message);
        } finally {
            setLoadingStates((prev) => ({ ...prev, [loadingKey]: false }));
        }
    };

    useEffect(() => {
        // fetchData('http://localhost:8080/api/get-usercount', 'userCount', 'users');
        // fetchData('http://localhost:8080/api/get-productcount', 'productsCount', 'products');
        // fetchData('http://localhost:8080/api/get-orderscount', 'ordersInfo', 'orders');
        // fetchData('http://localhost:8080/api/get-sales-info', 'salesInfo', 'sales');
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/get-usercount`, 'userCount', 'users');
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/get-productcount`, 'productsCount', 'products');
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/get-orderscount`, 'ordersInfo', 'orders');
        fetchData(`${process.env.REACT_APP_API_BASE_URL}/get-sales-info`, 'salesInfo', 'sales');
    }, []);

    return (
        <>
            <OverviewContainer theme={config}>
                <OverviewTitle theme={config}>بررسی کلی</OverviewTitle>
                {responseMsg && <OverviewTitle theme={config}>{responseMsg}</OverviewTitle>}
                <InfoBoxesContainer theme={config}>
                    <InfoBox
                        theme={config}
                        icon={FaUserCircle}
                        title="تعداد کاربران"
                        data={dataCounts.userCount}
                        loading={loadingStates.users}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaBox}
                        title="تعداد محصولات"
                        data={dataCounts.productsCount}
                        loading={loadingStates.products}
                        onClick={() => selectFunction('products')}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaShoppingCart}
                        title="تعداد سفارشات"
                        data={dataCounts.ordersInfo.ordersCount}
                        loading={loadingStates.orders}
                        onClick={() => selectFunction('orders')}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaCartPlus}
                        title=" تعداد سفارشات جدید"
                        data={dataCounts.ordersInfo.pendingOrdersCount}
                        loading={loadingStates.orders}
                        onClick={() => selectFunction('orders')}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaTrophy}
                        title="محصول پر فروش"
                        data={
                            dataCounts.salesInfo.mostSoldProduct
                                ? dataCounts.salesInfo.mostSoldProduct.name || "نامشخص"
                                : "در حال بارگذاری..."
                        }
                        loading={loadingStates.sales}
                        onClick={() => selectFunction('products')}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaDollarSign}
                        title="فروش کل"
                        data={dataCounts.salesInfo.totalSales}
                        loading={loadingStates.sales}
                    />
                    <InfoBox
                        theme={config}
                        icon={FaChartLine}
                        title="  (تومان) درآمد  "
                        data={
                            dataCounts.salesInfo.totalNetProfit !== null
                                ? dataCounts.salesInfo.totalNetProfit.toLocaleString()
                                : "در حال بارگذاری..."
                        }
                        loading={loadingStates.sales}
                    />

                </InfoBoxesContainer>
            </OverviewContainer>
        </>
    );
};

export default Overview;




// Styled Components
const OverviewContainer = styled.div`
    width: 100%;
    height: auto;
    /* background-color: ${({ theme }) => theme.OverviewContainer}; */
    background-color: ${({ theme }) => theme.boxBg};
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    /* background-color: blue;  */
`;

const OverviewTitle = styled.h2`
    font-size: 28px;
    /* color: ${({ theme }) => theme.OverviewTitle}; */
    color: ${({ theme }) => theme.titile1};
    text-align: center;
    padding: 20px;
    margin-bottom: 0px;
`;

const InfoBoxesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: flex-start; */
    /* justify-content: space-between; */
    justify-content: space-around;
    /* background-color: red; */
    width: 100%;
    margin: auto;
`;

const InfoBoxContainer = styled.div`
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
    width: 195px;
    text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;

    svg{
        color: ${({ theme }) => theme.svg2};
        font-size: 35px;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

`;

const Title = styled.span`
    font-size: 18px;
    /* color: ${({ theme }) => theme.Title}; */
    color: ${({ theme }) => theme.titile1};
    margin: 10px 0;
`;

const LoadingText = styled.span`
    font-weight: bold;
    /* color: ${({ theme }) => theme.LoadingText}; */
    color: ${({ theme }) => theme.titile1};

`;

const UserCountText = styled.span`
    font-size: 22px;
    /* color: ${({ theme }) => theme.CountText}; */
    color: ${({ theme }) => theme.textCenter};
    margin-top: 10px;
`;