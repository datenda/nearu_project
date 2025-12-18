# TV Show Explorer – Frontend Challenge 2025

A small **Next.js + TypeScript** web app to explore the TV show **“Powerpuff Girls”** and its episodes.  

- **Show Details Page**: Title, description, cover image, paginated episode list.  
- **Episode Details Page**: Episode title, summary, cover image.  
- **Favorites**: Mark episodes as favorites (stored in `localStorage`).  
- **Responsive & Accessible**: Works on mobile/desktop, screen reader-friendly, keyboard navigable.  

---

## Tech Stack

- Next.js 13+ (App Router)  
- TypeScript  
- Tailwind CSS  
- React 18+ (Server & Client Components)  
- Vitest + React Testing Library  
- Atlaskit / Atlassian Design System  

---

## Features

- Server-side data fetching from [TVMaze API](http://www.tvmaze.com/api)  
- Client-side pagination and favorites management  
- ARIA labels and semantic HTML for accessibility  
- Responsive layout: episode list below image on small screens, image centered  

---

## Setup

```bash
git clone https://github.com/your-username/tv-show-explorer.git
cd tv-show-explorer
npm install
npm run dev
