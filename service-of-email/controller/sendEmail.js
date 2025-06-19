import transporter from "../mail/transporter.js";
import path from 'path';
import url from 'url';


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const sendEmail = async (req, res) => {

    const { to, subject, text } = req.body

    // const template = fs.readFile('./views/email-template.ejs')
    // const html = ejs.render(template, {name: 'John'})

    try {

        const mailStructure = {
            from: '"Test Email" <testemail@gmail.com>',
            to: to,
            subject: subject,
            text: text,
            // html: '<b>Hello Message</b>',
            // html: html,
            attachments: [
                {
                    filename: 'aws-data.pdf',
                    path: path.join(__dirname, 'files', 'aws-data.pdf')
                }
            ]
        }

        const info = await transporter.sendMail(mailStructure);

        res.json({ message: '✅ Email Send Successfully', info });

    } catch (error) {

        res.status(500).json({ message: '🔴 Failed to send email', error });
    }
}


export default sendEmail;