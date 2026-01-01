# Portfolio Website

**Rabindra Biswal** — Senior QA Automation Engineer

A modern, performant portfolio built with Next.js 14, TypeScript, and Framer Motion.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** SCSS/CSS Modules
- **Animation:** Framer Motion
- **Forms:** EmailJS
- **Testing:** Playwright
- **SEO:** Next.js Metadata API, JSON-LD

---

## ⚙️ Environment Variables

Create a `.env.local` file:

```env
# Required
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Optional (for contact form)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

---

## 📦 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Next.js pages and API routes
├── sections/      # Page sections (Hero, About, Experience, etc.)
├── scss/          # Global styles and component styles
└── utils/         # Utility functions and context
```

---

## ✨ Features

- ⚡ **Performance optimized** with Next.js 14
- 📱 **Fully responsive** design
- 🎨 **Smooth animations** using Framer Motion
- 🔍 **SEO-friendly** with comprehensive metadata
- 📧 **Contact form** integration with EmailJS
- 🎯 **TypeScript** for type safety
- 🧪 **E2E testing** with Playwright
- ♿ **Accessible** with ARIA labels and semantic HTML

---

## � Deployment to GitHub Pages

### Initial Setup

1. **Update repository name in next.config.js** (if different):

   ```javascript
   basePath: '/your-repo-name'
   assetPrefix: '/your-repo-name/'
   ```

2. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rabindra-biswal.git
   git push -u origin main
   ```

3. **Enable GitHub Pages:**

   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

4. **Deploy:**
   - The workflow will automatically run on every push to `main`
   - Or manually trigger: **Actions** → **Deploy to GitHub Pages** → **Run workflow**

Your site will be live at: `https://YOUR_USERNAME.github.io/rabindra-biswal/`

---

## �📝 License

MIT License - feel free to use this project for your own portfolio.

---

## 🔗 Connect

- LinkedIn: [Rabindra Biswal](https://linkedin.com/in/rabindra-biswal)
- GitHub: [@rabindra-biswal](https://github.com/rabindra-biswal)
