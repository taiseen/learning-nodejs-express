const isAdmin = (req, res, next) => {

    // when non-admin user try to access or hit admin routes
    // then fire this middleware...

    req.role === 'admin'
        ? next()
        : res.redirect('/admin/dashboard');

}

export default isAdmin;