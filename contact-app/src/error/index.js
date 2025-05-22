export const globalErrorHandler = (err, req, res, next) => {
    console.log('🔴🔴🔴');
    console.error(err.stack);
    res.status(500).render('500', { message: 'Something went wrong on the server.' });
};
