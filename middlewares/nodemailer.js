const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS
    }
});

// Send the email
const sendMail = (email, code, title, message) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: `${title}`,
        html: `
            <div style="border: 1px solid #ccc; padding: 20px; border-radius: 5px; width:fit-content; margin: auto; background: #f1f5f9;">
                <h4 style="font-style: italic;">${message}</h4>
                <h1>${code}</h1>
            </div>
        `
    },
    (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }}
    );
}

const sendMailFromUserToTeam = (message) => {
    transporter.sendMail({
        from: message.email,
        to: process.env.EMAIL,
        subject: `رسالة من ${message.name}`,
        html: `
            <div style="border: 1px solid #ccc; direction: rtl ; padding: 20px; border-radius: 5px; width:fit-content; margin: auto; background: #f1f5f9;">
                <div style="font-size: 20px;"><span style="font-size: 22px; color: red;">الإسم : </span>${message.name}</div>
                <div style="font-size: 20px;"><span style="font-size: 22px; color: red;">البريد الالكتروني : </span><a href='mailto:${message.email}'>${message.email}</a></div>
                <div style="font-size: 20px;"><span style="font-size: 22px; color: red;">الرسالة : </span>${message.message}</div>
            </div>
        `
    },
    (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }}
    );
}

const sendMailPayment = (email, title, message) => {
    transporter.sendMail({
        from: process.env.EMAIL,
        to: `${email}`,
        subject: `${title}`,
        html: `
            <div style="direction: rtl; border: 1px solid #ccc; padding: 20px; border-radius: 5px; width:fit-content; margin: auto; background: #f1f5f9;">
                <h3 style="font-style: italic;">${message}</h3>
            </div>
        `
    },
    (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }}
    );
}

exports.sendMailFromUserToTeam = sendMailFromUserToTeam;
exports.sendMailPayment = sendMailPayment;
module.exports = sendMail;