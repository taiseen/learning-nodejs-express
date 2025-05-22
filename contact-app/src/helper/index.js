import mongoose from 'mongoose';

export const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

export const renderError = (res, statusCode, view, message) => {
    res.status(statusCode).render(view, { message });
};

export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
