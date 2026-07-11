import emailjs from '@emailjs/browser'

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Initialize EmailJS once on module load
let isInitialized = false

function initializeEmailJS(publicKey: string) {
  if (!isInitialized && publicKey && publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
    emailjs.init({
      publicKey: publicKey,
    })
    isInitialized = true
  }
}

export async function sendContactEmail(
  formData: ContactFormData,
  config: { serviceId: string; templateId: string; publicKey: string }
): Promise<{ success: boolean; message: string }> {
  try {
    if (config.publicKey === 'YOUR_EMAILJS_PUBLIC_KEY') {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return {
        success: true,
        message: 'Message sent successfully!',
      }
    }

    // Initialize EmailJS
    initializeEmailJS(config.publicKey)

    const result = await emailjs.send(
      config.serviceId,
      config.templateId,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'elainejose2246@gmail.com',
      }
    )

    if (result.status === 200) {
      return { success: true, message: 'Message sent successfully!' }
    }
    
    return {
      success: false,
      message: 'Failed to send message. Please try again or email directly.',
    }
  } catch (error) {
    console.error('EmailJS error:', error)
    return {
      success: false,
      message: 'Failed to send message. Please try again or email directly.',
    }
  }
}
