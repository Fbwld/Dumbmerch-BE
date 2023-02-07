const nodemailer = require("nodemailer");

exports.sendEmail = (dataEmail) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.SYSTEM_EMAIL,
            pass: process.env.SYSTEM_PASSWORD,
        },
        tls: {
        rejectUnauthorized: false,
        },
    });
    
    transporter
        .sendMail(dataEmail)
        .then((info) => console.log(`Email Telah Terkirim ${info.message}`))
        .catch((err) => console.log(`Terjadi kesalahan ${err}`));
    };