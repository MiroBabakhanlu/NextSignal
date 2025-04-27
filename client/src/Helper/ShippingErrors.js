export const validate = (data) => {
    const errors = {};

    // اعتبارسنجی نام
    if (!data.firstName) {
        errors.firstName = 'نام الزامی است';
    } else if (data.firstName.length < 2) {
        errors.firstName = 'نام باید حداقل ۲ کاراکتر باشد';
    }

    // اعتبارسنجی نام خانوادگی
    if (!data.lastName) {
        errors.lastName = 'نام خانوادگی الزامی است';
    } else if (data.lastName.length < 2) {
        errors.lastName = 'نام خانوادگی باید حداقل ۲ کاراکتر باشد';
    }

    // اعتبارسنجی منطقه
    if (!data.area) {
        errors.area = 'منطقه الزامی است';
    }

    // اعتبارسنجی محله
    if (!data.neighbourhood) {
        errors.neighbourhood = 'محله الزامی است';
    }

    // اعتبارسنجی خیابان
    if (!data.street) {
        errors.street = 'خیابان الزامی است';
    }

    // اعتبارسنجی کوچه
    if (!data.alleys) {
        errors.alleys = 'کوچه الزامی است';
    }

    // اعتبارسنجی کد پستی
    if (!data.postalCode) {
        errors.postalCode = 'کد پستی الزامی است';
    } else if (!/^\d{5,10}$/.test(data.postalCode)) {
        errors.postalCode = 'کد پستی باید بین ۵ تا ۱۰ رقم باشد';
    }

    // اعتبارسنجی شماره تلفن
    if (!data.phoneNumber) {
        errors.phoneNumber = 'شماره تلفن الزامی است';
    } else if (!/^(\+?\d{1,4}[-.\s]?)?(\d{10})$/.test(data.phoneNumber)) {
        errors.phoneNumber = 'شماره تلفن نامعتبر است';
    }

    // اعتبارسنجی پلاک
    if (!data.plaque) {
        errors.plaque = 'پلاک الزامی است';
    }

    return errors;
};
