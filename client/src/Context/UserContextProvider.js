import React, { createContext, useReducer } from 'react';

const initialState = {
    username: null,
    // email: null,
    phone: null,
    timeCreated: null,
    logedIn: false,
    errorMsg: null,
    logedIn: false,
}

const reduce = (state, action) => {
    switch (action.type) {
        case 'SET_DATA':
            console.log(action.payload)

            const { username, phone, timeCreated  } = action.payload;
            if (!username || !phone || !timeCreated) {
                return { ...state, errorMsg: "Unable to retrieve user data, please try again." };
            }
            return {
                ...state,
                username,
                phone,
                timeCreated,
                // logedIn: true will unncomment later
            }

            case 'LOGIN':
                return{
                    ...state,
                    logedIn: true
                }
                
            case 'LOGOUT':
                return{
                    username: null,
                    phone: null,
                    timeCreated: null,
                    logedIn: false,
                    errorMsg: null,
                    logedIn: false
                }

        default:
            return state
    }
}


export const UserContext = createContext();
const UserContextProvider = ({ children }) => {

    const [userInfo, dispatchInfo] = useReducer(reduce, initialState)

    return (
        <UserContext.Provider value={{ userInfo, dispatchInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;