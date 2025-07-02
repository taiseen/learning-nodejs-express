import UserModel from "../../models/user.model.js";

const loginPage = (req, res) => {
    res.render('admin/login', { layout: false });
}

const adminLogin = (req, res) => { }

const logout = (req, res) => { }

const dashboard = (req, res) => res.render('admin/dashboard');

const settings = (req, res) => res.render('admin/settings');

const saveSettings = (req, res) => { }


const allUser = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.render('admin/users', { users });
    } catch (error) {
        console.log('allUser:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
}


const addUserPage = (req, res) => res.render('admin/users/create')


const addUser = async (req, res) => {
    await UserModel.create(req.body);
    res.redirect('/admin/users');
}


const updateUserPage = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render('admin/users/update', { user });
    } catch (error) {
        console.log('updateUserPage:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
};


const updateUser = async (req, res) => {
    const id = req.params.id;

    const { fullname, role, password } = req.body;

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.fullname = fullname || user.fullname;
        user.role = role || user.role;
        if (password) {
            user.password = password;
        }

        await user.save();

        res.redirect('/admin/users');
    } catch (error) {
        console.log('updateUser:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }

};


const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json({ success: true });
    } catch (error) {
        console.log('deleteUser:- 🔴', error);
        res.status(500).send('Internal Server Error');
    }
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
