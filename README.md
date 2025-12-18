# TV Show Explorer – Frontend Challenge 2025

A small **Next.js + TypeScript** web app to explore the TV show **“Powerpuff Girls”** and its episodes.  

- **Show Details Page**: Title, description, cover image, paginated episode list.  
- **Episode Details Page**: Episode title, summary, cover image.  
- **Favorites**: Mark episodes as favorites (stored in `localStorage`).  
- **Responsive & Accessible**: Works on mobile/desktop, screen reader-friendly, keyboard navigable.  

---

## Setup

**Recommended to use in Chrome**

```bash
git clone https://github.com/datenda/nearu_project.git
cd nearu_project
npm install
npm run dev
```

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

## Architecture & Decisions

### Server vs Client Components

- Episode list, favorites, and pagination are client components for interactivity.  

### Data Fetching

- Client-side state for pagination and favorites persisted in `localStorage`.  

### Accessibility

- Buttons and links use proper `aria-label`s.  
- Keyboard navigable and screen reader-friendly.  
- Semantic HTML ensures a logical reading order.  

### Trade-offs

- Favorites stored in `localStorage` instead of a backend DB for simplicity.  
- Pagination handled client-side, which is fine for small datasets.  

### Improvements with More Time

- Add episode search/filter.  
- Persist favorites in a server-side DB with user accounts.  
- Implement infinite scrolling or server-side pagination for performance.  
- Add automated accessibility tests and more comprehensive unit tests.

### Custom Dropdown Implementation

- I opted to create a custom dropdown instead of using the Atlassian component because the original component caused accessibility issues with screen readers.

## Development Process

1. **Project Setup**
   - Initialized Next.js 13 project with TypeScript and Tailwind CSS.  
   - Installed necessary dependencies: Atlaskit, React, Vitest, Testing Library.  

2. **Data Modeling**
   - Defined TypeScript types for `Show` and `Episode` based on TVMaze API response.  
   - Planned pagination, favorites, and server/client boundaries.  

3. **Pages and Components**
   - Created **Show Details Page**:
     - Fetched show and episodes server-side for SEO.  
     - Displayed hero section, show info, and episode list.  
   - Created **Episode Details Page**:
     - Fetched episode data server-side.  
     - Displayed title, summary, and cover image.  
   - Developed **EpisodeList Component**:
     - Client component for pagination and favorites.  
     - Accessible buttons, hover/focus states, proper `aria-label`s.  
   - Developed **FavoritesDropdown Component**:
     - Client component to show favorite episodes.  
     - Updates immediately via `CustomEvent`.  

4. **Client Interactivity**
   - Implemented client-side pagination.  
   - Implemented favorites management with `localStorage`.  
   - Added responsive layout: episodes below image on mobile, image centered on small screens.  

5. **Accessibility**
   - Added semantic HTML structure.  
   - Used `aria-label`s on buttons and links.  
   - Ensured keyboard navigation and screen reader-friendly content.  

6. **Testing**
   - Wrote basic unit and component tests with Vitest + Testing Library.  
   - Tested favorites and pagination logic.  
