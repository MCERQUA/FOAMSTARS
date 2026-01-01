# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**FOAMSTARS** is a React + TypeScript directory website exclusively for **Spray Foam Insulation Companies**. Built on the ListingHub template, we are converting it from a generic contractor directory into a niche-specific directory for the spray foam industry.

### Target Niche
- **Industry**: Spray Foam Insulation ONLY (no other trades)
- **Organization**: Companies listed by **State** → individual contractors within each state
- **Service Categories**:
  1. **Spray Foam Insulation** - Residential & commercial insulation
  2. **Concrete Lifting** - Polyurethane foam concrete leveling & lifting
  3. **Artistic & Themed Projects** - Movie sets, theme parks, sculptural foam
  4. **Polyurethane Coatings** - Protective coatings & waterproofing
  5. **SPF Roofing** - Spray polyurethane foam roofing systems

### Conversion Status
This project is being converted from a general contractor directory. When working on this codebase:
- Replace generic "contractor" terminology with spray foam specific language
- Categories should reflect spray foam services (not plumbing, electrical, etc.)
- Location browsing should emphasize States, not cities
- All content should be spray foam industry focused

### Remaining Conversion Tasks
- [ ] Update search/filter components for spray foam services
- [ ] Convert city-based browsing to state-based
- [ ] Update all page templates to use spray foam terminology
- [ ] Update footer components
- [ ] Modify Supabase schema/categories for spray foam services
- [ ] Add state selection for company listings
- [ ] Update SEO metadata for spray foam keywords

## Development Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript check first)
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Architecture

### Tech Stack
- React 19 with TypeScript
- Vite for build tooling and development server
- React Router DOM v7 for routing
- Bootstrap 5 for styling (with custom SCSS)
- Google Maps API integration (@react-google-maps/api)
- React Icons (Bootstrap Icons, Font Awesome)
- Swiper for carousels and sliders
- React Select for enhanced dropdowns
- Multi-Range Slider for filtering
- React Dropzone for file uploads
- React CountUp for animated counters
- Yet Another React Lightbox for image galleries
- Animate.css for CSS animations

### Project Structure
- `src/pages/` - Main page components organized by functionality:
  - `index/` - 12 different home page variants (index-one through index-eleven, plus index-map)
  - `listings/` - Listing display pages in grid, list, and half-map layouts
  - `dashboard/` - User dashboard pages (profile, bookings, listings, etc.)
  - `auth/` - Authentication pages (login, register, forgot password, 2FA)
  - `inner-pages/` - Static pages (about, blog, contact, pricing, etc.)
- `src/components/` - Reusable UI components organized by feature:
  - `navbar/` - 9 different navigation variants (light, dark, transparent, admin, etc.)
  - `list-detail/` - Single listing page components (about, galleries, reviews, maps, pricing)
  - `admin/` - Dashboard-specific components (sidebar, image upload, activity)
  - Feature components: filters, forms, footers, listings, categories
- `src/data/` - Data layer with comprehensive mock data (1,067 lines)
- `src/contexts/` - React Context providers (AuthContext for authentication)
- `src/assets/` - Static assets including images and SCSS styles
- `src/types/` - TypeScript type definitions
- `docs/` - Comprehensive developer documentation

### Key Features
- **12 Home Page Variants**: Different design approaches (index-one through index-eleven, plus index-map)
- **26 Listing Layouts**: 6 grid layouts, 5 list layouts, 5 half-map layouts, 5 single listing variants + 5 additional single pages
- **9 Dashboard Pages**: Full user management (profile, bookings, listings, messages, wallet, reviews, bookmarks)
- **Authentication System**: Email/password, Google OAuth, Facebook OAuth (configurable), 2FA support
- **Protected Routes**: ProtectedRoute and PublicRoute components with authentication flow
- **Google Maps Integration**: Interactive maps, location-based search, map markers
- **Comprehensive Data Layer**: Mock data for listings, categories, users, reviews, blogs, locations, events
- **Responsive Design**: Mobile-first Bootstrap 5 with custom SCSS and CSS variables
- **Component Library**: 50+ reusable components with TypeScript interfaces
- **Animation System**: CSS keyframes, transitions, hover effects, loading states

### Routing
The app uses a comprehensive routing system with 60+ routes covering all page variants. Single listing pages support dynamic routing with ID parameters.

### Styling
- **Bootstrap 5 Foundation**: Extensive customization through CSS custom properties
- **Custom SCSS Architecture**: style.scss (79,474 tokens) + _custom.scss variables
- **CSS Variables System**: Theming with --bs-* custom properties for colors, spacing, typography
- **Typography**: 'Jost' font family with weights 200-800, 15px base font size
- **Color Scheme**: Primary yellow/orange (#FFB800), comprehensive color system with opacity utilities
- **Animation System**: CSS keyframes (shimmer, bounce, preloader), transition utilities
- **Responsive Breakpoints**: Mobile-first with custom breakpoints (575px to 1500px)
- **Component-Specific Styling**: Buttons (56px height), cards, navigation, forms, dashboard
- **Dark Mode Support**: Dashboard dark theme with CSS variables

## 🎨 FOAMSTARS Brand Style Guide

### CRITICAL: All pages MUST follow these styling rules consistently

### Hero Sections (Page Headers)
All hero/header sections MUST use this pattern (reference: `index-two.tsx`):

```jsx
<div className="hero-header full-height" style={{
    background: '#000000',
    position: 'relative',
    overflow: 'hidden'
}}>
    {/* Spray worker images - USE CSS CLASSES */}
    <img src="/backgorund mike spray.png" alt="" className="hero-spray-worker hero-spray-left" />
    <img src="/backgorund-mike-spray-rv.png" alt="" className="hero-spray-worker hero-spray-right" />

    {/* Black vignette overlay */}
    <div style={{
        position: 'absolute',
        left: 0, top: 0, width: '100%', height: '100%',
        background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.85) 75%, #000000 100%)',
        zIndex: 2, pointerEvents: 'none'
    }} />

    {/* Yellow glow effect */}
    <div style={{
        position: 'absolute',
        top: '45%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(circle, rgba(255, 200, 0, 0.35) 0%, rgba(255, 165, 0, 0.2) 25%, rgba(255, 140, 0, 0.1) 45%, transparent 65%)',
        filter: 'blur(50px)',
        zIndex: 3, pointerEvents: 'none'
    }} />

    {/* Content with FOAMSTARS Logo */}
    <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <img src="/FOAMSTARS_logo.png" alt="FOAMSTARS" style={{
            maxWidth: '400px', width: '100%', height: 'auto',
            marginBottom: '20px', display: 'block', margin: '0 auto 20px',
            filter: 'drop-shadow(0 0 30px rgba(255, 200, 0, 0.5))'
        }} />
        <h1 className="text-white">Page Title Here</h1>
        <p className="fs-5 fw-light text-white-50">Subtitle text here</p>
    </div>
</div>
```

### Brand Colors
- **Primary Yellow**: `#FFB800` (headings, accents, glow)
- **Background Black**: `#000000` (hero backgrounds)
- **White Text**: `text-white` class or `#FFFFFF`
- **Muted White**: `text-white-50` class (subtitles, descriptions)
- **Yellow Glow**: `rgba(255, 200, 0, 0.35)` for glow effects

### Typography in Heroes
- **Page Titles**: White text (`className="text-white"`) - NO yellow for main headings
- **Subtitles**: Semi-transparent white (`className="text-white-50"`)
- **Logo**: Always use `/FOAMSTARS_logo.png` with yellow drop-shadow

### Navigation
- Use `NavbarLight` component which includes the proper logo (`/FOAMSTARS title.png`)
- Logo height: 40px in desktop, 35px in mobile menu

### CSS Classes (defined in `_custom.scss`)
```scss
.hero-spray-worker {
  position: absolute;
  top: 80px;
  width: 500px;
  height: auto;
  opacity: 0.8;
  z-index: 1;
  pointer-events: none;
}
.hero-spray-left { left: 0; }
.hero-spray-right { right: 0; }
```

### Section Headings (Body Content)
```jsx
<h3 className="sectionHeading">Section Title <span className="text-primary">Accent Word</span></h3>
```

### Assets Location
- **Logo (full)**: `/public/FOAMSTARS_logo.png`
- **Logo (title only)**: `/public/FOAMSTARS title.png`
- **Spray worker left**: `/public/backgorund mike spray.png`
- **Spray worker right**: `/public/backgorund-mike-spray-rv.png`

### DO NOT
- ❌ Use colored/yellow headings in hero sections (use white)
- ❌ Use inline styles for spray workers (use CSS classes)
- ❌ Use template banner images (burger, beach, food photos)
- ❌ Use `text-light` class (use `text-white` or `text-white-50`)
- ❌ Create hero sections without the FOAMSTARS logo
- ❌ Use different background colors (always black `#000000`)

## Development Notes

### Configuration
- TypeScript configuration uses project references (tsconfig.json, tsconfig.app.json, tsconfig.node.json)
- ESLint configured for React and TypeScript with hooks and refresh plugins
- Vite configuration with React plugin, source maps enabled
- Environment variables prefixed with VITE_ (VITE_GOOGLE_MAPS_API_KEY, VITE_GOOGLE_CLIENT_ID)

### Architecture Patterns
- **Component-Based Design**: Functional components with TypeScript interfaces
- **Context API**: AuthContext for global authentication state
- **Protected Routes**: Authentication wrapper components (ProtectedRoute, PublicRoute)
- **State Management**: Local useState + useEffect patterns, Context for global state
- **Event Handling**: Async form submission, input change handlers, proper error handling
- **Responsive Design**: Window size detection, conditional rendering, mobile-first approach

### Key Implementation Details
- Bootstrap tooltips initialized globally in App.tsx
- Google/Facebook OAuth integration (Facebook currently disabled)
- All pages pre-built as separate components for easy customization
- Mock data in data.ts (1,067 lines) ready for API replacement
- Image assets organized by category (listings, team, blog, categories, cities, events)
- Icon system using React Icons (Bootstrap Icons, Font Awesome 6)
- Supabase backend integration with real-time data and file storage
- Image upload system with drag & drop functionality (react-dropzone)

### Supabase Integration
- **Database**: PostgreSQL with real-time subscriptions
- **Authentication**: Email/password, Google OAuth, session management
- **Storage Buckets**:
  - `business-images` (public) - Listing images, logos, and galleries
  - `avatars` (public) - User profile images
  - `review-images` (public) - Review attachments
  - `documents` (private) - Secure documents
  - `booking-attachments` (private) - Booking files
- **Security**: Row Level Security (RLS) policies, environment-gated logging
- **API Functions**: User management, listing CRUD, dashboard statistics

### Data Structures
- **Listings**: Spray foam company profiles with services, state location, ratings, contact info
- **Categories**: 5 spray foam service categories (Insulation, Concrete Lifting, Artistic, Coatings, Roofing)
- **States**: US state listings for geographic browsing (replacing generic cities)
- **Reviews**: Customer testimonials for spray foam projects
- **Blog Posts**: Spray foam industry articles (open vs closed cell, SPF roofing, concrete lifting)
- **Events**: Industry trade shows and networking events
- **Dashboard Data**: Company stats, inquiries, profile management

### File Organization
- Pages organized by feature: index/, listings/, dashboard/, auth/, inner-pages/
- Components organized by function: navbar/, list-detail/, admin/, feature-specific
- Assets structured: img/ (organized by category), scss/ (modular architecture)
- Documentation: Complete developer guides in docs/ folder

## Slash Commands

### /directory-setup
**Purpose**: Complete contractor directory setup procedure with progress tracking
**Location**: `.claude/directory-setup.md`
**Features**:
- Reviews all planning documents (CHOSEN-PAGE-VARIANTS.md, SITE-STRUCTURE-PLAN.md, IMPLEMENTATION-TASKS.md)
- Assesses current production state vs planned implementation
- Executes 36 implementation tasks in priority order
- Tracks progress in `docs/setup-progress.json` for session recovery
- Handles interruptions gracefully with resume capability
- Provides completion tracking and session summaries

**Usage**: Simply execute `/directory-setup` to start or continue the setup process
**Progress Tracking**: All task completion status saved in setup-progress.json
**Recovery**: Can resume from any interruption point across multiple sessions

## 🚨 ERROR TRACKING PROTOCOL

### Mandatory Procedures
When an error persists after 3 attempts, the following protocol is MANDATORY:

### /track-error
**Purpose**: Initialize error tracking with Slack integration and systematic documentation
**Location**: `.claude/commands/track-error.md`
**Usage**: `/track-error [ERROR_ID]` - Auto-generates ID if not provided

### /check-progress  
**Purpose**: Review resolution attempts and trigger alerts if thresholds exceeded
**Location**: `.claude/commands/check-progress.md`
**Usage**: `/check-progress [ERROR_ID]` - Monitors progress and escalates as needed

### /log-resolution
**Purpose**: Document resolution attempts and update tracking systems
**Location**: `.claude/commands/log-resolution.md`  
**Usage**: `/log-resolution [ERROR_ID] [STATUS] [NOTES]` - Logs attempts and manages lifecycle

### /slack-alert
**Purpose**: Manually trigger Slack notifications for error tracking events
**Location**: `.claude/commands/slack-alert.md`
**Usage**: `/slack-alert [ERROR_ID] [ALERT_TYPE] [MESSAGE]` - Custom notifications

1. **Slack Alert**: Post to #cca-coi-updates-feed with session ID and error type
2. **Error Logging**: Update docs/AI-ERROR-TRACKER.md before analysis
3. **Investigation**: Use systematic approach with ultrathinking
4. **Progress Updates**: Post to Slack after each significant action
5. **Resolution Alert**: Post final solution to #echo-updates-feed

### Available Commands
- `/track-error [ID]` - Initialize error tracking with Slack integration
- `/check-progress [ID]` - Review attempts and trigger alerts if needed
- `/log-resolution [ID]` - Log attempt and update trackers
- `/slack-alert [ID]` - Manually trigger Slack notifications 

### Error Tracking Files
- **Individual Issues**: .claude/error-tracking/issue-[ID].md
- **Global Tracker**: docs/AI-ERROR-TRACKER.md
- **Resolved Archive**: .claude/error-tracking/resolved/

### Severity Levels
- **CRITICAL**: System-breaking, blocks all progress
- **HIGH**: Major functionality affected
- **MEDIUM**: Feature-specific, workarounds available
- **LOW**: Minor issues, cosmetic problems

### Session ID Format
SESSION-[TIMESTAMP]-[ISSUE_ID]
Example: SESSION-1705321200-456

## 🖼️ IMAGE PROCESSING SYSTEM

### MANDATORY: All company images MUST be processed through this system

### Folder Structure
```
public/
  _inbox/                      # DROP RAW IMAGES HERE
    {company-slug}/
      logo.png                 # Any logo file
      project-photo-1.jpg      # Gallery images

  companies/                   # PROCESSED OUTPUT (auto-generated)
    {company-slug}/
      logos/
        original.png           # Source file backup
        square.png             # 400x400 (cards, avatars)
        square.webp            # 400x400 WebP version
        wide.png               # 800x400 (banners)
        wide.webp              # 800x400 WebP version
        thumb.png              # 100x100 (tiny icons)
        thumb.webp             # 100x100 WebP version
      gallery/
        original-{name}.jpg    # Source file backup
        thumb-{name}.jpg       # 300x200 (grid preview)
        thumb-{name}.webp
        medium-{name}.jpg      # 800x600 (card display)
        medium-{name}.webp
        large-{name}.jpg       # 1600x1200 (lightbox)
        large-{name}.webp
```

### Processing Commands
```bash
# Process single company
node scripts/process-images.mjs {company-slug}

# Process all companies in _inbox
node scripts/process-images.mjs --all
```

### Quality Settings (CRITICAL - NO BLUR)
- **JPEG**: 90% quality (high quality, minimal artifacts)
- **WebP**: 90% quality (excellent quality-to-size ratio)
- **PNG**: Lossless compression (no quality loss)
- **Downscaling**: Lanczos3 kernel (highest quality)
- **NEVER upscale**: Small images keep original dimensions

### File Naming Convention
- **Logos**: Files with "logo" in the name → processed as logos
- **Gallery**: All other images → processed as gallery images
- **Company slug**: lowercase, hyphens, no spaces (e.g., `alabama-spray-foam-llc`)

### When to Process Images

#### From _inbox folder (manual uploads):
1. User drops raw images into `public/_inbox/{company-slug}/`
2. Run: `node scripts/process-images.mjs {company-slug}`
3. Processed images appear in `public/companies/{company-slug}/`
4. Update database `featured_image_url` to: `/companies/{company-slug}/logos/square.png`

#### From website uploads (future implementation):
When implementing file uploads via the dashboard:
1. Accept upload via react-dropzone
2. Save original to Supabase Storage: `business-images/{company-id}/originals/`
3. Process using sharp with same quality settings
4. Save processed versions to: `business-images/{company-id}/logos/` or `/gallery/`
5. Update database with Supabase Storage URLs

### Image Format Reference

| Format | Dimensions | Use Case | File Types |
|--------|-----------|----------|------------|
| `square` | 400x400 | Cards, avatars, sliders | .png, .webp |
| `wide` | 800x400 | Headers, banners | .png, .webp |
| `thumb` | 100x100 | Tiny icons, favicons | .png, .webp |
| `gallery-thumb` | 300x200 | Grid previews | .jpg, .webp |
| `gallery-medium` | 800x600 | Card display | .jpg, .webp |
| `gallery-large` | 1600x1200 | Lightbox/full view | .jpg, .webp |

### DO NOT
- ❌ Use quality below 85% (causes blur/artifacts)
- ❌ Upscale small images (keep original if smaller than target)
- ❌ Skip WebP generation (modern browsers need it)
- ❌ Delete original files (always keep backup)
- ❌ Process images outside this system (breaks consistency)
- ❌ Use different quality settings per image (maintain uniformity)
