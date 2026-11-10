# Product Requirements Document (PRD) for EV Strategy Deck

## 1. Introduction

EV Strategy Deck is a browser-based, 10-slide presentation rendered as a dashboard-style web app. It covers the Electric Vehicle (EV) industry vertical for an EBTAP (e-Business Transformation and Application) group assignment, delivered in Session 9. It profiles four companies: **BYD, Tesla, Mercedes EQS (Mercedes-Benz) and HMGICS (Hyundai Motor Group Innovation Center in Singapore)**.

The app answers the four assignment questions in the exact structure the instructor specified:
- **Q1** External Analysis: 5 points on ICT impact on the macro-environment and industry structure.
- **Q2** Value Mapping: value chain, value curve, value networks.
- **Q3** e-Business Model Transformation: 5 imagineered changes.
- **Q4** Company Categorization: readiness/maturity as High, Medium or Low, plus leaders and disrupted players.

The target users are the presenting student group, the instructor and the classmates who evaluate it. The value proposition is a polished presentation that can be run from a keyboard, with a sidebar dashboard for fast navigation, live visualizations (value curve, value network diagram, maturity matrix) and all instruction content mapped to slides, so no scoring point is missed.

Feature scope: slide deck, dashboard navigation shell, charts and diagrams, and a fullscreen presenter mode. There are no accounts, no backend and no extra modules.

## 2. Features

### Core Features
- **10-slide deck (single page).** One slide visible at a time inside a dashboard shell. Slide list (fixed):
  1. **Title and Agenda.** "Electric Vehicles: e-Business Transformation of the EV Industry". EBTAP Group Presentation, Session 9 (20% Group Component). Four company chips (BYD, Tesla, Mercedes EQS, HMGICS Hyundai) and a 4-question agenda mapped to the 20 points.
  2. **Industry Snapshot and Chosen Vertical.** Why EV, with company profiles. Count-up stats: global EV sales ~17M in 2024 (~20% of new car sales), BYD ~4.27M vehicles in 2024 (NEV incl. PHEV), Tesla ~1.79M deliveries in 2024, HMGICS plant capacity ~30,000 units/yr, Mercedes EQS as flagship luxury EV sedan. One card per company with its distinct role: BYD (vertically integrated volume leader), Tesla (software-defined pioneer), Mercedes EQS (luxury digital cockpit, MBUX Hyperscreen), HMGICS (smart-factory, human-centric, robotics/AI/IoT manufacturing hub).
  3. **Q1 External Analysis (1/2): Macro-environment impact of ICT.** Points 1-3 as expandable cards, each with "What" and "Why it is significant for e-Business Transformation".
  4. **Q1 External Analysis (2/2): Industry structure impact.** Points 4-5, plus a Porter's Five Forces mini-radar showing how ICT shifts each force.
  5. **Q2 Value Mapping (1/2): Industry Value Chain.** Horizontal chevron chain with company overlays: Raw materials and battery minerals → Battery and cell manufacturing → Vehicle design and software → Assembly (smart factory) → Distribution and sales (direct/online) → Charging and energy services → Connected services, OTA and data → Recycling and second life.
  6. **Q2 Value Mapping (2/2): Value Curve and Value Network.** Left: line chart of value curve across key dimensions (Price, Range, Charging speed, Software/OTA, Digital sales experience, Luxury/comfort, Manufacturing innovation, Sustainability) for the four companies plus an "Legacy ICE" baseline. Right: SVG value-network diagram (nodes: OEMs, battery makers, charging networks, energy utilities, software/cloud, fleet and ride-hail, regulators, customers, recyclers) with prioritized benefit ranking and reasons.
  7. **Q3 e-Business Model Transformation: 5 imagineered changes.** Five numbered cards, each with a "From → To" shift and rationale:
     1. Direct-to-consumer online ordering and agency sales (shift in stakeholder relationship; dealers become delivery and service agents).
     2. Software-defined vehicle subscriptions: OTA features, FSD or driver-assist, comfort packages (revenue model shift from one-time sale to recurring).
     3. Battery-as-a-Service and second-life energy storage (consumption shift from owning the battery to paying per use or swap).
     4. Vehicle-to-Grid (V2G) and energy ecosystem where the car earns money for the owner (new value network with utilities).
     5. Mass-customization via smart factories (HMGICS) with digital twins, build-to-order and local micro-factories (customer preference shift to personalized, local production).
  8. **Q4 Readiness (1/2): Maturity Matrix.** Table plus a 2x2/heat-map (e-Business readiness vs market momentum) rating each company High / Medium / Low across 5 dimensions (Digital sales, Software/OTA, Data and connected services, Smart manufacturing, Ecosystem/charging).
  9. **Q4 Readiness (2/2): Leaders and Disrupted.** Verdict cards: Leaders (Tesla for e-business and software; BYD for vertical integration and scale), Strong challenger (HMGICS for manufacturing innovation, medium for customer-facing e-business, as it is a production hub), Risk of disruption (legacy-minded Mercedes EQS in software and direct sales, with medium readiness and strong brand but slower OTA and dealer-bound model). Cite reasons for each.
  10. **Conclusion, Scorecard and Team.** Summary of the 4 questions with points (5+5+5+5 = 20), key takeaways, a "Questions?" CTA, and a member-to-company assignment block (each student a different company: BYD, Tesla, Mercedes EQS, HMGICS) with placeholder editable names.

### Dashboard Shell Features
- **Left sidebar** (collapsible on mobile) listing 10 slides with number, title and question badge (Q1-Q4); active slide highlighted; progress bar at the top.
- **Top bar:** deck title, slide counter ("04 / 10"), Present (fullscreen) button, theme-neutral company filter chips.
- **Company filter (smart essential):** chips for All / BYD / Tesla / Mercedes EQS / HMGICS highlight that company in charts and cards across slides.
- **Keyboard navigation:** ← → arrows, Space, Home/End, Esc exits presenter mode.
- **Presenter mode:** fullscreen via the Fullscreen API, hides sidebar and shows only slide and progress.
- **Print-friendly view:** button triggers window.print with CSS that prints one slide per page.

### Content: Q1 Five Points (literal slide content)
1. **E-commerce and digital direct sales (Macro: technological and economic).** ICT enables online ordering and transparent pricing, removing the dealership layer. Significant because it changes the customer-relationship ownership and sales channel economics (Tesla, BYD online ordering).
2. **Connected, software-defined vehicles with OTA (Macro: technological).** Cars become updatable platforms. Significant because revenue and value continue after sale, and quality and features improve without recalls.
3. **Big data, AI and cloud (Macro: technological).** Fleet data feeds autonomy, battery optimization and predictive maintenance. Significant because data becomes a competitive moat and new service revenue.
4. **Digital charging and energy platforms, IoT and smart grid (Industry structure: new entrants and complements).** Charging network apps, plug-and-charge and V2G integrate utilities and mobility. Significant because it creates new stakeholders and ecosystem power (Tesla Supercharger, BYD charging, Hyundai Ioniq charging partners).
5. **Smart manufacturing and digital supply chain (Industry structure: supplier power and barriers to entry).** Digital twins, robotics, IoT and AI (HMGICS) plus integrated battery supply (BYD Blade Battery). Significant because it lowers entry barriers for tech-native players and shifts bargaining power toward integrated players.

### Content: Q4 Maturity Ratings (literal)
| Company | Digital sales | Software/OTA | Data/Connected | Smart mfg | Ecosystem | Overall |
|---|---|---|---|---|---|---|
| Tesla | High | High | High | High | High | **High** |
| BYD | High | Medium | Medium | High | High | **High** |
| HMGICS Hyundai | Medium | Medium | Medium | High | Medium | **Medium** |
| Mercedes EQS | Medium | Medium | Medium | Medium | Medium | **Medium** (Low on direct sales) |

## 3. User Stories
- As a presenter, I want to move through 10 slides with arrow keys so that I can deliver smoothly in Session 9.
- As an instructor, I want each slide labeled with its question (Q1-Q4) and points so that I can grade against the rubric.
- As a presenter, I want to click a company chip so that its data is highlighted in the charts while I talk about it.
- As a viewer, I want to see the value curve and value network visually so that I grasp the benefit priorities quickly.
- As a presenter, when I click Present, I want fullscreen slide-only mode so that nothing distracts the audience.

## 3.5. Interactive Elements

**Button Specifications**
- **Present:** Requests fullscreen on the app container → hides sidebar and top bar controls except a faint slide counter → on success shows toast "Presenter mode – press Esc to exit" → on API failure falls back to a CSS-only full viewport mode.
- **Prev / Next arrows:** Move to the previous or next slide with slide transition; disabled at slide 1 and 10.
- **Sidebar slide item:** Jumps directly to that slide and updates progress bar; on mobile closes the drawer.
- **Company chips (All, BYD, Tesla, Mercedes EQS, HMGICS):** Sets the global `activeCompany`; highlights matching series, rows and cards with accent color and dims others (opacity 0.35); "All" resets.
- **Expand on Q1 cards:** Click toggles the "Why it is significant" panel with height animation; only one open per slide.
- **Value-curve legend items:** Click toggles each company line visible/hidden.
- **Value-network nodes:** Hover or click shows tooltip with the stakeholder's role and benefit; connected edges highlight.
- **Print:** Calls window.print with the print stylesheet, one slide per page.
- **Maturity cell:** Click or hover opens a tooltip with the reason for the rating (e.g. "Tesla – direct online orders, 100% own delivery").

**Form Specifications**
- There are no data-entry forms. The only editable fields are the team-member names on slide 10 (inline contentEditable text, saved to localStorage on blur, empty value reverts to placeholder "Member name").

**Panel Specifications**
- **Slide-detail drawer (right-side):** Triggered by the "Details" button on slides 3-9 → displays the extended rationale, sources and speaker notes for that slide → actions: Close (X, backdrop click, Esc) → slides in from the right (translate-x) and carries the slide id from state.

## 4. Design & Styling

### 4.0 Design Direction
- **Direction:** "Voltline Studio" – a bright, precision-engineered presentation cockpit.
- **Why it fits:** Brand concept: *a clean, light-filled mission-control for the electric future where each carmaker is a colored current flowing through one grid of strategy*, so the viewer reads comparisons instantly. It is a dashboard/presentation tool and therefore stays on a LIGHT canvas.
- **Signature elements (developer MUST implement all):**
  1. **Four "current" company colors** used consistently everywhere (BYD red #E11D48, Tesla slate-black #111827 with electric accent, Mercedes silver-teal #0E7490, Hyundai blue #2563EB), shown as thin 3px colored top-borders on cards and as legend dots.
  2. **Energy-flow progress bar** at the top of the shell: a 4px gradient (volt lime #A3E635 → cyan #22D3EE) line that fills with slide progress and has a soft glowing leading dot.
  3. **Oversized slide numerals** ("01"–"10") in Space Grotesk at text-[9rem], 6% opacity, in the top-right corner of each slide as a watermark.
  4. **Screenshot moment: Value-network grid diagram (slide 6)**, an SVG hub-and-spoke map with animated dashed "current" lines (stroke-dashoffset loop) flowing between nodes toward the central "EV Customer".
  5. **Maturity heat-map (slide 8)** with rounded cells colored High=emerald, Medium=amber, Low=rose, with staggered pop-in.

### 4.1 Color Palette
- Primary Color: #0F172A (Ink Navy)
- Secondary Color: #0E7490 (Grid Teal)
- Accent Color: #A3E635 (Volt Lime), with #22D3EE (Charge Cyan) as the gradient partner
- Background Color: #F4F7FB (Cool Mist)
- Text Color: #0F172A (Ink Navy), muted #64748B
- Surface/Card Color: #FFFFFF with 1px #E2E8F0 border
- Company colors: BYD #E11D48, Tesla #111827, Mercedes #0E7490, HMGICS #2563EB
- Status: High #10B981, Medium #F59E0B, Low #F43F5E

### 4.2 Typography
- Heading Font: 'Space Grotesk'
- Body Font: 'Inter Tight'
- The developer MUST load both via Google Fonts @import at the top of index.css and set :root CSS variables --font-heading and --font-body.

### 4.3 Visual Style
- Rounded-2xl white cards with soft shadow (`0 8px 30px rgba(15,23,42,.06)`), 1px slate borders and a 3px company-colored top edge where company-specific.
- Slides sit on a 16:9 stage (aspect-video, max-w-6xl) centered in the content area, with p-8/p-12 inner padding and 24-32px gaps; the surrounding canvas is #F4F7FB with a faint dotted grid.
- Pill badges for Q1-Q4 and points ("5 pts"); buttons are rounded-full, ink-navy with a volt-lime hover glow.
- Section chips use letter-spaced uppercase micro-labels (text-xs tracking-[0.18em]).
- Charts and diagrams are hand-built inline SVG/CSS (no chart library).

### 4.4 Page Header / Hero
UTILITY app: App-Shell layout, a 240px light sidebar and a slim top bar. Slide 1 includes a compact hero band (about 40% of the stage) with a Section 6 hero photo under a navy-to-transparent gradient and the title in white. Company cards on slide 2 carry cover thumbnails. Visual interest comes from color, charts and photography.

### 4.6 Animation Choreography (framer-motion)
- **Hero entrance (slide 1):** Image scales 1.08 → 1 over 0.9s; title lines rise 24px with 0.12s stagger; company chips pop in with a spring (stiffness 260, damping 20) after 0.5s.
- **Slide transitions:** AnimatePresence mode="wait"; the outgoing slide fades and shifts x -40px over 0.22s, the incoming slide enters from x +40px over 0.35s (ease-out); direction reverses when going back.
- **Scroll/stagger reveals:** Within a slide, cards rise 16px and fade, stagger 0.07s; chart bars grow from 0 over 0.7s; value-curve lines draw with pathLength over 1.1s.
- **Hover micro-interactions:** Cards lift -4px with a deeper shadow in 0.18s; buttons scale 1.03; maturity cells scale 1.06.
- **Special moments:** Stat count-ups (1.2s) on slide 2; animated flowing dashed lines on the value network (slide 6); the energy-flow progress bar glides with spring easing on each slide change.

## 5. Technical Implementation

### 5.1 Directory Structure
```
/src
  - App.jsx
  - main.jsx
  - index.css
  - components/
    - Layout.jsx
    - SlideShell.jsx
    - Charts.jsx
    - DetailDrawer.jsx
  - pages/
    - Deck.jsx
  - data/
    - deck-data.json
/index.html
```

### 5.2 Data Persistence
- **Data Layer:** not needed (static/display-only)
- **Authentication:** not needed (localStorage-only)
- **LocalStorage Keys:**
  - `evdeck_members`: Editable team member names on slide 10
  - `evdeck_slide`: Last viewed slide index
- **JSON File Locations:**
  - `/src/data/deck-data.json`: All slide content, company profiles, Q1 points, value chain steps, value curve scores, network nodes/edges, Q3 changes, maturity matrix and verdicts (imported as ES modules, never fetched from public/)
- **Requires Database:** false (client-side Supabase when configured)

### 5.3 State Management
- Use React Context API (or lifted state in Deck.jsx) for global state.
- **Global State Structure:**
  - `currentSlide`: Index 0-9
  - `direction`: 1 or -1 for transition direction
  - `activeCompany`: 'all' | 'byd' | 'tesla' | 'mercedes' | 'hmgics'
  - `presenting`: Boolean for fullscreen mode
  - `drawerSlide`: Slide id for the detail drawer or null
  - `sidebarOpen`: Mobile sidebar toggle
- **Component Access:** Layout supplies sidebar, top bar and keyboard listeners; Deck.jsx owns the state and passes props to SlideShell and Charts.

### 5.4 Component Architecture
**Key Components:**
- **App**: Router-free root that renders Layout and Deck.
- **main.jsx**: React entry (unchanged).
- **index.css**: Tailwind layers, Google Fonts import, CSS variables, print stylesheet, dotted grid background.
- **Layout**: Sidebar slide list with Q-badges, top bar (counter, chips, Present, Print), progress bar, keyboard handler and presenter mode.
- **Deck (page)**: Defines the 10 slide render functions inline (title, snapshot, Q1 cards and radar, value chain, value curve plus network, Q3 cards, maturity matrix, verdicts, conclusion) and drives AnimatePresence.
- **SlideShell**: 16:9 stage wrapper with the watermark numeral, Q badge, points pill, title area and Details button.
- **Charts**: Inline SVG/CSS visuals (ValueCurve, ValueNetwork, FiveForcesRadar, MaturityHeatmap, StatCounter, ChevronChain).
- **DetailDrawer**: Right-side slide-over with extended rationale and speaker notes.

**Component Hierarchy:**
```
App
 └─ Layout
     ├─ Sidebar
     ├─ TopBar
     └─ Deck
         ├─ SlideShell
         │   └─ Charts
         └─ DetailDrawer
```

## 6. Images & Assets
IMAGE_SEARCH_CRITERIA: electric vehicle charging station, tesla model s showroom, byd electric car factory, mercedes eqs luxury interior, hyundai smart factory robots, ev battery pack technology

1. [EV charging station hero](https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTEwMDV8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMHZlaGljbGUlMjBjaGFyZ2luZyUyMHN0YXRpb258ZW58MXwwfHx8MTc5NDMzOTgwM3ww&ixlib=rb-4.1.0&q=80&w=1080)
3. [BYD electric car production](https://images.unsplash.com/photo-1694027651012-cb09072e252e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTEwMDV8MHwxfHNlYXJjaHwxfHxieWQlMjBlbGVjdHJpYyUyMGNhciUyMGZhY3Rvcnl8ZW58MXwwfHx8MTc5NDMzOTgwOXww&ixlib=rb-4.1.0&q=80&w=1080)
4. [Mercedes EQS luxury interior](https://images.unsplash.com/photo-1568559598349-dbf322d50a48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTEwMDV8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGVxcyUyMGx1eHVyeSUyMGludGVyaW9yfGVufDF8MHx8fDE3OTQzMzk4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080)
5. [Hyundai smart factory robots](https://images.unsplash.com/photo-1700726783633-23c0c6383b00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTEwMDV8MHwxfHNlYXJjaHwxfHxoeXVuZGFpJTIwc21hcnQlMjBmYWN0b3J5JTIwcm9ib3RzfGVufDF8MHx8fDE3OTQzMzk4MDl8MA&ixlib=rb-4.1.0&q=80&w=1080)
6. [EV battery pack technology](https://images.unsplash.com/photo-1592318348310-f31b61a931c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5NTEwMDV8MHwxfHNlYXJjaHwxfHxldiUyMGJhdHRlcnklMjBwYWNrJTIwdGVjaG5vbG9neXxlbnwxfDB8fHwxNzk0MzM5ODA4fDA&ixlib=rb-4.1.0&q=80&w=1080)

## 7. Source Materials & Gaps
- User-provided assignment instructions (in the prompt): the group/industry rules, Group Component (20%, PPT in Session 9) and Q1-Q4 with their point values (5 each) are carried literally into slides 1, 3-10 and the agenda. The four company names (BYD, Tesla, Mercedes EQS, HMGICS Hyundai) are carried verbatim.
- Company statistics and maturity ratings are team-synthesized estimates (approximate public figures) and should be verified against current sources before the presentation. No attachments were provided.