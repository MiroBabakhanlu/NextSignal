// import axios from 'axios';

// // Create a custom Axios instance
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api', // Set your base URL here
//     withCredentials: true, // Include credentials like cookies in requests
// });

// // Add an interceptor to handle HTTP errors
// axiosInstance.interceptors.response.use(
//     response => response, // Pass through the response if no errors
//     error => {
//         let message = 'خطای غیرمنتظره رخ داد.'; // Default error message

//         // Check if the error response is available (HTTP status code errors)
//         if (error.response) {
//             const { status, data } = error.response;

//             // If a message is present in the server's response, use it
//             message = data.message || message;

//             // Handle specific HTTP status codes
//             switch (status) {
//                 case 400:
//                     message = data.message || 'درخواست اشتباه ارسال شده است.';
//                     break;
//                 case 401:
//                     message = data.message || 'لطفاً وارد حساب کاربری خود شوید.';
//                     break;
//                 case 403:
//                     message = data.message || 'دسترسی محدود است.';
//                     break;
//                 case 404:
//                     message = data.message || 'صفحه مورد نظر یافت نشد.';
//                     break;
//                 case 409:
//                     message = data.message || 'تعارض در ثبت اطلاعات. لطفاً بررسی کنید.';
//                     break;
//                 case 422:
//                     message = data.message || 'داده‌های ورودی معتبر نیستند.';
//                     break;
//                 case 429:
//                     message = data.message || 'Too many requests, please try again later.';
//                     break;
//                 case 500:
//                     message = data.message || 'خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.';
//                     break;
//                 case 502:
//                     message = data.message || 'درخواست شما به سرور نرسید. لطفاً دوباره تلاش کنید.';
//                     break;
//                 case 503:
//                     message = data.message || 'سرویس در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.';
//                     break;
//                 default:
//                     message = data.message || 'خطای غیرمنتظره رخ داد.';
//                     break;
//             }
//         }
//         // If no response (network errors, server down, etc.)
//         else if (error.request) {
//             message = 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.';
//         }
//         // If something went wrong during request setup
//         else if (error.config) {
//             message = 'مشکلی در تنظیمات درخواست به وجود آمد. لطفاً بررسی کنید.';
//         }
//         // If the error is related to Axios itself (e.g., timeout, invalid URL)
//         else if (error.message) {
//             message = error.message || 'خطای غیرمنتظره رخ داد.';
//         }

//         // Optionally, you can show a notification, log the error, or perform other actions here
//         console.error(message);  // Log the error message for debugging purposes

//         // Return the error message to be displayed to the user
//         // return Promise.reject(new Error(message));
//         return Promise.reject({ message, error });
//     }
// );

// export default axiosInstance;


// import axios from 'axios';

// // Create a custom Axios instance
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api', // Base API URL
//     withCredentials: true, // Include cookies with requests
// });

// // Helper function to retrieve CSRF token via a GET request
// const getCsrfTokenFromApi = async () => {
//     try {
//         const response = await axios.get('http://localhost:8080/api/csrf-token', { withCredentials: true });
//         return response.data.csrfToken; // Assuming the server returns the CSRF token in the `csrfToken` field
//     } catch (error) {
//         console.error('Error fetching CSRF token:', error);
//         return null;
//     }
// };

// const csrfToken = await getCsrfTokenFromApi();
// // Request interceptor to add CSRF token to headers
// axiosInstance.interceptors.request.use(
//     async (config) => {
//         console.log('Sending CSRF Token:', csrfToken);
//         if (csrfToken) {
//             config.headers['csrf-token'] = csrfToken; // Add CSRF token to headers
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request setup errors
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         let message = 'خطای غیرمنتظره رخ داد.';

//         if (error.response) {
//             const { status, data } = error.response;

//             message = data.message || message;

//             switch (status) {
//                 case 400:
//                     message = 'درخواست اشتباه ارسال شده است.';
//                     break;
//                 case 401:
//                     message = 'لطفاً وارد حساب کاربری خود شوید.';
//                     break;
//                     // case 403:
//                     // Attempt to refresh CSRF token and retry the request
//                     if (!originalRequest._retry) {
//                         originalRequest._retry = true; // Mark request as retried
//                         try {
//                             // Fetch new CSRF token
//                             const csrfResponse = await axios.get('http://localhost:8080/api/csrf-token', { withCredentials: true });
//                             const newCsrfToken = csrfResponse.data.csrfToken;

//                             // Add new token to original request headers
//                             if (newCsrfToken) {
//                                 originalRequest.headers['csrf-token'] = newCsrfToken;
//                             }

//                             // Retry the original request
//                             return axiosInstance(originalRequest);
//                         } catch (csrfError) {
//                             console.error('Failed to refresh CSRF token:', csrfError);
//                             message = 'دریافت توکن ناموفق بود. لطفاً دوباره تلاش کنید.';
//                         }
//                     } else {
//                         message = 'دسترسی محدود است.';
//                     }
//                     break;
//                 case 403:
//                     message = '403.';
//                 case 404:
//                     message = 'صفحه مورد نظر یافت نشد.';
//                     break;
//                 case 409:
//                     message = 'تعارض در ثبت اطلاعات. لطفاً بررسی کنید.';
//                     break;
//                 case 422:
//                     message = 'داده‌های ورودی معتبر نیستند.';
//                     break;
//                 case 429:
//                     message = 'تعداد درخواست‌ها بیش از حد است. لطفاً بعداً تلاش کنید.';
//                     break;
//                 case 500:
//                     message = 'خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.';
//                     break;
//                 case 502:
//                     message = 'درخواست شما به سرور نرسید. لطفاً دوباره تلاش کنید.';
//                     break;
//                 case 503:
//                     message = 'سرویس در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.';
//                     break;
//                 default:
//                     message = 'خطای غیرمنتظره رخ داد.';
//                     break;
//             }
//         }
//         else if (error.request) {
//             message = 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.';
//         }
//         else if (error.config) {
//             message = 'مشکلی در تنظیمات درخواست به وجود آمد. لطفاً بررسی کنید.';
//         }
//         else if (error.message) {
//             message = error.message;
//         }

//         console.error(message);

//         return Promise.reject({ message, error });
//     }
// );

// export default axiosInstance;




















// Helper function to retrieve CSRF token from cookies

// const getCsrfTokenFromCookies = () => {
//     const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('_csrf'));
//     return csrfCookie ? csrfCookie.split('=')[1] : null;
// };

// Request interceptor to add CSRF token to headers

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const csrfToken = getCsrfTokenFromCookies();
//         console.log('Sending CSRF Token:', csrfToken);
//         if (csrfToken) {
//             config.headers['csrf-token'] = csrfToken; // Add CSRF token to headers
//         }
//         return config;
//     },
//     (error) => {
//         // Handle request setup errors
//         return Promise.reject(error);
//     }
// );



import axios from 'axios';

// Create a custom Axios instance
const axiosInstance = axios.create({
    baseURL:process.env.REACT_APP_API_BASE_URL , // Base API URL
    withCredentials: true, // Include cookies with requests
});


let csrfToken = null;

// Request interceptor to add CSRF token to headers
axiosInstance.interceptors.request.use(async (config) => {
  // If it's a mutating request (POST, PUT, DELETE, PATCH) and we don't have a token
  if (['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase()) && !csrfToken) {
    await getCsrfToken();
  }
  
  if (csrfToken && ['post', 'put', 'delete', 'patch'].includes(config.method.toLowerCase())) {
    config.headers['csrf-token'] = csrfToken;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Function to fetch CSRF token
async function getCsrfToken() {
  try {
    const response = await axiosInstance.get('/csrf-token');
    csrfToken = response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
}

// Initial token fetch when app loads
getCsrfToken().catch(console.error);


axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        let message = 'خطای غیرمنتظره رخ داد.';

        if (error.response) {
            const { status, data } = error.response;

            message = data.message || message;

            switch (status) {
                case 400:
                    message = data.message || 'درخواست اشتباه ارسال شده است.';
                    break;
                case 401:
                    message = data.message || 'لطفاً وارد حساب کاربری خود شوید.';
                    csrfToken = null;
                    break;
                case 403:
                    message = data.message || 'دسترسی رد شد.';
                    csrfToken = null;
                    break;
                case 404:
                    message = data.message || 'صفحه مورد نظر یافت نشد.';
                    break;
                case 409:
                    message = data.message || 'تعارض در ثبت اطلاعات. لطفاً بررسی کنید.';
                    break;
                case 422:
                    message = data.message || 'داده‌های ورودی معتبر نیستند.';
                    break;
                case 429:
                    message = data.message || 'تعداد درخواست‌ها بیش از حد است. لطفاً بعداً تلاش کنید.';
                    break;
                case 500:
                    message = data.message || 'خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.';
                    break;
                case 502:
                    message = data.message || 'درخواست شما به سرور نرسید. لطفاً دوباره تلاش کنید.';
                    break;
                case 503:
                    message = data.message || 'سرویس در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.';
                    break;
                default:
                    message = data.message || 'خطای غیرمنتظره رخ داد.';
                    break;
            }
        }
        else if (error.request) {
            message = 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.';
        }
        else if (error.config) {
            message = 'مشکلی در تنظیمات درخواست به وجود آمد. لطفاً بررسی کنید.';
        }
        else if (error.message) {
            message = error.message;
        }

        console.error(message);

        return Promise.reject({ message, error });
    }
);

export default axiosInstance;


                    // case 403:
                    // // Attempt to refresh CSRF token and retry the request
                    // if (!originalRequest._retry) {
                    //     originalRequest._retry = true; // Mark request as retried
                    //     try {
                    //         // Fetch new CSRF token
                    //         const csrfResponse = await axios.get('http://localhost:8080/api/csrf-token', { withCredentials: true });
                    //         const newCsrfToken = csrfResponse.data.csrfToken;

                    //         // Add new token to original request headers
                    //         if (newCsrfToken) {
                    //             originalRequest.headers['x-csrf-token'] = newCsrfToken;
                    //         }

                    //         // Retry the original request
                    //         return axiosInstance(originalRequest);
                    //     } catch (csrfError) {
                    //         console.error('Failed to refresh CSRF token:', csrfError);
                    //         message = 'دریافت توکن ناموفق بود. لطفاً دوباره تلاش کنید.';
                    //     }
                    // } else {
                    //     message = 'دسترسی محدود است.';
                    // }
                    // break;