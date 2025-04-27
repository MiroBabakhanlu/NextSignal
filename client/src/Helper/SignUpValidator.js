export const validateSignUp = (data, type) => {
    const errors = {};
    if (type == 'register') {

        if (!data.name.trim()) {
            errors.name = 'وارد کردن نام الزامی است';
        } else if (data.name.length < 2) {
            errors.name = 'نام باید حداقل ۲ کاراکتر باشد';
        } else if (/[^a-zA-Zا-ی\s]/.test(data.name)) {
            errors.name = 'نام باید فقط شامل حروف باشد';
        }

        // Phone Validation
        if (!data.phone) {
            errors.phone = 'وارد کردن شماره تلفن الزامی است';
        } else if (!/^\d{10,11}$/.test(data.phone)) {
            errors.phone = 'شماره تلفن باید ۱۰ یا ۱۱ رقم باشد';
        }

        // Password Validation
        if (!data.password) {
            errors.password = 'وارد کردن رمز عبور الزامی است';
        } else if (data.password.length < 8) {
            errors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک حرف بزرگ باشد';
        } else if (!/[a-z]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک حرف کوچک باشد';
        } else if (!/[0-9]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک عدد باشد';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک کاراکتر خاص باشد';
        }

    }
    if (type == 'login') {

        if (!data.name.trim()) {
            errors.name = 'وارد کردن نام الزامی است';
        } else if (data.name.length < 2) {
            errors.name = 'نام باید حداقل ۲ کاراکتر باشد';
        } else if (/[^a-zA-Zا-ی\s]/.test(data.name)) {
            errors.name = 'نام باید فقط شامل حروف باشد';
        }
        // Password Validation
        if (!data.password) {
            errors.password = 'وارد کردن رمز عبور الزامی است';
        } else if (data.password.length < 8) {
            errors.password = 'رمز عبور باید حداقل ۸ کاراکتر باشد';
        } else if (!/[A-Z]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک حرف بزرگ باشد';
        } else if (!/[a-z]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک حرف کوچک باشد';
        } else if (!/[0-9]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک عدد باشد';
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
            errors.password = 'رمز عبور باید حداقل شامل یک کاراکتر خاص باشد';
        }
    }
    return errors;
};