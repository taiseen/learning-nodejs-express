
const loginPage = (req, res) => {
    console.log('🟢🟢🟢 Login Page');
    res.render('login', { error: null });
}

const adminLogin = (req, res) => {
    res.redirect('/dashboard');
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

const dashboard = (req, res) => {
    res.render('dashboard');
}

const settings = (req, res) => {
    res.render('settings');
}

const saveSettings = (req, res) => {
    res.redirect('/settings');
}


const allUser = (req, res) => {
    res.render('users');
}

const addUserPage = (req, res) => {
    res.render('add-user');
}

const addUser = (req, res) => {
    res.redirect('/users');
}

const updateUserPage = (req, res) => {
    res.render('update-user');
}

const updateUser = (req, res) => {
    res.redirect('/users');
}

const deleteUser = (req, res) => {
    res.redirect('/users');
}


// Export all functions as named exports
export {
    updateUserPage,
    saveSettings,
    addUserPage,
    updateUser,
    deleteUser,
    adminLogin,
    loginPage,
    dashboard,
    settings,
    addUser,
    allUser,
    logout,
}
