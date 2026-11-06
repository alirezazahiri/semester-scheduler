# Semester Scheduler

A web-based semester scheduling application for university students. It centralizes access to course offerings, builds a visual weekly timetable from selections, and helps spot scheduling conflicts during registration. The UI is primarily in Persian (RTL) and was developed for **Babol Noshirvani University of Technology** (`دانشگاه صنعتی نوشیروانی بابل`).

## Background

University course registration involves many constraints: course availability, timetable clashes, student preferences, and limited capacity. Handling these by hand makes planning error-prone for both students and administrators. This project provides a single place to browse offerings, compose a schedule, detect overlaps, and persist choices—supporting the real registration workflow used across several semesters.

## Tech stack

| Layer | Technology |
|--------|------------|
| Framework | [Next.js 13](https://nextjs.org/) (Pages Router) |
| UI | [Material UI (MUI) v5](https://mui.com/), Emotion |
| API | Next.js API routes |
| Database | [PostgreSQL](https://www.postgresql.org/) |
| ORM | [Prisma](https://www.prisma.io/) |
| Auth | [JWT](https://jwt.io/) (httpOnly cookies via `cookies-next`, `jsonwebtoken`) |
| Validation / forms | [Zod](https://zod.dev/), [React Hook Form](https://react-hook-form.com/) |
| SMS | [Kavenegar](https://kavenegar.com/) (`kavenegar` npm package) for OTP-related flows |
| Docs in app | [MDX](https://mdxjs.com/) (`/how-to-use/*`) |

Course catalog data is loaded from external JSON sources (configured via `DB_URI` in `next.config.js`); offerings are fetched per faculty/college code, matching the “scraped or aggregated offerings” part of the system design.

## Features

### Course discovery and selection

- **Multi-college catalog**: Loads courses for configured colleges/faculties (and shared programs such as general sciences, physical education, etc.).
- **Filters**: By college/faculty, by credit units (0.5–6), and **search** by course name, course code, or instructor (with Persian character normalization for Arabic/Persian ی/ک variants).
- **Pagination**: Long lists are paginated (20 items per page) with Persian numerals in the UI.
- **Gender-aware listing**: When the student profile includes gender, courses can be filtered to match gender-specific or mixed sections (see `GENDER_DICTIONARY` / `useAllCourses`).
- **Capacity visibility**: Each row shows enrolled/capacity; full sections are highlighted.

### Weekly timetable and schedule UX

- **Interactive grid**: Selected courses are mapped onto a **weekly schedule table** with standard time slots (`TABLE_HEADER_TIME_LIST`).
- **Per-day rows**: Saturday–Friday layout with course blocks showing name, group, professor, time range, and optional description tooltips.
- **Quick remove**: Clicking a block on the grid removes that course from the selection.
- **Mobile-friendly drawer**: Course list opens in a swipeable side drawer on smaller screens.
- **Print**: Print action on the main scheduler page (print styles hide chrome where applicable).
- **Save selection**: Floating action button persists the current course IDs to the database for the logged-in student.

### Conflict detection

- **Class time overlap**: When adding a course, the app checks against the current weekly plan and warns if sessions **overlap on the same day** (courses involved and weekdays are shown in the toast).
- **Exam overlap awareness**: If exam date/time metadata is present, the UI can warn when exam slots **clash on the same date** (with a detailed message).

### Chosen courses summary

- **Dedicated page** (`/chosen-courses`): Tabular view of selected courses with code, name, theory/practical units, professor, and exam date/time.
- **Copy course code**: One-click copy of a course code to the clipboard with feedback toasts.

### Accounts and security

- **Sign up**: Register with student id (`sid`), name, password (bcrypt-hashed), college, and gender.
- **Login / logout**: Session via JWT stored in cookies; token can be mirrored on the `Student` record for server-side checks.
- **Protected routes**: Main app pages use server-side redirects when the user is not authenticated.
- **Profile**: Update profile (`/auth/update-profile`), change password (`/auth/change-password`).
- **Phone number**: Flows to register and confirm a mobile number (OTP-backed steps under `/auth/confirm-phone-number` and related APIs).

### SMS and password recovery

- **OTP via SMS**: Uses Kavenegar for sending codes in verification / recovery flows (`pages/api/user/set-otp`, `check-otp-code`, etc.).
- **Password recovery** (`/password-recovery`): Recover access using the verified phone number and OTP, then set a new password (see `pages/api/user/recover-password`).

### Persistence

- **PostgreSQL + Prisma**: Students, hashed passwords, optional phone, JWT token field, and **saved course selections** (`Course` rows keyed by `sid` and `courseId`).
- **Load on login**: Previously saved courses are fetched and merged with live catalog data so returning students see their draft schedule.

### Settings, help, and UX polish

- **Settings hub** (`/settings`): Links to phone registration, password change, profile update, and about.
- **Theme**: Light/dark theming via `ThemeContext` / `ThemeSwitch`.
- **In-app guide**: MDX-based help at `/how-to-use` (signup/login, courses & scheduler, chosen courses, password/profile, theme).
- **About** (`/about`): Version label from constants.
- **404 page**: Custom not-found page.
- **Toasts**: User feedback for saves, errors, and conflicts (`react-hot-toast`).

## Project structure (high level)

| Area | Role |
|------|------|
| `pages/` | Routes and API handlers (`pages/api/**`) |
| `components/` | UI (scheduler, course list, auth forms, layout, navbar) |
| `context/` | React context (user, theme, selected courses, weekly plan, colleges) |
| `hooks/useAllCourses.ts` | Fetches catalog + restores saved selection |
| `prisma/` | Schema and migrations |
| `services/` | Client helpers (courses, student, SMS) |
| `utils/` | Time overlap, JWT, OTP, redirects, etc. |

## Environment variables

Configure these before running (see `next.config.js` for exposure to the client where noted):

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string for Prisma |
| `JWT_SECRET` | Secret for signing and verifying JWTs |
| `DB_URI` | Base URL for JSON course data (exposed to the client as `NEXT_APP_DB_URI`) |
| `KAVE_NEGAR_API_KEY` | Kavenegar API key for SMS |

Create a `.env` or `.env.local` file locally (do not commit secrets).

## Getting started

```bash
# Install dependencies
npm install

# Generate Prisma client & apply migrations (also run on build)
npx prisma migrate deploy
npx prisma generate

# Development
npm run dev
```

- **Production build** (from `package.json`): `npm run build` runs `prisma generate`, `prisma migrate deploy`, and `next build`.
- **Production server**: `npm run start`.
- **Lint**: `npm run lint`.

Ensure PostgreSQL is reachable and `DATABASE_URL` is set. Point `DB_URI` at the service that serves per-college JSON course lists.

## Deployment notes

The SMS helper references a public app URL in message bodies (see `services/textMessage.service.js`). Adjust sender, template, and receptor handling for your environment and Kavenegar account rules.

## Contact

If you have suggestions or questions, reach out via [itsalireza.zr@gmail.com](mailto:itsalireza.zr@gmail.com).
