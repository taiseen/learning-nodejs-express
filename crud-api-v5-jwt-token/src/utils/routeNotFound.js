const routeNotFound = (req, res) => {

    const responseData = {
        status: false,
        message: 'Api Route Not Found! 🔴',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found! 🔴',
            },
        ],
    };

    res.status(404).json(responseData);

};

export default routeNotFound;