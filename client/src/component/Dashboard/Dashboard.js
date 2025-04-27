import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Admin from '../Dashboard/Admin';
import Customer from '../Dashboard/Customer';
import styled from 'styled-components';
import { Loading } from '../Store/Store';
import { UserContext } from '../../Context/UserContextProvider';
import axiosInstance from '../../Helper/apiInterceptors';


const Dashboard = () => {
    const [responseMsg, setResponseMsg] = useState(null);
    const [role, setRole] = useState(null);
    const navigate = useNavigate();
    const { dispatchInfo } = useContext(UserContext)

    useEffect(() => {
        const checkRole = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard`, { withCredentials: true });
                // const response = await axios.get(`http://localhost:8080/api/dashboard`, { withCredentials: true });
                response.data.role ? setRole(response.data.role) : setResponseMsg('دسترسی ممنوع. نقش مجاز نیست.');
                dispatchInfo({ type: 'LOGIN' });

            } catch (error) {
                setResponseMsg(error.message);
                navigate('/login')
            }
        };
        checkRole();
    }, [navigate]);

    return (
        <div>
            {role ? (
                role === 'admin' ? <Admin /> : <Customer />
            ) : (
                <Message>{responseMsg || <Loading><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><circle fill="#000000" stroke="#000000" stroke-width="7" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".8" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin="0.05"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".6" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".1"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".4" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".15"></animate></circle><circle fill="#000000" stroke="#000000" stroke-width="7" opacity=".2" r="15" cx="35" cy="100"><animate attributeName="cx" calcMode="spline" dur="1.8" values="35;165;165;35;35" keySplines="0 .1 .5 1;0 .1 .5 1;0 .1 .5 1;0 .1 .5 1" repeatCount="indefinite" begin=".2"></animate></circle></svg></Loading>}</Message>
            )}
        </div>
    );
};

export default Dashboard;


// Styled Component
const DashboardContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 200px;
    max-width: 90%;
    margin: auto;
    background-color: #ff0000;
    border-radius: 102px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
    min-height: 60vh;
`;

const Message = styled.p`
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #333;
    text-align: center;
`;
