const createError = (status = 500, message = '') => {

    const errorList = {
        400: 'Bad Request...',
        401: message ?? '🚫 You Are Unauthorized...',
        403: 'Forbidden...',
        404: `🔎 ${message} Not Found...`,
        500: 'Internal Server Error...'
    };

    const errorSms = errorList[status];

    const error = new Error(errorSms);
    error.status = status;
    return error;
}

export default createError;