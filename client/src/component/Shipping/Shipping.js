import React, { useContext, useState, useEffect } from 'react';
import { ProductContext } from '../../Context/ProductContextProvider';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContextProvider';
import axios from 'axios';
import { FaMapPin, FaClock, FaMoneyCheck, FaShippingFast, FaShoppingBasket, FaMarker, FaMapSigns, FaMap, FaPhoneAlt, FaRegEnvelope, FaBuilding, FaStreetView, FaUserAlt, FaSign, FaLeaf } from 'react-icons/fa'; // Imported icons
import styles from './Shipping.module.css';
import { getQuantity } from '../../Helper/Helper';
import { ShippingContext } from '../../Context/ShippingCotextProvider';
import { validate } from '../../Helper/ShippingErrors';
import styled from 'styled-components'
import axiosInstance from '../../Helper/apiInterceptors';
import { notify } from '../../Helper/toast';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


// Helper function to format dates for display
export const formatDate = (date) => {
    return date.toLocaleDateString('fa-IR', { weekday: 'short', month: 'short', day: 'numeric' });
};

const Shipping = () => {

    const [responseMsg, setResponseMsg] = useState('');


    const { shippingInfo, dispatchShipping } = useContext(ShippingContext);
    const HandelShipping = async () => {

        const validationErrors = validate(address, 'login');
        if (Object.keys(validationErrors).length !== 0) {
            validate(address,);
            setTouched({
                firstName: true,
                lastName: true,
                area: true,
                neighbourhood: true,
                street: true,
                alleys: true,
                postalCode: true,
                phoneNumber: true,
                plaque: true,
            })
            // return
        }

        const requiredFields = {
            firstName: address.firstName,
            lastName: address.lastName,
            area: address.area,
            neighbourhood: address.neighbourhood,
            street: address.street,
            alleys: address.alleys,
            postalCode: address.postalCode,
            phoneNumber: address.phoneNumber,
            plaque: address.plaque,
            deliveryfee,
            selectedDate: selectedDate ? selectedDate.toISOString() : null,
            selectedTimeSlot: selectedTimeSlot?.time,
            productQuantityInCart,
            totalCartPrice,
            totalPrice: deliveryfee + totalCartPrice,
            products,
        };

        // Check for missing fields
        const missingFields = Object.entries(requiredFields)
            .filter(([key, value]) => value === null || value === undefined || value === '')
            .map(([key]) => key);

        // Map field keys to user-friendly names
        const fieldNames = {
            firstName: 'نام',
            lastName: 'نام خانوادگی',
            area: 'منطقه',
            neighbourhood: 'محله',
            street: 'خیابان',
            alleys: 'کوچه',
            postalCode: 'کد پستی',
            phoneNumber: 'شماره تلفن',
            plaque: 'پلاک',
            deliveryfee: 'هزینه ارسال',
            selectedDate: 'تاریخ  ',
            selectedTimeSlot: 'بازه زمانی  ',
            productQuantityInCart: 'تعداد محصولات در سبد خرید',
            totalCartPrice: 'مجموع قیمت سبد خرید',
            totalPrice: 'قیمت کل',
            products: 'محصولات',
        };
        // Get user-friendly names for missing fields
        const userFriendlyNames = missingFields.map((field) => fieldNames[field]);


        if (missingFields.length > 0) {

            // alert(`The following fields are missing or invalid: ${missingFields.join(', ')}`);

            notify(`u have currenlly ${missingFields.length} missing fields`, 'error');
            setShippingInfoIsFull([...userFriendlyNames]);
            return;
        }



        const updatedShippingData = {
            ...requiredFields,
        };

        // Dispatch the data to the reducer
        dispatchShipping({
            type: 'HANDEL_DETAILS',
            payload: updatedShippingData,
        });



        try {
            // Use the updatedShippingData directly in the API call
            const response = await axiosInstance.post(
                '/add-order', { updatedShippingData }
            );
            if (response.status === 201) {
                // alert('Order was placed successfully');
                notify(`order was placed successfully`, 'success');
                navigate('/dashboard')
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };
    const [errors, setErrors] = useState({});
    const [shippingInfoIsFull, setShippingInfoIsFull] = useState([])
    const [touched, setTouched] = useState({});
    const focusHandler = (e) => {
        setTouched({ ...touched, [e.target.name]: true, })
    }



    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);  // Track edit mode
    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        area: '',
        neighbourhood: '',
        street: '',
        alleys: '',
        postalCode: '',
        phoneNumber: '',
        plaque: ''
    });
    const [deliveryfee, setDeiveryFee] = useState()

    useEffect(() => {
        setErrors(validate(address))
    }, [address, touched])


    const [message, setMessage] = useState('');
    const [selectedBox, setSelectedBox] = useState(false);

    //context
    const { state } = useContext(ProductContext);
    const { userInfo, dispatchInfo } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress(prevAddress => ({ ...prevAddress, [name]: value }));
    };

    const checkSession = async () => {
        try {
            const response = await axiosInstance.get('/check-session');
            if (response.data.loggedIn && response.data.redirect) {
                dispatchInfo({ type: 'LOGIN' });
            } else {
                navigate('/dashboard')
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };

    useEffect(() => {
        checkSession();
        if (!userInfo.logedIn) {
            setMessage('شما وارد نشده‌اید. در حال هدایت به داشبورد...');
            const timer = setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
            return () => clearTimeout(timer);
        } else if (!state.checkout) {
            setMessage('سبد خرید شما خالی است. در حال هدایت به فروشگاه...');
            const timer = setTimeout(() => {
                navigate('/store');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [userInfo.logedIn, state.checkout, navigate]);



    //date handeling///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [selectedDate, setSelectedDate] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);  // Time slots state
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);  // Store the selected time slot

    // Calculate the start date (3 days from today)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 3);

    // Generate dates for the next 14 days
    const dates = Array.from({ length: 14 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
    });

    //  MongoDB’s Date type stores the entire date, including time, down to milliseconds (e.g., 2024-11-28T00:00:00.000Z). However, as long as you set the time portion to midnight (00:00:00) in UTC, this will not throw an error, and it will work correctly with MongoDB queries.


    // Fetch available time slots for selected date
    const fetchTimeSlots = async (date) => {
        try {
            // Make a request to the server with the date query
            const response = await axiosInstance.get(`/check-date-capacity?date=${date}`);

            if (response.status === 200) {
                const transformedSlots = Object.entries(response.data).map(([time, status]) => ({ //object.entries makes every object into array then the map function maps through the inner arrays turning them into object with time and status properties will will retun an array with 4  new object with time and status as properties.
                    time,
                    status
                }));
                setTimeSlots(transformedSlots);
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };
    // Handle date click and store it as a Date object

    const handleDateClick = (date) => {

        setSelectedTimeSlot(null)
        const selected = new Date(date);
        selected.setUTCHours(0, 0, 0, 0); // Set time to midnight UTC
        setSelectedDate(selected);
        fetchTimeSlots(selected.toISOString());

    };


    // Handle time slot selection
    const handleTimeSlotSelect = (slot) => {
        if (slot.status === 'available') {
            setSelectedTimeSlot(slot);
        }
        if (totalCartPrice >= 375000) {
            setDeiveryFee('رایگان')
        }

    };
    const [productQuantityInCart, setProductsQuantityInCart] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(state.selectedItems);

        const totalQuantity = state.selectedItems.reduce((acc, item) => acc + item.quantity, 0);
        setProductsQuantityInCart(totalQuantity);

        // Calculate total price
        const totalPrice = state.selectedItems.reduce((acc, item) => {
            const itemPrice = item.price * item.quantity;
            return acc + itemPrice;
        }, 0);
        setTotalCartPrice(totalPrice);

        setDeiveryFee(totalPrice >= 350000 ? 'رایگان' : 50000)

    }, [state.selectedItems]);


    if (message) {
        return (
            <div>{message}</div>
        );
    }

    // Show the dotted box with the pin icon if no address is available
    const renderAddressForm = !address.area && !address.neighbourhood && !address.street && !address.alleys;

    const handleEditToggle = () => {
        const validationErrors = validate(address);

        if (Object.keys(validationErrors).length === 0) {
            setIsEditing(!isEditing);
            setErrors({});
        } else {
            setErrors(validationErrors);
            setIsEditing(true);
        }
    };
    const arrow = '<'

    return (
        <div className={styles.shippingContainer}>
            {renderAddressForm && !isEditing ? (
                <div className={styles.addressSummaryContainer} onClick={handleEditToggle}>
                    <div className={styles.addressPinIcon}>
                        <FaMapPin size={50} />
                    </div>
                    <p className={styles.addressSummaryText}>پر کردن اطلاعات تحویل</p>
                </div>
            ) : (

                <>
                    {/* Address and information */}
                    <div>
                        <h2 className={styles.sectionTitile}> <FaShippingFast /> اطلاعات حمل و نقل</h2>


                        {isEditing ? (
                            <form className={styles.form}>
                                <div className={styles.formField}>
                                    <label htmlFor="firstName">نام</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={address.firstName}
                                        onChange={handleChange}
                                        placeholder="نام"
                                        required
                                        maxLength="30"
                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.firstName ? '1' : '0' }}>{errors.firstName && touched.firstName && `${errors.firstName}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="lastName">نام خانوادگی</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={address.lastName}
                                        onChange={handleChange}
                                        placeholder="نام خانوادگی"
                                        required
                                        maxLength="30"

                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.lastName ? '1' : '0' }}>{errors.lastName && touched.lastName && `${errors.lastName}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="area">منطقه</label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        value={address.area}
                                        onChange={handleChange}
                                        placeholder="منطقه"
                                        required
                                        maxLength="30"

                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.area ? '1' : '0' }}>{errors.area && touched.area && `${errors.area}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="neighbourhood">محله</label>
                                    <input
                                        type="text"
                                        id="neighbourhood"
                                        name="neighbourhood"
                                        value={address.neighbourhood}
                                        onChange={handleChange}
                                        placeholder="نام محله"
                                        required
                                        maxLength="30"
                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.neighbourhood ? '1' : '0' }}>{errors.neighbourhood && touched.neighbourhood && `${errors.neighbourhood}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="street">خیابان</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        value={address.street}
                                        onChange={handleChange}
                                        placeholder="نام خیابان"
                                        maxLength="30"
                                        required
                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.street ? '1' : '0' }}>{errors.street && touched.street && `${errors.street}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="alleys">کوچه</label>
                                    <input
                                        type="text"
                                        id="alleys"
                                        name="alleys"
                                        value={address.alleys}
                                        onChange={handleChange}
                                        placeholder="کوچه"
                                        maxLength="30"

                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.alleys ? '1' : '0' }}>{errors.alleys && touched.alleys && `${errors.alleys}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="postalCode">کد پستی</label>
                                    <input
                                        type="text"
                                        id="postalCode"
                                        name="postalCode"
                                        value={address.postalCode}
                                        onChange={handleChange}
                                        placeholder="کد پستی"
                                        maxLength="30"

                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.postalCode ? '1' : '0' }}>{errors.postalCode && touched.postalCode && `${errors.postalCode}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="phoneNumber">شماره تلفن</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={address.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="شماره تلفن"
                                        required
                                        maxLength="30"
                                        onFocus={focusHandler}

                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.phoneNumber ? '1' : '0' }}>{errors.phoneNumber && touched.phoneNumber && `${errors.phoneNumber}`}</span>
                                </div>
                                <div className={styles.formField}>
                                    <label htmlFor="plaque">پلاک</label>
                                    <input
                                        type="text"
                                        id="plaque"
                                        name="plaque"
                                        value={address.plaque}
                                        onChange={handleChange}
                                        placeholder="پلاک"
                                        required
                                        maxLength="30"
                                        onFocus={focusHandler}
                                    />
                                    <span style={{ height: '1rem', color: 'red', opacity: touched.plaque ? '1' : '0' }}>{errors.plaque && touched.plaque && `${errors.plaque}`}</span>
                                </div>
                            </form>
                        ) : (
                            <div className={styles.addressDetails}>
                                <div><FaUserAlt /> <span>: نام و نام خانوادگی</span> {address.firstName} {address.lastName}</div>
                                <div><FaMapSigns /> <span> {arrow} منطقه</span> {address.area} <span> {arrow} محله</span> {address.neighbourhood} <span> {arrow} خیابان</span> {address.street} <span> {arrow} کوچه</span> {address.alleys} <span> {arrow} پلاک</span> {address.plaque}</div>
                                <div><FaPhoneAlt /> <span> : شماره تلفن</span> {address.phoneNumber}</div>
                                <div><FaRegEnvelope /> <span> : کد پستی</span> {address.postalCode}</div>
                                {/* <div><FaUserAlt /> <span>: نام و نام خانوادگی</span> {address.firstName} {address.lastName}</div>
                            <div><FaMapSigns />  {address.area}   {address.neighbourhood}  {address.street} {address.alleys} {address.plaque}</div>
                            <div><FaPhoneAlt /> <span> : شماره تلفن</span> {address.phoneNumber}</div>
                            <div><FaRegEnvelope /> <span> : کد پستی</span> {address.postalCode}</div> */}
                            </div>
                        )}
                        <button className={styles.editButton} onClick={handleEditToggle}>
                            {isEditing ? 'خاتمه و مشاهده' : 'ویرایش'}
                        </button>
                    </div>


                    {/* Date selection */}
                    <div>
                        <h4 className={styles.sectionTitile}> <FaClock />تاریخ و   زمان  ارسال </h4>
                        <p className={styles.sectionStatus}>{selectedTimeSlot && selectedDate ? <span style={{ color: 'green' }}> {formatDate(selectedDate)} ساعت {selectedTimeSlot?.time}</span> : ' تاریخ و   زمان   انتخاب نشده'}</p>
                    </div>
                    <div className={styles.DateWarpper}>
                        <div className={styles.dateContainer}>
                            {dates.map((date, index) => (

                                <div
                                    key={index}
                                    className={`${styles.dateItem}`}
                                    onClick={() => handleDateClick(date)}
                                    style={{
                                        opacity: selectedDate && selectedDate.toDateString() === date.toDateString() ? '1' : '0.4'
                                    }}
                                >
                                    {formatDate(date)}
                                </div>
                            ))}

                        </div>
                        {/* Time slots selection */}
                        {timeSlots.length > 0 && (
                            <div className={styles.timeSlotsContainer}>
                                <h4 className={styles.sectionTitile}>  : زمان</h4>
                                <div className={styles.timeSlotsList}>

                                    <p className={styles.sectionStatus2}> {(selectedTimeSlot && selectedDate) ? (totalCartPrice >= 350000 ? <span style={{ color: 'green' }}>رایگان</span> : <span style={{ color: 'green' }}>50,000</span>) : ''}: هزینه ارسال</p>

                                    {timeSlots.map((slot, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.timeSlot} ${slot.status === 'available' ? styles.available : styles.full}`}
                                            style={{
                                                border: selectedTimeSlot && selectedTimeSlot.time === slot.time ? '1px solid  #333 ' : 'none',
                                            }}
                                            onClick={() => {
                                                handleTimeSlotSelect(slot)
                                            }
                                            }
                                        >
                                            {slot.time} ساعت
                                            {/* - {slot.status} */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>



                    {/* Diplaying products */}


                    <div>
                        <h1 className={styles.sectionTitile} style={{ paddingRight: '15px' }} > <FaShoppingBasket /> محصولات انتخاب شده</h1>
                        <p className={styles.sectionStatus2} style={{ paddingRight: '15px' }} > {productQuantityInCart} : تعداد کل</p>
                        <p className={styles.sectionStatus} style={{ color: 'green', paddingRight: '15px' }}> {totalCartPrice.toLocaleString()}  مجموع:  تومان</p>
                    </div>
                    <div className={styles.productWrapper}>

                        {products.length > 0 ? (
                            products.map((item) => (
                                <div className={styles.productContainer}>
                                    <span className={styles.pq}>{getQuantity(state, item._id)}</span>
                                    <img src={item.imageUrl} />
                                    <h1>{item.name}</h1>
                                </div>
                            ))
                        ) : (
                            <div className={styles.m}>


                            </div>
                        )}

                    </div>

                    {/* check and pay */}
                    <div>
                        <h1 className={styles.sectionTitile2}> <FaMoneyCheck /> {responseMsg} نهایی کردن و پرداخت</h1>
                    </div>

                    <div className={styles.factor}>
                        <div>
                            <span> تومان {totalCartPrice.toLocaleString()}</span> <h1> <span>({productQuantityInCart})</span> قیمت محصولات </h1>
                        </div>
                        <div>
                            <span>{deliveryfee}</span> <h2>هزینه ارسال  </h2>
                        </div>
                        <div>
                            <span> {deliveryfee === 'رایگان' ? 'تومان ' + totalCartPrice.toLocaleString() : (deliveryfee + totalCartPrice).toLocaleString()}</span> <h1> قابل پرداخت </h1>
                        </div>
                        <button onClick={HandelShipping}>  ثبت سفارش و پرداخت</button>

                        {shippingInfoIsFull.length > 0 && (
                            <>
                                <p>لطفاً اطلاعات زیر را تکمیل کنید</p>
                                <ErrorBox>
                                    <ul>
                                        {shippingInfoIsFull.map((field, index) => (
                                            <li key={index}>{field}</li>
                                        ))}
                                    </ul>
                                </ErrorBox>
                            </>
                        )}
                    </div>

                </>
            )
            }
            <ToastContainer />
        </div >
    );
};

export default Shipping;


const ErrorBox = styled.div`
    width: 80%;
    ul{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    li {
        list-style: none;
        width: 100%;
        text-align: center;
        font-size: 14px;
        color: red;
    }
`;
