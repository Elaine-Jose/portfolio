# Elaine Jose — AI & Software Engineering Portfolio

A premium, production-ready portfolio website built with React 19, TypeScript, TailwindCSS, Framer Motion, Three.js, and GSAP.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Tech Stack

- **React 19** + **Vite** + **TypeScript**
- **TailwindCSS** + **shadcn/ui**
- **Framer Motion** + **GSAP** animations
- **React Three Fiber** particle background
- **React Router** for navigation
- **EmailJS** contact form
- **GitHub REST API** live stats

## Configuration

All content is data-driven via `src/data/portfolio-data.json`. Update this file to change any text, links, projects, or personal information.

### EmailJS Setup

1. Create an account at [emailjs.com](https://www.emailjs.com/)
2. Create a service, template, and get your public key
3. Update `contact.emailjs` in `portfolio-data.json`

### Resume

Place your resume PDF at `public/resume/elaine-jose-resume.pdf`

## Deployment

### Vercel
```bash
npm run build
# Deploy via Vercel CLI or connect GitHub repo
```

### Netlify
```bash
npm run build
# Deploy dist/ folder or connect GitHub repo
```

### GitHub Pages
```bash
npm run build
# Set base in vite.config.ts to your repo name
# Deploy dist/ to gh-pages branch
```

## Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable UI components
├── contexts/        # React Context providers
├── data/            # portfolio-data.json
├── hooks/           # Custom React hooks
├── layout/          # Navbar, Footer, MainLayout
├── lib/             # Utilities and data loaders
├── pages/           # Page components
├── sections/        # Page sections (Hero, About, etc.)
├── services/        # API services (GitHub, EmailJS)
├── styles/          # Global CSS
└── types/           # TypeScript interfaces
```

## License

MIT
