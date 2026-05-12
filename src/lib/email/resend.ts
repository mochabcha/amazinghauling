interface SendResendEmailArgs {
  from: string
  to: string[]
  subject: string
  html: string
  text: string
  replyTo?: string
  errorContext: string
}

export async function sendResendEmail(args: SendResendEmailArgs) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('Missing RESEND_API_KEY.')
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: args.from,
      to: args.to,
      reply_to: args.replyTo,
      subject: args.subject,
      html: args.html,
      text: args.text,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Resend ${args.errorContext} email error ${response.status}: ${errorText}`)
  }
}
