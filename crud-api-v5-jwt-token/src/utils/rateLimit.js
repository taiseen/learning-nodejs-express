import rateLimit from "express-rate-limit";

const limiter = rateLimit({
    windowMs: 1000 * 60,
    max: 5,
    message: "Too many request from this IP, please try again later."
});

export default limiter;