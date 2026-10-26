# FreelanceHub – Enterprise-Grade Freelance Marketplace

A client-side freelance marketplace built with **React.js**, **React Router DOM v6**, **Lucide Icons**, and custom **Tailwind/SaaS CSS Design System**.

---

## 🌟 Key Architecture & Capabilities

### 1. Two-Sided Marketplace & Role-Based Workflows
- **Freelancer Workspace**:
  - Profile strength completion meter (0-100%)
  - Availability toggle (`Available` vs `Busy`)
  - Skill-matched recommended projects feed
  - Interactive proposal & bidding engine with custom milestone budget breakdowns and character count
  - Duplicate proposal prevention check (`projectId` + `freelancerId`)
  - My Proposals Hub with tabbed filtering (`All`, `Pending`, `Accepted`, `Rejected`, `Withdrawn`)
  - Deliverable submission in contract workspace

- **Client Workspace**:
  - Comprehensive client metrics (Capital Deployed, Open Listings, Active Contracts, Pending Bids)
  - Project lifecycle wizard (`/post-project`) with dynamic skill chips, budget type toggles, deadline date picker, and instant live preview modal
  - Candidate comparison view and 1-click **"Accept Proposal & Hire"** workflow:
    - Locks project status to `In Progress`
    - Auto-rejects/notifies remaining candidates
    - Creates active `Contract` with milestone escrow tracking
  - Milestone deliverable review and simulated escrow fund release with celebratory confetti

- **System Admin Console**:
  - Global real-time analytics KPIs (Total Users, Freelancers, Clients, Active Projects, Completed Contracts, Platform Volume)
  - Account moderation table (Suspend/Reinstate user access)
  - Project moderation table (Flag and delete inappropriate/spam listings with custom audit reason)
  - System activity audit logs
  - **1-Click Pristine Seed Reset** to restore sample data at any time

---

## 🎭 Pre-Configured Demo Personas

Switch personas instantly using the **Demo Switcher Pill** in the top navbar or the 1-click login buttons on the `/login` page:

| Persona | Name | Role | Email | Password |
|---|---|---|---|---|
| **Freelancer** | Alex Rivera | `freelancer` | `alex@dev.io` | `demo123` |
| **Client** | Sarah Jenkins | `client` | `sarah@designhub.io` | `demo123` |
| **SysAdmin** | System Administrator | `admin` | `admin@freelancehub.io` | `admin123` |

---

## 📁 File Structure

```text
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # Role-aware nav with quick persona switcher dropdown
│   │   ├── Footer.jsx          # SaaS footer with pristine seed reset button
│   │   └── Sidebar.jsx         # Sub-navigation for dashboards
│   ├── common/
│   │   ├── ProtectedRoute.jsx  # Role-gated route authorization
│   │   ├── StatusBadge.jsx     # Semantic status tags
│   │   ├── Modal.jsx           # Accessible modal with ESC listener & animations
│   │   └── Toast.jsx           # Toast notification engine
│   ├── cards/
│   │   ├── ProjectCard.jsx     # Project card with tags, budget, and client trust badge
│   │   ├── ProposalCard.jsx    # Candidate comparison card & bidding review
│   │   └── StatsCard.jsx       # SaaS KPI card with trends and color accents
├── pages/
│   ├── Home.jsx                # Dynamic hero, search bar, category tracks, stats banner
│   ├── Login.jsx               # Form validation & 1-click demo login buttons
│   ├── Register.jsx            # Account creation with role selection
│   ├── BrowseProjects.jsx      # Advanced filter sidebar, search, and sorting
│   ├── ProjectDetails.jsx      # Scope details, client trust card, and proposal submission
│   ├── PostProject.jsx         # Project posting wizard with dynamic tags & preview modal
│   ├── FreelancerDashboard.jsx # Profile score meter, KPIs, recommended projects
│   ├── ClientDashboard.jsx     # Client overview & incoming candidate review desk
│   ├── MyProposals.jsx         # Tabbed proposal tracking & withdraw capability
│   ├── MyProjects.jsx          # Contract workspace, milestone escrow release, and chat
│   ├── Profile.jsx             # Dual view/edit mode, skills adder, portfolio showcase
│   └── AdminDashboard.jsx      # Analytics, user suspension, project moderation, logs
├── context/
│   ├── AuthContext.jsx         # User sessions, roles, and persona switching
│   └── DataContext.jsx         # Universal LocalStorage sync, escrow, contracts, chat
├── utils/
│   ├── storage.js              # Robust JSON storage sync & multi-tab listeners
│   ├── validation.js           # Form schema validators
│   └── formatters.js           # Currency, dates, relative time, and milestone math
├── data/
│   └── sampleData.js           # Initial pristine seed dataset
├── App.jsx                     # Route definitions & application layout
├── main.jsx                    # React 18 DOM root
└── index.css                   # SaaS design tokens, color palette, responsive grid
```

---

## 🚀 Running Locally

```bash
# Start development server
npm run dev

# Build production bundle
npm run build
```
Local dev server runs at: `http://localhost:3000/`.

