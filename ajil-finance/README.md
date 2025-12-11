# Ajil Finance Website

A modern, impressive website for Abdul Latif Jameel Finance (عبداللطيف جميل للتمويل) built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

## 🚀 Features

### Design & UI/UX
- **Modern Glassmorphism Design** - Beautiful frosted glass effects throughout
- **Advanced Animations** - Powered by Framer Motion with parallax, scroll-triggered animations, and micro-interactions
- **Particle Effects** - Dynamic particle animations in the hero section
- **3D Elements** - Floating cards and 3D transformations
- **RTL Support** - Full Arabic and English support with automatic direction switching
- **Responsive Design** - Mobile-first approach with beautiful mobile experience
- **Accessibility** - Font size controls, keyboard navigation, and screen reader support

### Sections
- **Hero** - Stunning gradient background with floating particles and interactive financing calculator
- **Services** - Glassmorphism cards with hover effects showcasing financing options
- **Offers** - Auto-playing slider with thumbnails for promotional offers
- **Statistics** - Animated counters with parallax background
- **News** - News cards with image zoom effects and category labels
- **App Download** - Animated phone mockup with floating elements
- **Newsletter** - Interactive subscription form with validation and feedback

### Technical Features
- **Next.js 14** - App Router with Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Custom design system with brand colors
- **Framer Motion** - Advanced animations and gestures
- **Supabase Integration** - Ready for newsletter, contact forms, and financing applications
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Performance Optimized** - Image optimization, lazy loading, and code splitting

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   cd ajil-finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Then edit `.env.local` with your Supabase credentials.

4. **Set up Supabase (Optional)**
   - Create a new Supabase project at https://supabase.com
   - Run the SQL schema from `supabase-schema.sql` in the SQL editor
   - Copy your project URL and anon key to `.env.local`

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ajil-finance/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and custom CSS
│   │   ├── layout.tsx           # Root layout with providers
│   │   └── page.tsx             # Home page
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx       # Navigation header
│   │   │   └── Footer.tsx       # Site footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Hero with calculator
│   │   │   ├── Services.tsx     # Services grid
│   │   │   ├── Offers.tsx       # Offers slider
│   │   │   ├── Statistics.tsx   # Stats with counters
│   │   │   ├── News.tsx         # News grid
│   │   │   ├── AppDownload.tsx  # Mobile app section
│   │   │   └── Newsletter.tsx   # Newsletter subscription
│   │   └── providers/
│   │       └── I18nProvider.tsx # Language context
│   ├── hooks/
│   │   └── useScrollAnimation.ts # Scroll animation hooks
│   ├── lib/
│   │   ├── i18n.ts              # Translations
│   │   └── supabase.ts          # Supabase client
│   └── types/
│       └── database.ts          # TypeScript types
├── public/
│   └── images/                  # Static images
├── supabase-schema.sql          # Database schema
├── tailwind.config.ts           # Tailwind configuration
└── package.json
```

## 🎨 Customization

### Brand Colors
Edit `tailwind.config.ts` to change the brand colors:

```typescript
colors: {
  primary: {
    500: '#0066b3',  // Main blue
    // ...
  },
  secondary: {
    500: '#f7941d',  // Orange accent
    // ...
  },
}
```

### Translations
Add or modify translations in `src/lib/i18n.ts`:

```typescript
export const translations = {
  ar: { /* Arabic translations */ },
  en: { /* English translations */ },
}
```

### Animations
Custom animations are defined in `tailwind.config.ts` under the `animation` and `keyframes` sections.

## 📱 Pages to Add

The current implementation includes the home page. Additional pages to consider:
- `/apply` - Financing application form
- `/individuals/*` - Individual financing pages
- `/business/*` - Business financing pages
- `/offers` - All offers page
- `/news` - News listing page
- `/news/[slug]` - Individual news article
- `/about/*` - About us pages
- `/contact` - Contact page
- `/login` - Customer login

## 🔧 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 License

This project is proprietary and confidential. All rights reserved by Abdul Latif Jameel Finance.

## 🤝 Contributing

For internal development only. Please follow the established code style and create pull requests for review.

---

Built with ❤️ for Abdul Latif Jameel Finance
