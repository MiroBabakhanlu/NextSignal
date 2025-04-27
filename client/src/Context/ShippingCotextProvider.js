import React, { createContext, useReducer } from 'react';

const initialState = {
    shippingData: {
        firstName: null,
        lastName: null,
        area: null,
        neighbourhood: null,
        street: null,
        alleys: null,
        postalCode: null,
        phoneNumber: null,
        plaque: null,
        deliveryfee: null,
        selectedDate: null,
        selectedTimeSlot: null,
        productQuantityInCart: null,
        totalCartPrice: null,
        totalPrice: null,
        products: [], // array of objs
    }
}

const reduce = (state, action) => {
    switch (action.type) {

        case 'HANDEL_DETAILS':
            return {
                ...state,
                shippingData: {
                    ...state.shippingData,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    area: action.payload.area,
                    neighbourhood: action.payload.neighbourhood,
                    street: action.payload.street,
                    alleys: action.payload.alleys,
                    postalCode: action.payload.postalCode,
                    phoneNumber: action.payload.phoneNumber,
                    plaque: action.payload.plaque,
                    deliveryfee: action.payload.deliveryfee,
                    selectedDate: action.payload.selectedDate,
                    selectedTimeSlot: action.payload.selectedTimeSlot,
                    productQuantityInCart: action.payload.productQuantityInCart,
                    totalCartPrice: action.payload.totalCartPrice,
                    totalPrice: action.payload.totalPrice,
                    products: action.payload.products,
                }
            };


        default:
            return state
    }
}


export const ShippingContext = createContext();
const ShippingContextProvider = ({ children }) => {

    const [shippingInfo, dispatchShipping] = useReducer(reduce, initialState)

    return (
        <ShippingContext.Provider value={{ shippingInfo, dispatchShipping }}>
            {children}
        </ShippingContext.Provider>
    );
};

export default ShippingContextProvider;