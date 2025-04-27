import React, { act, createContext, useReducer } from 'react';


const initialState = {
    selectedItems: [],
    productsInCheckOut: [],
    checkout: false,
}

const ACTIONS = {
    addInitialItem: 'ADD_ITEM',
    addMore: 'INCREASE',
    removeInitialItem: 'REMOVE',
    removeMore: 'DECREASE',
    checkout: 'CHECKOUT',
}

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.addInitialItem:
            const existingItem = state.selectedItems.find(item => item.id === action.payload._id);
            if (!existingItem) {
                return {
                    ...state,
                    selectedItems: [...state.selectedItems, { ...action.payload, quantity: 1 }],
                    productsInCheckOut: [...state.productsInCheckOut, action.payload.name]
                };
            }
            return state;

        case ACTIONS.addMore:
            const index = state.selectedItems.findIndex(item => {
                return item._id === action.payload._id;
            });
            if (index !== -1) {
                const updatedItems = [...state.selectedItems];
                updatedItems[index] = {
                    ...updatedItems[index],
                    quantity: updatedItems[index].quantity + 1
                };
                return {
                    ...state,
                    selectedItems: updatedItems
                };
            }
            return state;

        case ACTIONS.removeInitialItem:
            const newSelectedItems = state.selectedItems.filter(item => item._id !== action.payload._id)
            const newProductsInCheckOut = state.productsInCheckOut.filter(item => item == action.payload.name)

            return {
                ...state,
                selectedItems: newSelectedItems,
                productsInCheckOut: newProductsInCheckOut
            }
        case ACTIONS.removeMore:
            const indexx = state.selectedItems.findIndex(item => {
                return item._id === action.payload._id;
            });
            if (indexx !== -1) {
                const updatedItems = [...state.selectedItems];
                updatedItems[indexx] = {
                    ...updatedItems[indexx],
                    quantity: updatedItems[indexx].quantity - 1
                };
                return {
                    ...state,
                    selectedItems: updatedItems
                };
            }
            return state;

        case ACTIONS.checkout:
            return {
                ...state,
                checkout: true
            }

        default:
            return state;
    }
};


export const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <ProductContext.Provider value={{ state, dispatch }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductContextProvider;