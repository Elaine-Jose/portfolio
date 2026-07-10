import { useState } from 'react'
import { Mail, MapPin, Github, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { usePortfolio } from '@/contexts/PortfolioContext'
import { SectionHeading } from '@/components/SectionHeading'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { sendContactEmail } from '@/services/email'

export function Contact() {
  const { data } = usePortfolio()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const result = await sendContactEmail(formData, data.contact.emailjs)

    if (result.success) {
      setStatus('success')
      setStatusMessage(result.message)
      setFormData({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
      setStatusMessage(result.message)
    }

    setTimeout(() => setStatus('idle'), 5000)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading title="Get In Touch" subtitle={data.contact.headline} />

        <div className="grid lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <ScrollReveal direction="left" className="lg:col-span-2">
            <div className="space-y-6">
              <p className="text-white/50 leading-relaxed">{data.contact.subheadline}</p>

              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: 'Email',
                    value: data.personal.email,
                    href: `mailto:${data.personal.email}`,
                  },
                  {
                    icon: MapPin,
                    label: 'Location',
                    value: `${data.personal.location.city}, ${data.personal.location.state}, ${data.personal.location.country}`,
                  },
                  {
                    icon: Github,
                    label: 'GitHub',
                    value: data.personal.github.username,
                    href: data.personal.github.url,
                  },
                  {
                    icon: Linkedin,
                    label: 'LinkedIn',
                    value: 'elainejose',
                    href: data.personal.linkedin.url,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('mailto') ? undefined : '_blank'}
                          rel="noopener noreferrer"
                          className="text-sm text-white/70 hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-white/70">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="lg:col-span-3">
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                  />
                </div>

                {status !== 'idle' && (
                  <div
                    className={`flex items-center gap-2 p-3 rounded-lg text-sm ${
                      status === 'success'
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                        : status === 'error'
                          ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                          : 'bg-primary/10 text-primary border border-primary/20'
                    }`}
                  >
                    {status === 'success' && <CheckCircle className="h-4 w-4" />}
                    {status === 'error' && <AlertCircle className="h-4 w-4" />}
                    {status === 'sending' ? 'Sending...' : statusMessage}
                  </div>
                )}

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  disabled={status === 'sending'}
                >
                  <Send className="h-5 w-5" />
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
