export const home = (req, res) => {

    const home = `Home Page`;

    // const { userName } = req.cookies; // unsigned cookies
    const { userName } = req.signedCookies;

    return !userName
        ? res.send(`${home} : No cookie found`)
        : res.send(`${home} : Cookie found: ${userName}`);
}



export const setCookie = (req, res) => {

    const cookieTime = 1000 * 60 * 15; // 15 minutes

    // ✅✅✅ cookie create + store in user browser...
    res.cookie('userName', 'Taiseen',
        {
            maxAge: cookieTime,
            httpOnly: true, // The cookie only accessible by the web server
            signed: true, // signed cookie system on

            // secure: true, // https
            // sameSite: 'strict' // is request come from same server or not
        }
    )

    // cookie send with response-header
    res.send(`Cookie has been set ✅`);
}



export const getCookie = (req, res) => {

    // const { userName } = req.cookies; // unsigned cookies
    const { userName } = req.signedCookies;

    return !userName
        ? res.send(`No cookie found`)
        : res.send(`Cookie found: ${userName}`);
}



export const removeCookie = (req, res) => {

    // ✅✅✅ cookie remove from user browser...
    // delete cookies form user browser by hit this route

    // res.clearCookie('userName'); // unsigned cookies

    // signed cookies
    res.clearCookie('userName', { signed: true });

    // cookie send with response-header
    res.send(`Cookie has been removed ❌`);
}