import sendgrid from '@sendgrid/mail'

declare global {
    var sendEmailToken: (email: string, token: string) => Promise<void>
}

export default class email {
    async sendEmailToken() {
        if (!process.env.SENDGRID_API_KEY) {
            console.log(
                `The SENDGRID_API_KEY env var must be set, otherwise the API won't be able to send emails.`,
                `Using debug mode which logs the email tokens instead.`,
            )
            return debugSendEmailToken
        } else {
            sendgrid.setApiKey(process.env.SENDGRID_API_KEY)
            return sendEmailToken
        }
    }
}

async function sendEmailToken(email: string, token: string) {
    const msg = {
        to: email,
        from: 'EMAIL_ADDRESS_CONFIGURED_IN_SEND_GRID@email.com',
        subject: 'Login token for the modern backend API',
        text: `The login token for the API is: ${token}`,
    }
    await sendgrid.send(msg)
}


async function debugSendEmailToken(email: string, token: string) {
    console.log(`email token for ${email}: ${token} `)
}