import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ProductContext } from '../../Context/ProductContextProvider';
import { getQuantity } from '../../Helper/Helper';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import emptyCart from '../../imgs/emptycart.png';
import { colorContext } from '../../Context/ColorContextProvider';



const CartItems = ({ infoOfProduct }) => {
    const { state, dispatch, item } = infoOfProduct;
    const { name, description, price, imageUrl, _id, stock } = item;
    const [error, setError] = useState('');

    const { config } = useContext(colorContext);


    const currentQuantity = getQuantity(state, _id);
    const totalPrice = (price * currentQuantity).toLocaleString();

    const getStockColor = (stock) => {
        if (stock < 10) return 'stockRed';
        if (stock < 20) return 'stockYellow';
        if (stock < 35) return 'stockOrange';
        return 'stockGreen';
    };

    const handleDispatch = (actionType) => {
        if (actionType === "INCREASE" && currentQuantity >= stock) {
            setError('موجودی کافی نیست!');
            return;
        }
        dispatch({ type: actionType, payload: item });
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(''), 1550);
            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <ProductBox theme={config}>

            <ImageGroup>
                <ProductImage src={imageUrl} alt={name} />
            </ImageGroup>

            <DetailsGroup theme={config}>

                <ProductName theme={config}>{name}</ProductName>
                <ProductDescription theme={config}>{description}</ProductDescription>

            </DetailsGroup>

            <QuantityGroup theme={config}>

                <ActionButton theme={config} onClick={() => handleDispatch("INCREASE")}>
                    <FaPlus />
                </ActionButton>

                <CurrentQuantity theme={config}>{currentQuantity}</CurrentQuantity>

                {currentQuantity > 1 ? (
                    <ActionButton theme={config} className="removeButton" onClick={() => handleDispatch("DECREASE")}>
                        <FaMinus />
                    </ActionButton>
                ) : (
                    <ActionButton theme={config} className="removeButton" onClick={() => handleDispatch("REMOVE")}>
                        <FaTrash />
                    </ActionButton>
                )}

            </QuantityGroup>

            <PriceStockGroup theme={config}>

                <ProductPrice theme={config}>

                    قیمت: {totalPrice} <span className="currency">تومان</span>
                </ProductPrice>

                <Stock theme={config} className={getStockColor(stock)}>موجودی: {stock}</Stock>

            </PriceStockGroup>

            {error && <Error theme={config}>{error}</Error>}

        </ProductBox>
    );
};

const Cart = () => {
    const { state, dispatch } = useContext(ProductContext);
    const [products, setProducts] = useState([]);
    const [productQuantityInCart, setProductsQuantityInCart] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);

    const { config } = useContext(colorContext);

    useEffect(() => {
        setProducts(state.selectedItems);
        const totalQuantity = state.selectedItems.reduce((acc, item) => acc + item.quantity, 0);
        setProductsQuantityInCart(totalQuantity);

        const totalPrice = state.selectedItems.reduce((acc, item) => {
            const itemPrice = item.price * getQuantity(state, item._id);
            return acc + itemPrice;
        }, 0);
        setTotalCartPrice(totalPrice.toLocaleString());
    }, [state.selectedItems]);

    return (
        <Container theme={config}>
            {products.length ? (
                <>
                    <Title theme={config}>سبد خرید شما</Title>
                    <SubTitle theme={config}>
                        {productQuantityInCart} محصول انتخاب شده است
                    </SubTitle>
                    {products.map((item) => (
                        <CartItems
                            key={item._id}
                            infoOfProduct={{ item, state, dispatch }}
                        />
                    ))}
                    <TotalPriceContainer theme={config}>
                        <TotalPrice theme={config}>
                            جمع کل: {totalCartPrice} <span>تومان</span>
                        </TotalPrice>
                        <ProceedButton theme={config} onClick={(e) => dispatch({ type: 'CHECKOUT' })} to='/shipping'>
                            تکمیل خرید
                        </ProceedButton>
                    </TotalPriceContainer>
                </>
            ) : (
                <EmptyCartContainer theme={config}>
                    <EmptyCartImage theme={config} src={emptyCart} alt="سبد خرید خالی است" />
                    <EmptyCartMessage theme={config}>سبد خرید شما خالی است</EmptyCartMessage>
                    <SuggestionMessage theme={config}>
                        به صفحه محصولات بروید و شکلات مورد نظر خود را انتخاب کنید.
                    </SuggestionMessage>
                    <BrowseButton theme={config} to="/store">انتخاب شکلات</BrowseButton>
                </EmptyCartContainer>
            )}
        </Container>
    );
};

export default Cart;




// Styled Components
const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: auto;
    font-family: 'Vazir', 'Playfair Display', serif;
    /* background-color:  ${({ theme }) => theme.bg}; */
    /* background-color: red; */

    @media (max-width: 700px) {
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        padding-top: 100px;
        }
        padding-top: 100px;
`;

const Title = styled.p`
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: right;
    /* color:  ${({ theme }) => theme.title}; */
    color:  ${({ theme }) => theme.titile1};
`;

const SubTitle = styled.p`
    font-size: 18px;
    margin-bottom: 20px;
    text-align: right;
    /* color:  ${({ theme }) => theme.subtitle}; */
    color:  ${({ theme }) => theme.titile2};
`;

const ProductBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 15px;
    /* background-color:  ${({ theme }) => theme.ProductBox}; */
    background-color:  ${({ theme }) => theme.mainBg};
    transition: box-shadow 0.3s;
    transform: scale(0.9);

    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    @media (max-width: 700px) {
        flex-direction: column;
        align-items: center;
        /* background-color:  ${({ theme }) => theme.ProductBox}; */
        background-color:  ${({ theme }) => theme.mainBg};
        padding: 0px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-bottom: 15px;
        width: 100%;
        transform: scale(0.85);
    }
`;

const ImageGroup = styled.div`
    // background-color: red;
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-item:ceenter;

    

    flex: 1;
    @media (max-width: 700px) {
        margin: 25px;
        text-align: center;
        width: 150px;
        height: 150px;
      }
`;

const ProductImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 15px;

    @media (max-width: 700px) {
        margin: auto;
        width: 150px;
        height: 150px;
        border-radius: 10px;
        object-fit: cover;
      }
`;

const DetailsGroup = styled.div`
    flex: 2;
    // text-align: right;
    // background-color:  ${({ theme }) => theme.DetailsGroup};

    @media (max-width: 700px) {
        text-align: center;
        margin-bottom: 10px;
      }
`;

const ProductName = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
    /* color:  ${({ theme }) => theme.ProductName}; */
    color:  ${({ theme }) => theme.titile1};
`;

const ProductDescription = styled.p`
    font-size: 14px;
    /* color:  ${({ theme }) => theme.ProductDescription}; */
    color:  ${({ theme }) => theme.description};
    margin-bottom: 5px;
`;

const QuantityGroup = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    // background-color:  ${({ theme }) => theme.QuantityGroup};
    color:  ${({ theme }) => theme.titile1};
    @media (max-width: 700px) {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-bottom: 10px;
      }

`;

const ActionButton = styled.button`
    /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1},  ${({ theme }) => theme.actionButtonGradient2}); */
    background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient1},  ${({ theme }) => theme.btnGredient2});
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    margin: 0 5px;

    &:hover {
      /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1Hover},  ${({ theme }) => theme.actionButtonGradient2Hover}); */
      background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient2},  ${({ theme }) => theme.btnGredient1});
    }

    &.removeButton {
        background-color: #d32d40d9;
    }

        @media (max-width: 700px) {
        justify-content: center;
        width: 50px;
        height: 50px;
        background-color: red;
        margin-top: 10px;
      }
`;

const CurrentQuantity = styled.span`
    font-size: 16px;
    margin: 0 10px;
    min-width: 30px;
    // background-color:  ${({ theme }) => theme.currentQuantity};
    text-align: center;
     @media (max-width: 700px) {
        font-size: 20px;
        line-height: 50px;
        margin: 0 10px;
        padding: 5px 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        text-align: center;
        width: 50px;
        height: 50px;
    }
`;

const PriceStockGroup = styled.div`
    flex: 1;
    text-align: right;
    // background-color:  ${({ theme }) => theme.PriceStockGroup};
`;

const ProductPrice = styled.h3`
    font-size: 18px;
    font-weight: bold;
    /* color:  ${({ theme }) => theme.ProductPrice}; */
    color:  ${({ theme }) => theme.titile1};

    .currency {
        font-size: 16px;
        color: ${({ theme }) => theme.ProductPriceSpan};
    }

     @media (max-width: 700px) {
        font-size: 20px;
        margin: 5px 0;
        font-weight: bold;
    }
`;

const Stock = styled.p`
    font-size: 16px;
    text-align: right;
    font-weight: bold;
    margin-bottom: 5px;

    &.stockRed {
        color: rgba(255, 0, 0, 0.826);
    }

    &.stockYellow {
        color: rgb(255, 201, 5);
    }

    &.stockOrange {
        color: rgba(255, 166, 0, 0.811);
    }

    &.stockGreen {
        color: rgba(0, 128, 0, 0.789);
    }

     @media (max-width: 700px) {
        font-size: 17px;
        margin-top: 5px;
        margin-bottom: 15px;
        text-align: center;
        color:  ${({ theme }) => theme.Stock};
    }
`;

const Error = styled.p`
    /* color:  ${({ theme }) => theme.Error}; */
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: right;
`;

const TotalPriceContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    align-items: center;
    // background-color:  ${({ theme }) => theme.TotalPriceContainer};
     /* background-color:  ${({ theme }) => theme.landingLeftBg}; */

     @media (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
        margin-top: 20px;
        width: 100%;
    }
`;

const TotalPrice = styled.div`
    font-size: 20px;
    font-weight: bold;
    color:  ${({ theme }) => theme.TotalPrice};


         @media (max-width: 700px) {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
        // color: #6b4f4f;
        // background-color: red;
        margin: auto
    }
`;

const ProceedButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    margin-top: 20px;
    /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1},  ${({ theme }) => theme.actionButtonGradient2}); */
    background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient1},  ${({ theme }) => theme.btnGredient2});
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    text-align: center;
    transition: background-color 0.3s;

    &:hover {
      background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1Hover},  ${({ theme }) => theme.actionButtonGradient2Hover});
    }
    @media (max-width: 700px) {
        width: 100%;
        padding: 10px 0px 10px 0px;
        margin-top: 10px;
        background-color: #6b4f4f;
        color: #fff;
        font-size: 18px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        text-align: center;
        transition: background-color 0.3s ease;
    }
`;

const EmptyCartContainer = styled.div`
    text-align: center;
    padding: 20px;
    border: 2px dashed #ddd;
    border-radius: 8px;
    /* background-color:  ${({ theme }) => theme.EmptyCartContainer}; */
    background-color:  ${({ theme }) => theme.mainBg};
    margin: 20px 0;
`;

const EmptyCartImage = styled.img`
    width: 120px;
    margin-bottom: 15px;
    // background-color:  ${({ theme }) => theme.EmptyCartImage};
`;

const EmptyCartMessage = styled.p`
    font-size: 24px;
    font-weight: bold;
    /* color:  ${({ theme }) => theme.EmptyCartMessage}; */
    color:  ${({ theme }) => theme.titile1};
    margin-bottom: 10px;
`;

const SuggestionMessage = styled.p`
    font-size: 16px;
    /* color:  ${({ theme }) => theme.SuggestionMessage}; */
    color:  ${({ theme }) => theme.titile2};
    margin-bottom: 15px;
`;

const BrowseButton = styled(Link)`
    display: inline-block;
    padding: 10px 20px;
    /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1},  ${({ theme }) => theme.actionButtonGradient2}); */
    background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient1},  ${({ theme }) => theme.btnGredient2});
    color: white;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
    transition: all 0.3s ease-in-out;

    &:hover {
      /* background: linear-gradient(135deg,  ${({ theme }) => theme.actionButtonGradient1Hover},  ${({ theme }) => theme.actionButtonGradient2Hover}); */
      background: linear-gradient(135deg,  ${({ theme }) => theme.btnGredient2},  ${({ theme }) => theme.btnGredient1});
    }
`;