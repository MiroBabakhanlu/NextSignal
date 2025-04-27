export const handleAxiosError = (error) => {
    // Default message for unexpected errors
    let message = 'خطای غیرمنتظره رخ داد.';

    if (error.response) {
        // If we have a response from the server
        const { status, data } = error.response;
        message = data.message || message;  // Fallback to default if no specific message

        // Handle specific status codes
        switch (status) {
            case 400:
                message = message || 'درخواست اشتباه ارسال شده است.';
                break;
            case 401:
                message = message || 'لطفاً وارد حساب کاربری خود شوید.';
                break;
            case 403:
                message = message || 'دسترسی محدود است.';
                break;
            case 404:
                message = message || 'صفحه مورد نظر یافت نشد.';
                break;
            case 500:
                message = message || 'خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.';
                break;
            case 502:
                message = message || 'سرور پاسخ نمی‌دهد. لطفاً دوباره تلاش کنید.';
                break;
            case 503:
                message = message || 'سرویس در دسترس نیست. لطفاً بعداً دوباره تلاش کنید.';
                break;
            default:
                message = message || 'خطای غیرمنتظره رخ داد.';
                break;
        }
    } else if (error.request) {
        // Network error, no response from server
        message = 'خطای شبکه. لطفاً اتصال خود را بررسی کنید.';
    } else {
        // Any other error (e.g., configuration issue)
        message = error.message || 'خطای غیرمنتظره رخ داد.';
    }

    return message;
};
