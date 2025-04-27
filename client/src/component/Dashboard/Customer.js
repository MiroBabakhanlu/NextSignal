import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaSignOutAlt, FaClipboardList, FaStore } from 'react-icons/fa';
import axios from 'axios';
import { UserContext } from '../../Context/UserContextProvider';
import moment from 'moment-jalaali';
import styled from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';
import axiosInstance from '../../Helper/apiInterceptors';
import { notify } from '../../Helper/toast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Customer = () => {
    const { userInfo, dispatchInfo } = useContext(UserContext);
    const [responseMsg, setResponseMsg] = useState('');
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [selectedSection, setSelectedSection] = useState('AccDetail');
    const { config } = useContext(colorContext);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/cdash');
            if (response.status === 200) {
                dispatchInfo({ type: 'SET_DATA', payload: response.data.data });
                dispatchInfo({ type: 'LOGIN' });
            }
        } catch (error) {
            setResponseMsg(error.message);
        }
    };

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: ''
    });

    const [phoneData, setPhoneData] = useState({
        newPhone: ''
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const logout = async () => {
        try {
            const response = await axiosInstance.post('/logout');
            if (response.status === 200 && response.data.redirect) {
                dispatchInfo({ type: 'LOGOUT' });
                navigate(response.data.redirect);
            }
        } catch (error) {
            setResponseMsg(error.message);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch('/change-password', passwordData);
            if (response.status === 200) {
                notify('رمز عبور با موفقیت تغییر کرد', 'success')
                getUserInfo();
            }
        } catch (error) {
            setResponseMsg(error.message);
        }
        setPasswordData({
            newPassword: '',
            currentPassword: ''
        });
    };

    const handlePhoneChange = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.patch('/change-phone', phoneData);
            if (response.status === 200) {
                notify('رمز عبور با موفقیت تغییر کرد', 'success')
                getUserInfo();
            }
        } catch (error) {
            setResponseMsg(error.message);
        }
        setPhoneData({
            newPhone: ''
        });
    };

    useEffect(() => {
        if (responseMsg) {
            const timer = setTimeout(() => {
                setResponseMsg(""); // Clear the message
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [responseMsg]);



    const [orders, setOrders] = useState([])

    const getOrers = async () => {
        try {
            const response = await axiosInstance.get('/get-curstomer-orders')
            if (response.status === 200) {
                setOrders(response.data.orders)
            }
        } catch (error) {
            setResponseMsg(error.message);
        }
    }

    useEffect(() => {
        getUserInfo();
        getOrers();
    }, []);

    return (
        <CustomerContainer theme={config}>
            <Sidebar theme={config}>
                <ul>
                    <li onClick={() => setSelectedSection('AccDetail')}>
                        <FaUserCircle />
                        <span>پروفایل</span>
                    </li>
                    <li onClick={() => setSelectedSection('Orders')}>
                        <FaClipboardList />
                        <span>سفارشات</span>
                    </li>
                    <Link to="/store">
                        <FaStore />
                        <span>فروشگاه</span>
                    </Link>
                    <li onClick={logout}>
                        <FaSignOutAlt />
                        <span>خروج</span>
                    </li>
                </ul>
            </Sidebar>
            <ContentArea theme={config}>
                <CurrentSection theme={config}>
                    <h2>خوش آمدید, {userInfo.username}</h2>
                    <p>{currentTime.toLocaleTimeString()}</p>
                    <p>{responseMsg}</p>
                </CurrentSection>

                <BoxContainer theme={config}>
                    {selectedSection === 'AccDetail' && (
                        <ProfileSection theme={config}>
                            <h3>اطلاعات کاربری</h3>
                            <UserInfo theme={config}>
                                <p><strong>نام کاربری:</strong> {userInfo.username}</p>
                                <p><strong>شماره تماس:</strong> {userInfo.phone}</p>
                                <p><strong>تاریخ عضویت: </strong>{new Date(userInfo.timeCreated).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

                            </UserInfo>
                            <h3>تغییر رمز عبور</h3>
                            <Form theme={config} onSubmit={handlePasswordChange}>
                                <InputGroup theme={config}>
                                    <label>
                                        رمز عبور فعلی:
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <label>
                                        رمز عبور جدید:
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handleChange}
                                            required
                                        />
                                    </label>
                                    <Button theme={config} type="submit">تغییر رمز عبور</Button>
                                </InputGroup>
                            </Form>

                            <h3>تغییر شماره تماس</h3>
                            <Form theme={config} onSubmit={handlePhoneChange}>
                                <InputGroup theme={config}>
                                    <label>
                                        شماره تماس جدید:
                                        <input
                                            type="text"
                                            name="newPhone"
                                            value={phoneData.newPhone}
                                            onChange={(e) => setPhoneData({ ...phoneData, newPhone: e.target.value })}
                                            required
                                        />
                                    </label>
                                    <Button theme={config} type="submit">تغییر شماره تماس</Button>
                                </InputGroup>
                            </Form>
                        </ProfileSection>
                    )}
                    {selectedSection === 'Orders' && (
                        <OrdersSection theme={config}>
                            <h3>سفارشات</h3>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <OrderCard theme={config} key={order._id}>
                                        <OrderId theme={config}>   {order._id}   : کد پیگیری </OrderId>
                                        <OrderText theme={config}> <span>{order.status}</span> : وضعیت</OrderText>
                                        <OrderText theme={config}> {order.deliveryfee} : هزینه ارسال </OrderText>
                                        <OrderText theme={config}>مبلغ کل: {order.totalAmount} تومان</OrderText>

                                        <div>
                                            <OrderSubHeading theme={config}> : زمان تحویل </OrderSubHeading>
                                            <OrderText theme={config}>تاریخ : {new Date(order.dateAndTime.date).toLocaleDateString('fa-IR')}</OrderText>
                                            <OrderText theme={config}>زمان : {order.dateAndTime.time}</OrderText>
                                        </div>

                                        <Address theme={config}>
                                            {order.shippingAddress.plaque}, {order.shippingAddress.postalCode}, {order.shippingAddress.alleys}, {order.shippingAddress.street}, {order.shippingAddress.neighbourhood}, {order.shippingAddress.area}  <strong> : آدرس</strong>
                                        </Address>
                                        <OrderSubHeading theme={config}> :   سفارش ها</OrderSubHeading>
                                        <ItemsList theme={config}>
                                            {order.items.map((item, index) => (
                                                <ItemText theme={config} key={index}>
                                                    <span>{item.products.name}</span>
                                                    <span>تعداد: {item.quantity}</span>
                                                </ItemText>
                                            ))}
                                        </ItemsList>
                                    </OrderCard>
                                ))
                            ) : (
                                <EmptyOrdersMessage theme={config}>هیچ سفارشی هنوز ثبت نشده است.</EmptyOrdersMessage>
                            )}
                        </OrdersSection>
                    )}

                </BoxContainer>
            </ContentArea>
            <ToastContainer />
        </CustomerContainer>
    );
};

export default Customer;

const CustomerContainer = styled.div`
    // display: flex;
    // flex-direction: row;
    min-height: 100vh;
    /* background-color:  ${({ theme }) => theme.bg}; */
    background-color:  ${({ theme }) => theme.mainBg};
    padding: 20px;
    gap: 20px;
    flex-wrap: wrap;
    text-align: right;
    
    @media (max-width: 991px) {
        padding-top: 100px;
      flex-direction: column;
    }

        h3{
        padding-bottom : 20px;
        padding-top : 20px;
        /* color:  ${({ theme }) => theme.h3}; */
        color:  ${({ theme }) => theme.titile1};
    }

`;

const Sidebar = styled.div`
    // width: 75px;
     background-color:  ${({ theme }) => theme.boxBg};
    // background-color: red;
    // padding: 5px;
    // gap: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    transition: width 0.3s ease-in-out;
    flex-direction: row;
    width: 80%;
    margin: auto;

    &:hover {
        // width: 90px;
    }

    @media (max-width: 991px) {
      flex-direction: row;
      width: 100%;
    }

    svg{
        /* color:  ${({ theme }) => theme.svg}; */
        color:  ${({ theme }) => theme.titile2};
        font-size: 22px;
    }
    span{
        color:  ${({ theme }) => theme.titile2};
    }


    ul {
        list-style: none;
        width: 100%;
        height:70%;
        padding: 0;
        display: flex;
        justify-content: space-around;
        flex-direction: column;

        
        flex-direction: row;

        align-items: center;
            @media (max-width: 991px) {
                      flex-direction: row;
                }
    //   background-color:  ${({ theme }) => theme.ul};

    }
    
    li{
    //   background-color:  ${({ theme }) => theme.li};
    }

    li, a {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        text-align: center;
        margin-top: 10px;
        gap: 15px;
        padding: 5px;


        span {
            font-size: 16px;
        }

        &:hover {
            color: #f1f1f1;
        }
    }

    a {
        text-decoration: none;
        color:  ${({ theme }) => theme.a};
    }


`;

const ContentArea = styled.div`
    /* flex: 1; */
    background-color:  ${({ theme }) => theme.boxBg};
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
    margin-left: 10px;
    width: 50%;
    margin: 20px auto;

    /* background-color: red; */

    @media (max-width: 991px) {
        width: auto;
        margin: 20px 0px 0px 0px;
        margin-left: 0;
        padding: 15px;
        display: block;
        border-radius: 10px;
    }


`;

const CurrentSection = styled.div`
    text-align: center;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 2px solid #f1f1f1;
    // background-color: ${({ theme }) => theme.CurrentSection};
    h2{
        color: ${({ theme }) => theme.titile1};
    }
    p{
        color: ${({ theme }) => theme.titile2};
    }
`;

const BoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    // background-color: ${({ theme }) => theme.boxContainer};
    gap: 20px;
`;

const ProfileSection = styled.div`
    /* background-color: ${({ theme }) => theme.profileSection}; */
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    /* align-item: center; */
    justify-content: center;
    // background-color: red;
    width: 80%;
    margin: auto;
    /* border: 1px solid ${({ theme }) => theme.svg}; */

        @media (max-width: 991px) {
            // background-color: white;
            flex-direction: column;
            width: 100%;
            padding: 5px;
        }
`;

const UserInfo = styled.div`
    width: 100%;
    /* background-color: ${({ theme }) => theme.profileSection}; */
    display: flex;
    flex-direction: column;
    gap:10px;
    justify-content: space-between;
    padding: 10px 0px 10px 0px;

    p{
        /* color: ${({ theme }) => theme.userInfoP}; */
        color: ${({ theme }) => theme.titile1ButLighter};
    }

`;

// const OrdersSection = styled.div`
//     background-color: #fff;
//     padding: 20px;
//     border-radius: 10px;
//     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
// `;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    // gap: 150px;
    width: 100%;
    align-items: flex-end;
    width: 100%;
    background-color: ${({ theme }) => theme.form};
    margin-top: 20px;
    // padding: 10px;
`;


const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* align-item: center; */
    width: 100%;
    /* background-color: ${({ theme }) => theme.InputGroup}; */

    
    label{
        /* color: ${({ theme }) => theme.label}; */
        color: ${({ theme }) => theme.titile2};
    }

    input {
        font-size: 16px;
        border: 1px solid ${({ theme }) => theme.titile2};
        border-radius: 5px;
        width: 99%;
        padding-top: 10px;
        padding-bottom: 10px;
        /* background-color: ${({ theme }) => theme.input}; */
    }
`;

const Button = styled.button`
    /* background-color: ${({ theme }) => theme.btn}; */
    background-color: ${({ theme }) => theme.nav};
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    padding: 10px;
    margin-left: auto;
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${({ theme }) => theme.titile2};
    }
`;


const OrdersSection = styled.section`
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    background: linear-gradient(135deg, #fafafa,  #f5f5f5);
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

    h3{
        text-align: center;
        font-size: 25px;
        color: ${({ theme }) => theme.titile1};
    }

    @media (max-width:900px) {
        padding: 5px;
    }
`;

const OrderCard = styled.div`
    background: linear-gradient(135deg, #fff, #f9f9f9);
    border: 1px solid #ddd;
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-6px);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        background: linear-gradient(135deg, #fff, #f0f0f0);
    }


`;

const OrderId = styled.h4`
    margin-bottom: 16px;
    font-size: 1rem;
    color: ${({ theme }) => theme.titile2};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    text-align: right;
`;

const OrderSubHeading = styled.h5`
    margin-top: 20px;
    margin-bottom: 12px;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.titile1ButLighter};
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    @media (max-width:768px) {
        font-size: 20px;
    }

`;

const OrderText = styled.p`
    margin: 8px 0;
    font-size: 1rem;
    color: ${({ theme }) => theme.description};
    line-height: 1.8;
    span{
        color: ${({ theme }) => theme.titile2};
    }
`;

const EmptyOrdersMessage = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.titile1ButLighter};
    font-size: 1.1rem;
    font-weight: 600;
    margin-top: 24px;

`;

const ItemsList = styled.div`
    margin-top: 16px;
    padding: 16px;
    background: linear-gradient(135deg, #fafafa, #f5f5f5);;
    border-radius: 12px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px;
    align-items: right;
    @media (max-width: 768px) {
        width: 100%;
        padding: 10px 3px 10px 3px;
    }
`;

const ItemText = styled.p`
margin-left: auto;
    font-size: 1rem;
    color: #333;
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
    /* background-color: red; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-decoration: none;

    &::before {
        content: "";
        position: absolute;
        left: 0;
        color: #5a4eff; /* Refined accent color */
        font-size: 1.4rem;
    }

`;

const AccentLine = styled.div`
    height: 4px;
    background: linear-gradient(to right, #5a4eff, #8a7eff);
    margin: 20px 0;
    border-radius: 8px;
    width: 100%;
`;

const Address = styled.p`
  color: #888;
  /* color: ${({ theme }) => theme.titile1ButLighter};     */
  font-size: 14px;
`;