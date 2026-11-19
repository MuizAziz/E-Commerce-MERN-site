const nodemailer = require('nodemailer')

const sendEmail = async (to , subject , text) => {
    try {
     //   Transporter basically email bhejne ka setup hai.
        const transporter = nodemailer.createTransport({
            service : 'Gmail',
            // sender account ki credentials
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }
        })
        const mailOptions = {
            from : process.env.EMAIL_USER,
            to,
            subject,
            text
        }
        // actual email send krny ka operation
        await transporter.sendMail(mailOptions)
    } catch (error) {
       console.log(error.message)
    }
}

module.exports = sendEmail