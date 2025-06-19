import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'yourEmail@gmail.com',
        pass: 'yourPassword'
    }
})


export default transporter;