
export const getUserName = (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
}



export const setSession = (req, res) => {

    // ✅✅✅ session created here...
    // & session is temporary data that stored in memory. 
    // if server restart then session will be lost.
    // so we need to store session in database.
    // by this session we can track/check user in other routes...
    req.session.userName = "Taiseen"; // you can set any value here.

    res.send('<h1>Username has been set in session.</h1>');
}



export const getSessionGetPage = (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
}



export const getSessionAboutPage = (req, res) => {

    req.session.userName
        ? res.send(`<h1>Username from session is : ${req.session.userName}</h1>`)
        : res.send('<h1>No username found in session.</h1>');
}



export const destroySession = (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            res.status(500).send('Failed to destroy session... ' + err.message);
        }

        res.send('<h1>Session destroy successfully.</h1>');
    })
}