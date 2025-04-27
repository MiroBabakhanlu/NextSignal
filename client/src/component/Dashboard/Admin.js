import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';
import { useNavigate } from 'react-router-dom';
import Overview from './Overview';
import Orders from './Orders';
import axiosInstance from '../../Helper/apiInterceptors';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { notify } from '../../Helper/toast';

const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [responseMsg, setResponseMsg] = useState('');
    const [beingEdited, setBeingEdited] = useState([]);
    const [editedData, setEditedData] = useState({});
    const [selectedSection, setSelectedSection] = useState('orders');

    const [data, setData] = useState({
        name: '',
        price: 0,
        description: '',
        stock: 0,
        image: null, // New field for the image file
    });

    const logout = async () => {


        try {
            // const response = await axiosInstance.post('http://localhost:8080/api/logout');
            const response = await axiosInstance.post(`${process.env.REACT_APP_API_BASE_URL}/logout`);
            if (response.status === 200 && response.data.redirect) {
                // navigate(response.data.redirect);
                window.location.href = response.data.redirect; // Full page reload
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };

    const onchangeHandler = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: name === 'price' || name === 'stock' ? Number(value) : value,
        });
    };

    const onEditChangeHandler = (e, productName) => {
        const { name, value, files } = e.target;
        setEditedData({
            ...editedData,
            [productName]: {
                ...editedData[productName],
                [name]: name === 'image' ? files[0] : name === 'price' || name === 'stock' ? Number(value) : value,
            },
        });
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                const response = await axiosInstance.get('/get-products');
                if (response.status === 200) {
                    setProducts([...response.data]);
                }
            } catch (error) {
                notify(error.message, 'error');
                setResponseMsg(error.message);
            }
        };
        getProduct();
    }, []);



    const editProduct = (product) => {
        if (beingEdited.includes(product.name)) {
            setBeingEdited(beingEdited.filter((p) => p !== product.name));
        } else {
            setBeingEdited([...beingEdited, product.name]);
            setEditedData({ ...editedData, [product.name]: product });
        }
    };


    const deleteProduct = async (productId) => {
        try {
            const response = await axiosInstance.delete(`/delete-product/${productId}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                notify("product was deleted successfully", 'success');
                setProducts(products.filter(product => product._id !== productId));
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };


    useEffect(() => {
        if (responseMsg) {
            const timer = setTimeout(() => {
                setResponseMsg(""); // Clear the message
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [responseMsg]);

    const AddItem = async () => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('stock', data.stock);
        formData.append('image', data.image); // Append image file

        try {
            const response = await axiosInstance.post('/admin-restock', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for FormData
                },
            });

            if (response.status === 201) {
                const getProduct = async () => {
                    try {
                        const response = await axiosInstance.get('/get-products');
                        if (response.status === 200) {
                            setProducts([...response.data]);
                            notify("new product was added Successully", 'success');
                        }
                    } catch (error) {
                        notify(error.message, 'error');
                        setResponseMsg(error.message);
                    }
                };
                getProduct();

                setData({
                    name: '',
                    price: 0,
                    description: '',
                    stock: 0,
                    image: null, // Reset image field
                });
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };

    const handleErrorResponse = (error) => {
        if (error.response) {
            const { message } = error.response.data;
            const status = error.response.status;
            if ([400, 403, 404, 409].includes(status)) {
                setResponseMsg(message);
            } else if (status === 500) {
                setResponseMsg('خطای داخلی سرور. لطفا بعدا دوباره تلاش کنید.');
            } else {
                setResponseMsg('یک خطای غیرمنتظره رخ داده است.');
            }
        } else {
            setResponseMsg('خطای شبکه. لطفا اتصال خود را بررسی کنید.');
        }
    };

    const onImageChange = (e) => {
        setData({ ...data, image: e.target.files[0] }); // Set image file
    };


    const saveChanges = async (productName) => {
        const productToUpdate = editedData[productName];
        const productId = productToUpdate._id;

        const formData = new FormData();
        formData.append('name', productToUpdate.name);
        formData.append('price', productToUpdate.price);
        formData.append('description', productToUpdate.description);
        formData.append('stock', productToUpdate.stock);
        if (productToUpdate.image) {
            formData.append('image', productToUpdate.image);
        }

        try {
            const response = await axiosInstance.patch(`/update-products/${productId}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data', // Important for FormData
                },
            });
            if (response.status === 200) {
                setProducts(products.map(product => product._id === productId ? response.data : product));
                setBeingEdited(beingEdited.filter(name => name !== productName));
                setEditedData((prev) => ({ ...prev, [productName]: {} }));
                notify("product was updated Successully", 'success');
            }
        } catch (error) {
            notify(error.message, 'error');
            setResponseMsg(error.message);
        }
    };

    const SelectionHandler = (selection) => {
        setSelectedSection(selection)
    }

    return (
        <div className={styles.adminWrapper}>
            {responseMsg && <div className={styles.responseMsg}>{responseMsg}</div>}
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <h1 style={{ margin: '10px' }}>مدیریت</h1>
                    <ul>
                        <li onClick={() => setSelectedSection('overview')}>بررسی کلی</li>
                        <li onClick={() => setSelectedSection('orders')}>سفارشات</li>
                        <li onClick={() => setSelectedSection('products')}>محصولات</li>
                        <li onClick={logout}>خروج</li>
                    </ul>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.content}>
                    {selectedSection === 'overview' && <Overview selectFunction={SelectionHandler} />}
                    {selectedSection === 'orders' && <Orders />}


                    {selectedSection === 'products' && (
                        <div>
                            <h2 className={styles.h}>مدیریت محصولات</h2>

                            <div className={styles.addItemContainer}>
                                <h2 className={styles.heading}>اضافه کردن محصول جدید</h2>
                                <div className={styles.inputGroup}>
                                    <label>نام محصول</label>
                                    <input value={data.name} onChange={onchangeHandler} name='name' type='text' />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>قیمت</label>
                                    <input value={data.price} onChange={onchangeHandler} name='price' type='number' />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>توضیحات</label>
                                    <input value={data.description} onChange={onchangeHandler} name='description' type='text' />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>موجودی</label>
                                    <input value={data.stock} onChange={onchangeHandler} name='stock' type='number' />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>عکس محصول</label>
                                    <input onChange={onImageChange} name='image' type='file' accept='image/*' />
                                </div>

                                <button className={styles.button} onClick={AddItem}>اضافه کردن</button>
                            </div>
                            <h1 className={styles.h}>لیست محصولات فعلی:</h1>
                            <div className={styles.productList}>
                                {products.map(product => (
                                    <div className={styles.productItem} key={product.name}>
                                        <div className={styles.productInfo}>
                                            <p>{product.name}:</p>
                                            {product.imageUrl && (
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className={styles.productImage}
                                                />
                                            )}
                                            <p className={styles.labelsforproductsContent}><label className={styles.labelsforproducts}>قیمت</label>: {product.price}</p>
                                            <p className={styles.labelsforproductsContent}><label className={styles.labelsforproducts}>توضیحات</label>: {product.description}</p>
                                            <p className={styles.labelsforproductsContent}><label className={styles.labelsforproducts}>موجودی</label>: {product.stock}</p>
                                            <button className={styles.editButton} onClick={() => editProduct(product)}>ویرایش</button>
                                            <button className={styles.deleteButton} onClick={() => deleteProduct(product._id)}>حذف</button>
                                        </div>
                                        {beingEdited.includes(product.name) && (
                                            <div className={styles.editableSection}>
                                                <h3>ویرایش محصول</h3>
                                                <div className={styles.inputGroup}>
                                                    <label>نام ویرایش شده</label>
                                                    <input
                                                        value={editedData[product.name]?.name || ''}
                                                        onChange={(e) => onEditChangeHandler(e, product.name)}
                                                        name="name"
                                                        type="text"
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label>قیمت ویرایش شده</label>
                                                    <input
                                                        value={editedData[product.name]?.price || ''}
                                                        onChange={(e) => onEditChangeHandler(e, product.name)}
                                                        name="price"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label>توضیحات ویرایش شده</label>
                                                    <input
                                                        value={editedData[product.name]?.description || ''}
                                                        onChange={(e) => onEditChangeHandler(e, product.name)}
                                                        name="description"
                                                        type="text"
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label>موجودی ویرایش شده</label>
                                                    <input
                                                        value={editedData[product.name]?.stock || ''}
                                                        onChange={(e) => onEditChangeHandler(e, product.name)}
                                                        name="stock"
                                                        type="number"
                                                    />
                                                </div>
                                                <div className={styles.inputGroup}>
                                                    <label>عکس ویرایش شده</label>
                                                    <input
                                                        onChange={(e) => onEditChangeHandler(e, product.name)}
                                                        name="image"
                                                        type="file"
                                                        accept='image/*'
                                                    />
                                                </div>
                                                <button className={styles.saveButton} onClick={() => saveChanges(product.name)}>ذخیره تغییرات</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Admin;
                            {/* <button onClick={() => console.log(products)}>LOG Product</button> */} {/* this helped fix adding and updation in one reload problem */}
