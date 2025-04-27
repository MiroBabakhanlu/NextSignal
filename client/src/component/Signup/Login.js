import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
// import { UserContext } from '../../Context/UserContextProvider';
import styled, { keyframes } from 'styled-components';
import { colorContext } from '../../Context/ColorContextProvider';
import { validateSignUp } from '../../Helper/SignUpValidator';
import { handleAxiosError } from '../../Helper/handleAxiosError ';
import axiosInstance from '../../Helper/apiInterceptors';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../Helper/toast';
import { ToastContainer } from 'react-toastify';
import { UserContext } from '../../Context/UserContextProvider';



const Login = () => {
  const { config } = useContext(colorContext);

  const { userInfo, dispatchInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    password: ''
  });
  const [responseMsg, setResponseMsg] = useState('');

  const onchangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const getCsrfTokenFromApi = async () => {
    try {
      // const response = await axios.get('http://localhost:8080/api/csrf-token', { withCredentials: true });
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/csrf-token`, { withCredentials: true });
      return response.data.csrfToken; // Assuming the server returns the CSRF token in the `csrfToken` field
    } catch (error) {
      console.error('Error fetching CSRF token:', error);
      return null;
    }
  };


  // const [csrfToken, setCsrfToken] = useState();

  const handleLogin = async () => {
    // const validationErrors = validateSignUp(data, 'login');
    // if (Object.keys(validationErrors).length !== 0) {
    //   validateSignUp(data, 'register');
    //   setTouched({
    //     name: true,
    //     password: true,
    //   })
    //   return
    // }
    try {
      if (!data.name || !data.password) {
        setResponseMsg('تمام فیلدها الزامی است');
        notify('تمام فیلدها الزامی است', 'error')
        return;
      }
      setErrors({})
      setTouched({})


      // const csrfToken = await getCsrfTokenFromApi();
      // if (!csrfToken) {
      //   setResponseMsg('Failed to fetch CSRF token. Please try again.');
      //   return;
      // }


      // const response = await axios.post('http://localhost:8080/api/login', data, { headers: { 'csrf-token': csrfToken }, withCredentials: true })
      // const response = await axios.post('http://localhost:8080/api/login', data, { withCredentials: true })
      // const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, data, { headers: { 'csrf-token': csrfToken }, withCredentials: true })
      // const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, data, { withCredentials: true });
      const response = await axiosInstance.post(`${process.env.REACT_APP_API_BASE_URL}/login`, data);
      if (response.status === 200) {
        dispatchInfo({ type: 'LOGIN' })
        notify(response.message, 'success')
        navigate(response.data.redirect)
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.message || error?.message || 'خطای غیرمنتظره رخ داد.';
      notify(errorMsg, 'error');
      setResponseMsg(errorMsg);
    }
  };



  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/check-session`, { withCredentials: true });
        // const response = await axios.get('http://localhost:8080/api/check-session', { withCredentials: true });
        if (response.data.loggedIn && response.data.redirect) {
          navigate(response.data.redirect);
        }
      } catch (error) {
        const errorMsg = error?.response?.data?.message || error?.message || 'خطای غیرمنتظره رخ داد.';
        notify(errorMsg, 'error');
        setResponseMsg(errorMsg);
      }
    };
    checkSession();
  }, [navigate]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});

  const focusHandler = (e) => {
    setTouched({ ...touched, [e.target.name]: true, })
  }

  useEffect(() => {
    setErrors(validateSignUp(data, 'login'))
  }, [data, touched])


  return (
    <Wrapper theme={config} onKeyPress={handleKeyPress}>
      <Left theme={config}>
        <Circle className="circle1" theme={config} />
        <Circle className="circle2" theme={config} />
        <Circle className="circle3" theme={config} />
        <Circle className="circle4" theme={config} />
        <Welcome theme={config}> ! به فروشگاه ما خوش آمدید</Welcome>
        <Description theme={config}> برای خرید شکلات‌های سفارشی خود، وارد حساب کاربری‌تان شوید.</Description>
        {/* <LinkText theme={config}>
          <Link to="/register">حساب کاربری ندارید؟ ثبت‌نام کنید</Link>
        </LinkText> */}

      </Left>
      <Right theme={config}>
        <Container theme={config}>
          <Heading theme={config}>ورود به حساب</Heading>
          <Input theme={config}
            type="text"
            name="name"
            value={data.name}
            placeholder="نام کاربری"
            onChange={onchangeHandler}
          // onFocus={focusHandler}
          />
          <span
            style={{
              display: 'block', // Ensures the span takes up space
              minHeight: '1.5rem', // Set a fixed height to reserve space
              color: 'red',
              opacity: touched.name ? '1' : '0',
              transition: 'opacity 0.3s ease', // Smooth fade-in effect
            }}
          >
            {errors.name && touched.name && `${errors.name}`}
          </span>

          <Input theme={config}
            type="password"
            name="password"
            value={data.password}
            placeholder="رمز عبور"
            onChange={onchangeHandler}
          // onFocus={focusHandler}
          />

          <span
            style={{
              display: 'block',
              minHeight: '1.5rem',
              color: 'red',
              opacity: touched.password ? '1' : '0',
              transition: 'opacity 0.3s ease',
            }}
          >
            {errors.password && touched.password && `${errors.password}`}
          </span>
          <RegisterButton theme={config} onClick={handleLogin}>
            ورود به حساب
          </RegisterButton>
          {/* {responseMsg && <ResponseMsg theme={config}>{responseMsg}</ResponseMsg>} */}
          <LinkText theme={config}>
            <Link to="/register">حساب کاربری ندارید؟ ثبت‌نام کنید</Link>
          </LinkText>
        </Container>
      </Right>
      <ToastContainer />
    </Wrapper >
  );
};

export default Login;

// Keyframes for animations
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideIn = keyframes`
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0);
    }
`;

const riseUp = keyframes`
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

// Styled components
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  /* background: ${({ theme }) => theme.bg}; */
  background: ${({ theme }) => theme.mainBg};
  overflow: hidden;
  flex-direction: row;

  @media (max-width: 991px) {
  padding-top: 80px;
    flex-direction: column;
    height: fit-content;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* color: ${({ theme }) => theme.bg}; */
  color: ${({ theme }) => theme.titile1};
  background-color: ${({ theme }) => theme.titile1} ;
  padding: 20px;
  text-align: center;
  position: relative;
  z-index: 10;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    /* background: radial-gradient(circle,  ${({ theme }) => theme.bigCircleGradient} 20%,  ${({ theme }) => theme.bigCircleGradient2} 40%, transparent 50%); */
    background: radial-gradient(circle,  ${({ theme }) => theme.circle1} 20%,  ${({ theme }) => theme.circle2} 40%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 991px) {
    color: white;
  }
`;

const Circle = styled.div`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(94, 75, 139, 0.1);
  z-index: 0;

  &.circle1 {
    width: 50px;
    height: 50px;
    top: 10%;
    left: 10%;
    /* background-color: ${({ theme }) => theme.c1}; */
    background-color: ${({ theme }) => theme.navLink};
  }

  &.circle2 {
    width: 30px;
    height: 30px;
    top: 60%;
    left: 20%;
    /* background-color: ${({ theme }) => theme.c2}; */
    background-color: ${({ theme }) => theme.textLeft};
  }

  &.circle3 {
    width: 40px;
    height: 40px;
    top: 30%;
    right: 15%;
    /* background-color: ${({ theme }) => theme.c3}; */
    background-color: ${({ theme }) => theme.textCenter};
  }

  &.circle4 {
    width: 60px;
    height: 60px;
    bottom: 10%;
    right: 5%;
    /* background-color: ${({ theme }) => theme.c4}; */
    background-color: ${({ theme }) => theme.svg2} ;
  }
`;


const Welcome = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.3);
  animation: ${slideIn} 1s ease-out;
  /* color: ${({ theme }) => theme.welcome}; */
  /* color: ${({ theme }) => theme.titile1}; */
  z-index: 1000;
`;

const Description = styled.p`
  font-size: 1rem;
  max-width: 600px;
  opacity: 0;
  animation: ${fadeIn} 1s 0.5s forwards;
  text-align: center;
  /* color: ${({ theme }) => theme.description}; */
  /* color: ${({ theme }) => theme.titile1}; */
  color: aliceblue;
  margin: 10px 0;
  line-height: 1.4;
  border-radius: 10px;
  z-index: 1000;
  padding: 10px;
`;

const LinkText = styled.p`
  font-size: 1.1rem;
  padding-top: 30px;
  /* color: ${({ theme }) => theme.linktext}; */
  a{
    /* color: ${({ theme }) => theme.titile1}; */
    text-decoration: none;
    color: black;
  }
`;
const StyledLink = styled(Link)`
  /* color: ${({ theme }) => theme.styledLink}; */
  color: ${({ theme }) => theme.titile1};
  text-decoration: underline;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  /* background-color: ${({ theme }) => theme.right} ; */
  background-color: ${({ theme }) => theme.landingLeftBg} ;
  color: ${({ theme }) => theme.titile1} ;
`;

const Container = styled.div`
  background:  ${({ theme }) => theme.mainBg};
  padding: 20px;
  border-radius: 20px;
  /* box-shadow: 0 20px 40px rgba  ${({ theme }) => theme.styledLink}; */
  width: 55%;
  max-width: 350px;
  transform: translateY(20px);
  opacity: 0;
  animation: ${riseUp} 1s ease-out forwards;
  text-align: center;

    @media (max-width: 991px) {
        flex-direction: column;
        width: 70%;
        margin-top: 50px;
        margin-bottom: 50px;
    }
`;

const Heading = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  /* color: ${({ theme }) => theme.heading}; */
  /* color: red; */
  text-align: center;
  animation: ${fadeIn} 1s ease;
`;

const Input = styled.input`
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  /* border: 2px solid  ${({ theme }) => theme.inputBorder}; */
  border: 2px solid  ${({ theme }) => theme.titile1};
  border-radius: 50px;
  font-size: 14px;
  /* color:  ${({ theme }) => theme.inputTextColor}; */
  color:  ${({ theme }) => theme.titile1};
  background:  ${({ theme }) => theme.input};
  /* box-shadow: 0 10px 0px  ${({ theme }) => theme.inputShadow}; */
  box-shadow: 0 10px 0px  ${({ theme }) => theme.titile1};
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s forwards;

  &:hover {
    border-color:  ${({ theme }) => theme.inpurBorderHover};
    background:  ${({ theme }) => theme.inputHover};
    /* box-shadow: 0 10px 30px  ${({ theme }) => theme.inputShadowHover}; */
    transform: translateY(-5px);
  }

  &:focus {
    outline: none;
    /* box-shadow: 0 10px 30px ${({ theme }) => theme.inputFocus}; */
    box-shadow: 0 0px 0px ${({ theme }) => theme.inputFocus};
    transform: scale(1.05);
  }
`;

const RegisterButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 15px;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  color: white;
  /* background:  ${({ theme }) => theme.registerBtn}; */
  background:  ${({ theme }) => theme.textCenter};
  /* box-shadow: 0 10px 20px  ${({ theme }) => theme.registerBtnShadow}; */
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${fadeIn} 1s forwards;

  &:hover {
    background: ${({ theme }) => theme.registerBtnHover};
    transform: scale(1.03);
    box-shadow: 0 15px 25px ${({ theme }) => theme.registerBtnShadowHover};
  }
`;

const ResponseMsg = styled.div`
  margin-top: 15px;
  color: ${({ theme }) => theme.responseMsg};
  font-size: 1rem;
  opacity: 0;
  animation: ${fadeIn} 1s 0.5s forwards;
`;