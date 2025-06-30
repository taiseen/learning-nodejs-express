
const loginPage = (req, res) => {
    res.render('admin/login', { layout: false });
}

const adminLogin = (req, res) => { }

const logout = (req, res) => {}

const dashboard = (req, res) => {
     res.render('admin/dashboard');
}

const settings = (req, res) => {
    res.render('admin/settings');
}

const saveSettings = (req, res) => {}


const allUser = (req, res) => {
    res.render('admin/users');
}

const addUserPage = (req, res) => {
    res.render('admin/users/create');
}

const addUser = (req, res) => {
    res.redirect('admin/users');
}

const updateUserPage = (req, res) => {
    res.render('admin/users/update');
}

const updateUser = (req, res) => {
    res.redirect('/users');
}

const deleteUser = (req, res) => {}


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
