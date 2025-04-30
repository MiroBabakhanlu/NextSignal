import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { colorContext } from '../../Context/ColorContextProvider';
import axiosInstance from '../../Helper/apiInterceptors';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../Helper/toast';

const Orders = () => {
  const { config } = useContext(colorContext);
  const queryClient = useQueryClient();
  const [hiddenOrders, setHiddenOrders] = useState([]);
  const [statusOnEdit, setStatusOnEdit] = useState([]);
  const [filter, setFilter] = useState(false);

  // Fetch orders with React Query
  const { data: orders = [], isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await axiosInstance.get('/get-orders');
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute before refetch
  });

  // Status change mutation
  const { mutate: changeStatus } = useMutation({
    mutationFn: async ({ newStatus, orderId }) => {
      const response = await axiosInstance.patch('/change-order-status', { 
        newStatus, 
        orderId 
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      const { i } = variables;
      setStatusOnEdit(statusOnEdit.filter(index => index !== i));
      notify(`Status changed successfully to ${data.order.status}`, 'success');
      queryClient.invalidateQueries(['orders']);
    },
    onError: (error) => {
      notify(error.message, 'error');
    }
  });

  const statusEnums = { 
    Pending: 'Pending', 
    Processing: 'Processing', 
    Shipped: 'Shipped', 
    Delivered: 'Delivered', 
    Cancelled: 'Cancelled' 
  };

  const toggleHideOrder = (i) => {
    setHiddenOrders(prev => 
      prev.includes(i) 
        ? prev.filter(index => index !== i) 
        : [...prev, i]
    );
  };

  const toggleStatusEdit = (i) => {
    setStatusOnEdit(prev => 
      prev.includes(i) 
        ? prev.filter(index => index !== i) 
        : [...prev, i]
    );
  };

  const handleStatusChange = (newStatus, orderId, i) => {
    if (!newStatus || !orderId) return;
    changeStatus({ newStatus, orderId, i });
  };

  if (isLoading) return <Loading>Loading orders...</Loading>;
  if (isError) return <NoOrders>Error: {error.message}</NoOrders>;

  return (
    <>
      <Title theme={config}>سفارشات</Title>
      <Filter>
        <p onClick={() => setFilter(true)}>جدید</p>
        <p onClick={() => setFilter(false)}>کل</p>
      </Filter>
      <Container theme={config}>
        {orders.length > 0 ? (
          orders
            .filter((order) => !filter || order?.status === 'Pending')
            .map((order, index) => (
              <OrderCard theme={config} isHidden={hiddenOrders.includes(index)} key={index}>
                {/* Rest of your component remains the same */}
                <UserInfo theme={config}>
                  <h2>{order?.user?.firstName} {order?.user?.lastName}</h2>
                  <p> {order?.user?.phoneNumber} <strong>: شماره تلفن</strong></p>
                  <Status theme={config}>{order?.status} <strong>: حالت فعلی </strong></Status>

                  <ChangeStatus theme={config} onClick={() => toggleStatusEdit(index)}>ChangeStatus</ChangeStatus>

                  {statusOnEdit.includes(index) && !hiddenOrders.includes(index) ?
                    <StatusEnums theme={config}>
                      <div onClick={() => handleStatusChange(statusEnums.Pending, order?.orderId, index)}><p>Pending</p></div>
                      <div onClick={() => handleStatusChange(statusEnums.Processing, order?.orderId, index)}><p>Processing</p></div>
                      <div onClick={() => handleStatusChange(statusEnums.Shipped, order?.orderId, index)}><p>Shipped</p></div>
                      <div onClick={() => handleStatusChange(statusEnums.Delivered, order?.orderId, index)}><p>Delivered</p></div>
                      <div onClick={() => handleStatusChange(statusEnums.Cancelled, order?.orderId, index)}><p>Cancelled</p></div>
                    </StatusEnums>
                    : ''
                  }
                </UserInfo>

                {/* Rest of your JSX remains the same */}
                <Address theme={config}>
                  {order?.address?.plaque}, {order?.address?.postalCode}, {order?.address?.alleys}, {order?.address?.street}, {order?.address?.neighbourhood}, {order?.address?.area}  <strong> : آدرس</strong>
                </Address>
                <DateTime theme={config}>
                  <strong>  تاریخ : </strong>
                  {new Intl.DateTimeFormat('fa-IR', {
                    dateStyle: 'full',
                  }).format(new Date(order?.dateAndTime.date))} ساعت {order?.dateAndTime.time}
                </DateTime>

                {!hiddenOrders.includes(index) &&
                  <>
                    <h3> محصولات سفارش داده شده</h3>
                    <ProductList theme={config}>
                      {order?.orderedProducts.map((product, idx) => (
                        <ProductItem theme={config} key={idx}>
                          <ProductName theme={config}>{product?.productName}</ProductName>
                          <ProductDetails theme={config}>
                            قیمت: {product.productPrice} | تعداد: {product?.quantity}
                          </ProductDetails>
                        </ProductItem>
                      ))}
                    </ProductList>
                  </>
                }
                <HideBox theme={config} onClick={() => toggleHideOrder(index)}>
                  {hiddenOrders.includes(index) ? <FaEyeSlash /> : <FaEye />}
                </HideBox>
              </OrderCard>
            ))
        ) : (
          <NoOrders>
            هیچ سفارشی هنوز ثبت نشده است
          </NoOrders>
        )}
        <ToastContainer />
      </Container>
    </>
  );
};

export default Orders;

{/* <Loading><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" stroke-width="7" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".8" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".6" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".4" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".2" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate></circle></svg></Loading> */ }

// Styled Components

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.titile1};
`;

const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  /* background-color: ${({ theme }) => theme.container}; */
  background-color: ${({ theme }) => theme.mainBg};
  text-align: right;
  min-height: 100%;
`;

const Title = styled.h1`
    font-size: 28px;
    /* color: ${({ theme }) => theme.title};     */
    color: ${({ theme }) => theme.titile1};    
    text-align: center;
    padding: 20px;
    margin-bottom: 0px;
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin-bottom: 30px;
  font-family: 'Roboto', sans-serif;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;
  position: relative;

  opacity: ${(props) => (props.isHidden ? '0.4' : '1')};

  h3 {
    margin: 30px 0px 10px 0px;
    /* color: ${({ theme }) => theme.productContainerTitle}; */
    color: ${({ theme }) => theme.textCenter};
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
  }
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  /* color: #4d4d4d; */
  /* color: ${({ theme }) => theme.textCenter};     */

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: ${({ theme }) => theme.textCenter};    
  }

  p {
    margin: 5px 0;
    color: ${({ theme }) => theme.titile1ButLighter};    
  }
`;

const Address = styled.p`
  /* color: #888; */
  color: ${({ theme }) => theme.titile1ButLighter};    
  font-size: 14px;
`;

const DateTime = styled.p`
  font-size: 14px;
  /* color: #777; */
  color: ${({ theme }) => theme.titile1ButLighter};    

`;

const ProductList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ProductItem = styled.li`
  /* background: ${({ theme }) => theme.productContainer}; */
  background: ${({ theme }) => theme.mainBg};
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.productContainerHover};
  }
  @media (max-width: 900px) {
    /* background-color: red; */
    width: 100%;
    padding: 10px 3px 10px 3px;
  }
`;

const ProductName = styled.span`
  font-weight: 500;
  /* color: #333; */
  color: ${({ theme }) => theme.titile1};
`;

const ProductDetails = styled.span`
  font-size: 14px;
  /* color: #555; */
  /* color: ${({ theme }) => theme.productPriceAndQuantity}; */
  color: ${({ theme }) => theme.titile1ButLighter};
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 180px;
  transition: all 0.3s ease-in-out;
  /* background-color: red; */
  @media (max-width: 900px) {
    /* background-color: blue; */
    width: 100px;
  }
`;

const Status = styled.p`
  font-weight: 600;
  font-size: 16px;
  /* color: #4a90e2; */
  color: ${({ theme }) => theme.titile2};
  text-transform: capitalize;
`;

const ChangeStatus = styled.button`
    border: none;
    color: ${({ theme }) => theme.titile2};
    border-bottom: 1px solid ${({ theme }) => theme.titile2};
    /* background-color: white; */
    background-color: #fff;
    cursor: pointer;
`;

const StatusEnums = styled.div`
  width: 100%;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  div{
    width: 75px;
    text-align: center;
    margin-left: auto;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    /* color: ${({ theme }) => theme.statusOptions}; */
    color: ${({ theme }) => theme.titile2};
    &:hover{
      /* border-color:  ${({ theme }) => theme.status}; */
      border-color:  ${({ theme }) => theme.titile2};
      /* color:  ${({ theme }) => theme.status}; */
      color:  ${({ theme }) => theme.titile2};
      /* border-bottom: solid 1px  ${({ theme }) => theme.status}; */
      border-bottom: solid 1px  ${({ theme }) => theme.titile2};
    }
  }
  @media (max-width: 900px) {
    /* flex-direction: column; */
    flex-wrap: wrap;
    div{
      margin: 10px 0px 10px auto;
    }
  }
`;

const NoOrders = styled.p`
  font-size: 18px;
  color: #555;
  text-align: center;
`;

const HideBox = styled.div`
    width: 50px;
    height: 50px;
    /* background-color: red; */
    position: absolute;
    top: 5px;
    left: 5px;
    border-radius: inherit;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg{
      color: ${({ theme }) => theme.svg};
      font-size: 35px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
`;

const Filter = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; 
  /* gap: 20px; */
  /* background-color: red; */
  justify-content: flex-end;
  p{
    margin: 10px 50px 10px 0px;
    cursor: pointer;
  }
`;
