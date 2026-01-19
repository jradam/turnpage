# Turnpage 

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=fff)](https://astro.build/)
[![Next.js](https://img.shields.io/badge/Next.js-333333?logo=nextdotjs&logoColor=fff)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](https://supabase.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com/)
[![Bun](https://img.shields.io/badge/Bun-F472B6?logo=bun&logoColor=fff)](https://bun.sh/)

Turnpage is a static website generator specifically for authors, that (will) feature:
- A self-service CMS system 
- Simple but customisable website templates
- Custom domain linking  
- Stretch goals: email forwarding, e-commerce


## Installation

To get started, clone this repo and run `bun install`. Then add a `.env` file to the root of the project, following the example of `.env.example`.

> [!NOTE]
> This project has been set up using [bun](https://bun.sh/), but other package managers like npm or yarn could be substituted with some tweaks to the root `package.json`, `lefthook.yml`, and the `*.test.ts` files. 


## Getting started

### Scripts

- `bun dev` to run the dashboard and author template in parallel in development mode
- `bun dashboard` or `bun author` to run each project separately
- `bun build-all` then `bun start-all` to build and then start all projects in production mode
- `bun lint` and `bun test` to run linting and testing - [lefthook](https://github.com/evilmartians/lefthook/) also runs these automatically pre-commit
- `bun types` to use the Supabase CLI to generate types from the database schema  

### Notes for contributing

- Hoist general tooling to root `package.json`, keep project-specific packages with each project
- Import types and utilities from `@turnpage/shared`, not relative paths
- Run `bun types` after database changes to regenerate types from Supabase


## Architecture

- Authors manage their content through a Next.js dashboard
- Author data (profile, books, news) lives in Supabase
- The dashboard uses Supabase Auth, and Supabase Storage for images
- Each author gets their own static site built from a shared Astro template
- Author websites are served using Nginx on a Digital Ocean Droplet
- Each author's custom domain is configured in Cloudflare to point to our server
- Cloudflare also handles email forwarding to the author's personal email
- Authors are charged a subscription fee using Stripe Billing 

### User flows

**An author hits 'publish'**: the builder fetches their data, runs an Astro build, and deploys the static files to `/var/www/{author-slug}`.

**An end-user visits an author's site**: Cloudflare handles SSL and forwards the request to Nginx, which serves the correct files based on the domain.

### Costs
| Service | Purpose | Cost |
|---------|---------|------|
| Digital Ocean Droplet | Nginx server | Starting at £4 per month |
| Supabase | Database and file storage | £20 per month |
| Cloudflare | DNS, SSL, email forwarding | Free |
| Stripe | Billing | 1.5% + 20p per transaction |
|  |  | **Total: from £24 monthly** |
