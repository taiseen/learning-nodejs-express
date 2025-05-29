export const globalErrorHandler = (err, req, res, next) => {
    console.log('🔴🔴🔴');
    console.error(err.stack);
    
    // server side coding bug - error happen
    
    // ✅ error show by [ejs template] at browser UI
    res.status(500).render('500', { message: '💥 Something went wrong on the server.' });
    
    // error show by a JSON response
    // res.status(500).send({ message: '💥 Something went wrong on the server.' });
};
