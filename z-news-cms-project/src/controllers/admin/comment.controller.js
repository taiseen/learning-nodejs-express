
const allComments = (req, res) => {
    res.render('admin/comments', { role: req.role });
}

export { allComments }