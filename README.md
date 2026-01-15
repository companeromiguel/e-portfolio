# Miguel Compañero - Portfolio

A modern, interactive portfolio website built with Next.js 15, featuring parallax effects, 3D card interactions, and a green aesthetic design.

## Features

- ✨ Parallax scrolling background with floating animated orbs
- 🎴 Interactive 3D rotating card with mouse/touch controls
- 📱 Fully responsive design for all devices
- 🎥 Video modal for project demonstrations
- 🔗 Direct links to live projects
- 📄 Resume viewer with download option
- 🎨 Liquid glass hover effects on cards
- 🌐 SEO optimized with meta tags and sitemap
- ⚡ Fast performance with Next.js optimization
- 🎯 Scroll animations for smooth user experience

## Tech Stack

- **Framework:** Next.js 15
- **Styling:** Tailwind CSS v4
- **Language:** TypeScript
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/companeromiguel/e-portfolio.git
cd e-portfolio/parallax-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Deployment

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Set root directory to `parallax-portfolio`
4. Deploy!

## Customization

### Update Personal Information

- Edit `app/page.tsx` to update your name, bio, and projects
- Replace images in `/public` folder with your own
- Update contact links in the footer and contact section

### Add New Projects

Add new project cards in the Projects section of `app/page.tsx`:

```tsx
<div className="glass-card p-5 sm:p-6 space-y-3 sm:space-y-4">
  <div className="aspect-video bg-slate-800/50 rounded-lg">
    <Image src="/your-image.png" alt="Project" fill />
  </div>
  <h3>Project Title</h3>
  <p>Project description</p>
</div>
```

### Change Colors

The green theme can be customized in `app/globals.css`:
- Background gradients: Search for `rgba(34, 197, 94, ...)` 
- Replace with your preferred color values

## File Structure

```
parallax-portfolio/
├── app/
│   ├── page.tsx          # Main homepage
│   ├── layout.tsx        # Root layout with metadata
│   ├── globals.css       # Global styles and animations
│   ├── resume/
│   │   └── page.tsx      # Resume viewer page
│   ├── sitemap.ts        # SEO sitemap
│   ├── robots.ts         # Robots.txt configuration
│   ├── manifest.ts       # PWA manifest
│   ├── error.tsx         # Error boundary
│   ├── loading.tsx       # Loading state
│   └── not-found.tsx     # 404 page
├── public/
│   ├── portfolio.png     # Profile image
│   ├── resume.png        # Resume image
│   ├── vidvid.mp4        # Card back video
│   └── [project images]  # Project thumbnails
└── package.json
```

## Performance Optimizations

- Next.js Image component for optimized images
- Lazy loading for videos
- CSS animations with GPU acceleration
- Minimal JavaScript bundle size
- Static generation where possible

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

© 2025 Miguel Compañero. All rights reserved.

## Contact

- Email: companeromiguel5@gmail.com
- LinkedIn: [companero-migs-23469vc](https://www.linkedin.com/in/companero-migs-23469vc)
- GitHub: [companeromiguel](https://github.com/companeromiguel)
