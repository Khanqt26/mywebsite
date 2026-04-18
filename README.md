# Portfolio Website — Build Plan & Checklist

> **How to use this file:**
> Open this in VS Code alongside your project. Work through each task top to bottom.
> Check off tasks with `[x]` as you complete them. You can ask your AI assistant:
> *"I'm on task X — help me implement this"* and it will have full context.

---

## ✅ BUILD COMPLETE - Ready for Deployment!

**Status:** All core functionality implemented and tested
- ✅ **Build:** `npm run build` passes successfully  
- ✅ **Linting:** `npm run lint` passes with no errors
- ✅ **Dependencies:** Framer Motion & Firebase installed
- ✅ **Components:** All sections implemented with animations
- ✅ **Features:** Portfolio filtering, real-time testimonials, contact form

**Ready for Phase 6:** Polish & Launch (optional enhancements)

---

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Real-time DB | Firebase Firestore |
| Serverless API | Vercel API Routes (`/app/api/`) |
| Telegram | Telegram Bot API |
| Hosting | Vercel (auto-deploy from GitHub) |

---

## Phase 1 — Project Setup
**Goal:** Get a running Next.js project deployed on Vercel before writing any UI.
**Timeline:** Days 1–3

### 1.1 Initialize the project
- [x] Run `npx create-next-app@latest portfolio --typescript --tailwind --eslint --app`
- [x] Open project in VS Code: `cd portfolio && code .`
- [x] Start dev server: `npm run dev` -> confirm it loads at `http://localhost:3000`
- [x] Delete the default boilerplate in `app/page.tsx` — replace with a blank `<main>` tag

### 1.2 Folder structure
- [x] Create the following folders inside the project root:
  ```
  /app
    /api
      /contact        ← Telegram serverless route (Phase 5)
  /components
    /sections         ← Hero, About, Education, Portfolio, Testimonials, Contact, Footer
    /ui               ← Reusable small components (Button, Card, Badge, etc.)
  /data
    projects.json     ← Your portfolio projects data
  /public
    /images           ← Project thumbnails, profile photo
  /lib
    firebase.ts       ← Firebase init (Phase 4)
  ```
- [x] Create placeholder files (empty exports) for each section component so imports don't break early

### 1.3 Design tokens
- [x] In `tailwind.config.ts`, extend the theme with your colors, e.g.:
  ```js
  colors: {
    primary: '#your-accent-color',
    dark: '#111111',
    muted: '#6b7280',
  }
  ```
- [x] Choose and import 2 Google Fonts in `app/layout.tsx` (one display font, one body font)
- [x] Set base font, background color, and text color in `app/globals.css`

### 1.4 GitHub + Vercel deploy
- [x] Create a new GitHub repo and push the project: `git init && git add . && git commit -m "init" && git push`
- [x] Go to [vercel.com](https://vercel.com) -> New Project -> Import from GitHub
- [x] Confirm the project deploys successfully - you now have a live URL
- [x] Test that pushing to `main` triggers an automatic redeploy

---

## Phase 2 — Static Sections + Animations
**Goal:** Build Hero, About, Education, Navbar, and Footer with scroll animations.
**Timeline:** Days 4–7

### 2.1 Navbar
- [x] Fixed position at top (`position: fixed, top: 0, z-50`)
- [x] Nav links: Home, About, Work, Testimonials, Contact
- [x] On click, smooth-scroll to the target section using `scrollIntoView({ behavior: 'smooth' })`
- [x] Highlight the active link based on scroll position (use `IntersectionObserver`)
- [x] Mobile: hide links on small screens, show a hamburger menu icon
- [x] Hamburger toggles a dropdown/drawer with all nav links
- [x] Add Navbar to `app/layout.tsx` so it appears on all pages

### 2.2 Framer Motion setup
- [x] Install: `npm install framer-motion`
- [x] Create a reusable `components/ui/FadeInSection.tsx` component:
  ```tsx
  // Wraps any section and fades+slides it in when scrolled into view
  // Usage: <FadeInSection><YourSection /></FadeInSection>
  // Uses Framer Motion's whileInView and viewport={{ once: true }}
  // Animate: opacity 0→1, y 40→0, duration 0.6s, ease easeOut
  ```
- [x] Test it by wrapping a `<p>` tag — confirm it animates on scroll

### 2.3 Hero section
- [x] Create `components/sections/Hero.tsx`
- [x] Content: Your name (large heading), your title/role, a short tagline, two CTA buttons
  - Button 1: "View My Work" → scrolls to `#portfolio`
  - Button 2: "Contact Me" → scrolls to `#contact`
- [x] Entrance animation: stagger each element (name, role, tagline, buttons) with increasing `delay`
- [x] Add a typewriter effect to the title/role text (use `framer-motion` or a small library like `typewriter-effect`)
- [x] Wrap in `<FadeInSection>` (or handle animation internally)

### 2.4 About Me section
- [x] Create `components/sections/About.tsx`
- [x] Add section id: `<section id="about">`
- [x] Layout: two columns — left: profile photo, right: bio text + skills
- [x] Profile photo: circular crop, loaded from `/public/images/profile.jpg`
- [x] Bio: 3–4 sentences about who you are and what you do
- [x] Skills: a grid of tech/tool badges (e.g. React, Figma, Node.js)
- [x] Wrap in `<FadeInSection>`

### 2.5 Education & Background section
- [x] Create `components/sections/Education.tsx`
- [x] Add section id: `<section id="education">`
- [x] Layout: vertical timeline
- [x] Each timeline item: school name, degree, graduation year, short description
- [x] Use a left border line + dot marker for the timeline visual
- [x] Animate each item in sequence with staggered `delay` in Framer Motion
- [x] Wrap in `<FadeInSection>`

### 2.6 Footer
- [x] Create `components/sections/Footer.tsx`
- [x] Content: your name, copyright year, social links (GitHub, LinkedIn, etc.)
- [x] Social links open in a new tab
- [x] Keep it simple — one row, centered or split

### 2.7 Wire everything into app/page.tsx
- [x] Import and render all sections in order:
  ```tsx
  <Navbar />
  <Hero />
  <About />
  <Education />
  {/* Portfolio — Phase 3 */}
  {/* Testimonials — Phase 4 */}
  {/* Contact — Phase 5 */}
  <Footer />
  ```
- [x] Confirm the full page scrolls correctly and all animations trigger

---

## Phase 3 — Portfolio Section
**Goal:** Display your projects in a filterable card grid.
**Timeline:** Days 8–10

### 3.1 Project data file
- [x] Create `/data/projects.json` with this structure:
  ```json
  [
    {
      "id": "1",
      "title": "Project Name",
      "description": "Short description of what this project does.",
      "tags": ["React", "Firebase"],
      "image": "/images/project-1.jpg",
      "url": "https://your-project-url.com",
      "featured": true
    }
  ]
  ```
- [x] Add at least 3 projects with real or placeholder images in `/public/images/`

### 3.2 Project card component
- [x] Create `components/ui/ProjectCard.tsx`
- [x] Props: `title`, `description`, `tags`, `image`, `url`
- [x] Card layout: image on top, title + description below, tag badges at bottom, link button
- [x] Hover effect: lift with `box-shadow` and `scale(1.02)` using Framer Motion `whileHover`
- [x] Tags rendered as small colored badges

### 3.3 Portfolio section
- [x] Create `components/sections/Portfolio.tsx`
- [x] Add section id: `<section id="portfolio">`
- [x] Import projects from `/data/projects.json`
- [x] Render a `ProjectCard` for each project in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- [x] Add filter buttons above the grid (one button per unique tag + "All")
- [x] On filter click, show only cards with that tag using `useState`
- [x] Animate grid changes with Framer Motion `AnimatePresence`
- [x] Wrap in `<FadeInSection>`

---

## Phase 4 — Real-Time Testimonials
**Goal:** Visitors can type and submit testimonials that appear live for everyone.
**Timeline:** Days 11–14

### 4.1 Firebase setup
- [x] Go to [console.firebase.google.com](https://console.firebase.google.com) → Create a new project
- [x] Enable **Firestore Database** → Start in test mode (you'll lock it down later)
- [x] Go to Project Settings → Your apps → Add a Web app
- [x] Copy the Firebase config object
- [x] Install Firebase: `npm install firebase`
- [x] Create `/lib/firebase.ts`:
  ```ts
  import { initializeApp } from 'firebase/app';
  import { getFirestore } from 'firebase/firestore';

  const firebaseConfig = {
    // paste your config here
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);
  ```
- [x] Add your Firebase config values to `.env.local`:
  ```
  NEXT_PUBLIC_FIREBASE_API_KEY=...
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
  ```
- [x] Update `firebase.ts` to read from `process.env.NEXT_PUBLIC_*`

### 4.2 Testimonials display
- [x] Create `components/ui/TestimonialCard.tsx`
- [x] Props: `name`, `message`, `date`
- [x] Card layout: quote icon, message text, author name + date at bottom

- [x] In `components/sections/Testimonials.tsx`:
  - [x] Add section id: `<section id="testimonials">`
  - [x] Use `onSnapshot` from Firestore to listen for real-time updates:
    ```ts
    // Listen to 'testimonials' collection, ordered by createdAt desc
    // Update local state whenever documents change
    ```
  - [x] Render all testimonials in a responsive card grid or horizontal scroll
  - [x] Show a loading skeleton while data first loads
  - [x] Wrap in `<FadeInSection>`

### 4.3 Testimonial submission form
- [x] Below the testimonials grid, add a form with two fields:
  - Your name (text input)
  - Your testimonial (textarea)
- [x] Use `useState` to track `name` and `message`
- [x] Add a **live preview card** that mirrors the inputs in real time as the user types
- [x] On submit:
  - [x] Validate: both fields required, message at least 10 characters
  - [x] Write to Firestore `testimonials` collection:
    ```ts
    await addDoc(collection(db, 'testimonials'), {
      name,
      message,
      createdAt: serverTimestamp(),
    });
    ```
  - [x] Clear the form
  - [x] Show a brief "Thank you!" success message
- [x] The new testimonial should appear in the list automatically via `onSnapshot` — no page reload

---

## Phase 5 — Contact Form + Telegram Bot
**Goal:** Contact form submissions arrive directly in your Telegram.
**Timeline:** Days 15–17

### 5.1 Create your Telegram bot
- [x] Open Telegram -> search `@BotFather` -> send `/newbot`
- [x] Choose a name and username for your bot
- [x] Copy the **Bot Token** BotFather gives you
- [x] Start a conversation with your new bot (send it any message)
- [x] Visit this URL in your browser to get your **Chat ID**:
  ```
  https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
  ```
  Look for `"chat":{"id": 123456789}` in the response
- [x] Save both values - you'll need them in the next step

### 5.2 Add environment variables
- [x] Add to `.env.local`:
  ```
  TELEGRAM_BOT_TOKEN=your_bot_token_here
  TELEGRAM_CHAT_ID=your_chat_id_here
  ```
- [ ] Also add these in your **Vercel project settings** → Environment Variables
  (Settings → Environment Variables → add both keys)

### 5.3 Create the API route
- [x] Create `/app/api/contact/route.ts`:
  ```ts
  // POST handler
  // 1. Parse request body: { name, email, subject, message }
  // 2. Validate all required fields
  // 3. Format the Telegram message:
  //    📬 New Portfolio Message
  //    👤 Name: [name]
  //    📧 Email: [email]
  //    📝 Subject: [subject]
  //    💬 Message: [message]
  //    ⏰ Sent: [timestamp]
  // 4. POST to https://api.telegram.org/bot{TOKEN}/sendMessage
  //    with chat_id and text as the body
  // 5. Return 200 on success, 500 on failure
  ```
- [x] Test it locally using a tool like Thunder Client or Postman:
  ```
  POST http://localhost:3000/api/contact
  Body: { "name": "Test", "email": "test@test.com", "subject": "Hi", "message": "Hello!" }
  ```
- [x] Confirm a Telegram message arrives in your chat

### 5.4 Contact section UI
- [x] Create `components/sections/Contact.tsx`
- [x] Add section id: `<section id="contact">`
- [x] Form fields:
  - Full Name (required)
  - Email (required)
  - Subject (optional)
  - Message (required, textarea)
  - Submit button
- [x] On submit:
  - [x] Client-side validation (required fields, valid email format)
  - [x] POST to `/api/contact` with the form data
  - [x] Disable the button and show "Sending..." while the request is in flight
  - [x] On success: show "Message sent! I'll get back to you soon." and clear the form
  - [x] On error: show "Something went wrong, please try again."
- [x] Add basic rate limiting: disable the submit button for 30 seconds after a successful send
- [x] Wrap in `<FadeInSection>`

---

## Phase 6 — Polish + Launch
**Goal:** Make it fast, responsive, and ready for real visitors.
**Timeline:** Days 18–21

### 6.1 Responsive design audit
- [ ] Open Chrome DevTools → Toggle device toolbar
- [ ] Check at **375px** (mobile): text readable, buttons tappable, no horizontal scroll
- [ ] Check at **768px** (tablet): layouts shift correctly from 1-col to 2-col
- [ ] Check at **1280px** (desktop): content is centered, max-width applied
- [ ] Fix any overflow, clipping, or layout breaking issues
- [ ] Test the hamburger menu on mobile

### 6.2 Performance
- [ ] Run Lighthouse in Chrome DevTools → target score ≥ 85 on all categories
- [ ] Compress all images: convert to `.webp` format, keep under 200kb each
- [ ] Use Next.js `<Image>` component for all images (auto-optimizes and lazy-loads)
- [ ] Add `loading="lazy"` to any `<img>` tags not using Next.js Image

### 6.3 SEO + meta tags
- [ ] Update `app/layout.tsx` metadata:
  ```ts
  export const metadata = {
    title: 'Your Name — Portfolio',
    description: 'Your short bio/tagline here',
    openGraph: {
      title: 'Your Name — Portfolio',
      description: 'Your short bio/tagline here',
      images: ['/images/og-image.jpg'], // 1200x630px image
    },
  };
  ```
- [ ] Create an OG image at `/public/images/og-image.jpg` (1200×630px — your name + title)
- [x] Add a favicon: place `favicon.ico` or `favicon.png` in `/app/` or `/public/`

### 6.4 Accessibility
- [ ] All `<img>` tags have descriptive `alt` text
- [ ] All buttons and links have readable labels (no icon-only buttons without `aria-label`)
- [ ] Tab through the entire page with keyboard — confirm all interactive elements are reachable
- [ ] Confirm text contrast passes (use [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker))

### 6.5 Final checks before launch
- [x] `.env.local` is in `.gitignore` - confirm it is NOT committed to GitHub
- [ ] All Vercel environment variables are set (Firebase + Telegram)
- [ ] Test the contact form on the live Vercel URL — confirm Telegram message arrives
- [ ] Test testimonial submission on live URL — confirm it saves and appears in real time
- [ ] Check all project card links open correctly
- [ ] Share the live URL with one person and ask them to test the contact form

### 6.6 Go live
- [ ] Push final changes to `main` branch
- [x] Confirm Vercel auto-deploys successfully
- [ ] Add your custom domain in Vercel → Settings → Domains (optional)
- [ ] Share your portfolio! 🚀

---

## Quick Reference

### Useful commands
```bash
npm run dev          # Start local dev server
npm run build        # Build for production ✅ PASSED
npm run lint         # Check for lint errors ✅ PASSED
git add . && git commit -m "your message" && git push   # Deploy
```

### Key file locations
```
app/page.tsx                     ← Main page, import all sections here
app/layout.tsx                   ← Global layout, fonts, metadata, Navbar
app/api/contact/route.ts         ← Telegram API route
components/sections/             ← Hero, About, Education, Portfolio, Testimonials, Contact, Footer
components/ui/                   ← ProjectCard, TestimonialCard, FadeInSection, Navbar
data/projects.json               ← Your project data
lib/firebase.ts                  ← Firebase initialization
.env.local                       ← Secret keys (never commit this)
```

### Environment variables needed
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
TELEGRAM_BOT_TOKEN
TELEGRAM_CHAT_ID
```

---

*Build Plan v1.0 — Personal Portfolio MVP*
