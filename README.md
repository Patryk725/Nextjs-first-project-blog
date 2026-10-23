## Getting Started

### Set variables in `.env` and `.env.docker` (just remove `.example` from filename)

### Remove ".example" part in:

- `.env.example`
- `.env.docker.example`

...and fill it with valid data.

### Run `docker compose up -d` to run local containers

### Run `pnpm drizzle-kit push` to synchronize tables with db.

### Run the development server

```bash
npm run dev
# or
yarn dev
# or (preferred)
pnpm dev
# or
bun dev
```

### Open [http://localhost:3000](http://localhost:3000).

## Info

- I used `Next.js` <img src="https://skillicons.dev/icons?i=next" alt="Next.js icon" width="32" align="center"> to create and manage an app.

- I used `postgreSQL` <img src="https://skillicons.dev/icons?i=postgresql" alt="PostgreSQL icon" width="32" align="center"> as the database.

- I used `Git` <img src="https://skillicons.dev/icons?i=git " alt="Git and GitHub icons" width="32" align="center"> and `GitHub` <img src="https://skillicons.dev/icons?i=github" alt="Git and GitHub icons" width="32" align="center"> for version control.

- I used `Docker` <img src="https://skillicons.dev/icons?i=docker" alt="Docker icon" width="32" align="center"> to containerize app.

- I used <img src="https://skillicons.dev/icons?i=tailwind" alt="Tailwind CSS icon" width="32" align="center"> `Tailwind CSS` for easy and modern UI.

## Features

- Authorization, authentication
- Image server (uploadthing) with <Image> optimalization
- User dashboard with
  - Users Reviews list (no sort and filter tho)
  - Users blogs
- Dark and light theme on client side
- Static websies
  - Homepage (Strona główna)
  - About me page (O mnie)
  - About app (O stronie)

## Screenshots

### Homepage (light + dark mode)

![Homepage dark mode](readme_assets/homepage.png)
![Homepage light mode](readme_assets/homepage_dark.png)

Don't mind errors just like I do. (do the "lalala don't see it" technique).

### Articles (archive, single, add/edit)

![Article archive](readme_assets/articles.png)
![Article add](readme_assets/article.png)
![Article edit](readme_assets/article_add.png)

Single archive is zoomed to 70% to fit in the screenshot.

### Dashboard (users' articles + ratings)

![Dashboard](readme_assets/dashboard.png)
