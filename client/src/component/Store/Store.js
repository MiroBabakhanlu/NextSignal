import React, { useContext, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { ProductContext } from '../../Context/ProductContextProvider';
import { getQuantity } from '../../Helper/Helper';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { colorContext } from '../../Context/ColorContextProvider';

//importing react-query
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../Helper/apiInterceptors';



const Store = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [responseMsg, setResponseMsg] = useState('');
  const { config } = useContext(colorContext);



  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/get-products');
      if (response.status === 200) {
          return response.data;
      }
    } catch (error) {
      if (error.response) {
        setResponseMsg('خطای داخلی');
      }
    }
  }


  const { data: products, isLoading, error:queryError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts, 
  });


  const [errors, setErrors] = useState({}); // Track errors by product ID

  const [error, setError] = useState('');

  const handleDispatch = (actionType, _id, stock, item) => {
    const currentQuantity = getQuantity(state, _id);

    if ((actionType === 'INCREASE' || actionType === 'ADD_ITEM') && currentQuantity >= stock) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [_id]: 'موجودی کافی نیست!', // Set the error for the specific product
      }));

      // Remove the error message after 1 second
      setTimeout(() => {
        setErrors((prevErrors) => {
          const updatedErrors = { ...prevErrors };
          delete updatedErrors[_id]; // Remove error for the specific product
          return updatedErrors;
        });
      }, 1000);

      return;
    }

    // Dispatch the action if valid
    dispatch({ type: actionType, payload: item });
  };







  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 1550);
      return () => clearTimeout(timer);
    }
  }, [error]);


  if (isLoading) {
    return <Loading>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" stroke-width="7" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".8" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".6" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".4" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".2" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate></circle></svg>
    </Loading>;
  }

  return (
    <StoreContainer theme={config}>


      {responseMsg && <Error theme={config}>{responseMsg}</Error>}

      {products.length > 0 ? (
        products.map((product) => (
          <ProductBox theme={config} key={product._id}>

            <ImgBox>
              <img src={product.imageUrl} alt={product.name} />
            </ImgBox>
            <ProductName theme={config}>{product.name}</ProductName>

            <StockPriceWrapper theme={config}>

              <CapsuleWrapper theme={config}>

                <Stock theme={config} stock={product.stock}>موجودی: {product.stock}</Stock>

                <Capsule theme={config}>قیمت: {product.price.toLocaleString()} تومان</Capsule>

              </CapsuleWrapper>

            </StockPriceWrapper>

            <ProductDescription theme={config}>{product.description}</ProductDescription>

            <QuantityWrapper theme={config}>
              <span>تعداد: {getQuantity(state, product._id)}</span>
            </QuantityWrapper>

            {/* {responseMsg && <Error>{responseMsg}</Error>} */}

            <span
              style={{
                display: 'block',
                minHeight: '1.6rem',
                color: 'red',
                opacity: errors[product._id] ? '1' : '0',
                transition: 'opacity 0.3s ease',
                textAlign: 'center'
              }}
            >
              {errors[product._id] && errors[product._id]}
            </span>
            <Actions theme={config}>

              {getQuantity(state, product._id) > 0 ? (
                <ActionButton
                  className="addButton" theme={config}
                  onClick={() => handleDispatch("INCREASE", product._id, product.stock, product)}
                >
                  <FaPlus />
                </ActionButton>
              ) : (
                <ActionButton
                  className="addButton" theme={config}
                  onClick={() => handleDispatch("ADD_ITEM", product._id, product.stock, product)}
                >
                  افزودن به سبد خرید
                </ActionButton>
              )}
              {getQuantity(state, product._id) > 1 && (
                <ActionButton
                  className="removeButton" theme={config}
                  onClick={() => handleDispatch("DECREASE", product._id, product.stock, product)}
                >
                  <FaMinus />
                </ActionButton>
              )}
              {getQuantity(state, product._id) === 1 && (
                <ActionButton
                  className="removeButton" theme={config}
                  onClick={() => handleDispatch("REMOVE", product._id, product.stock, product)}
                >
                  <FaTrash />
                </ActionButton>
              )}
            </Actions>
            {/* {errors[product._id] && <Error theme={config.cart}>{errors[product._id]}</Error>} */}

          </ProductBox>
        ))
      ) : (
        <div>محصولی یافت نشد.</div>
      )}
    </StoreContainer>
  );
};

export default Store;

export const Loading = styled.div`
    width: 220px;
    height: 220px;
    margin: auto;
`;

const StoreContainer = styled.div`
  border-radius: 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  margin: 0 auto;
  /* background-color: ${({ theme }) => theme.bg}; */
  background-color: ${({ theme }) => theme.mainBg};
  max-width: 1200px;
    @media (max-width: 991px) {
        padding-top: 100px;
    }
  margin-bottom: 100px;

`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 225px;
  margin: 8px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  /* background-color: ${({ theme }) => theme.productBox}; */
  background-color: ${({ theme }) => theme.productBox};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background-color 0.3s ease-in-out;
  transform: scale(0.9); //new


  &:hover {
    transform: scale(0.95);
  }
`;

const ImgBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
  height: 145px;

  img {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    &:hover {
      transform: scale(0.95);
    }
  }
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  /* color: ${({ theme }) => theme.productName}; */
  color: ${({ theme }) => theme.titile1};
  text-align: center;
  margin: 10px 10px 20px 0px;
  height: 40px;
  overflow: hidden;
`;

const StockPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid 1px #555555a6;
//   background-color: ${({ theme }) => theme.stockPriceWrapper};
  margin: auto;
`;

const CapsuleWrapper = styled.div`
  display: flex;
  //   background-color: ${({ theme }) => theme.capsuleWrapper};
  gap: 4px;
`;

const Capsule = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 10px;
  display: inline-block;
  margin-bottom: 20px;
  background-color: rgba(211, 211, 211, 0.112);
  /* color: ${({ theme }) => theme.capsule}; */
  color:#333;
`;

const Stock = styled(Capsule)`
  ${(props) =>
    props.stock < 10
      ? css`
          color: rgba(255, 0, 0, 0.826);
        `
      : props.stock < 20
        ? css`
          color: rgb(255, 201, 5);
        `
        : props.stock < 35
          ? css`
          color: rgba(255, 166, 0, 0.811);
        `
          : css`
          color: rgba(0, 128, 0, 0.8);
        `}
`;

const ProductDescription = styled.p`
  font-size: 0.75rem;
  /* color: ${({ theme }) => theme.ProductDescription}; */
  color: ${({ theme }) => theme.description};
  text-align: center;
  margin: 15px 5px;
  height: 50px;
  overflow: hidden;
`;

const QuantityWrapper = styled.div`
//   background-color: ${({ theme }) => theme.quantityWrapper};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

    span{
        /* color: ${({ theme }) => theme.quantityWrapperSpan}; */
        color: ${({ theme }) => theme.titile2};
    }

`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
//   background-color: ${({ theme }) => theme.action};
  
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  border: none;
  margin: 0 4px;

  &.addButton {
    /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1},  ${({ theme }) => theme.actionButtonGradient2}); */
    background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient1},  ${({ theme }) => theme.btnGredient2});
    color: #ffffff;

    &:hover {
      transform: scale(0.95);
          /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1},  ${({ theme }) => theme.actionButtonGradient2}); */
      background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient2},  ${({ theme }) => theme.btnGredient1});
    }
  }

  &.removeButton {
    background-color: #d32d40d9;
    color: #ffffff;

    &:hover {
      background-color: #c62828ed;
    }
  }
`;

const Error = styled.div`
  color: red;
  text-align: center;
  margin: 11px;
`;