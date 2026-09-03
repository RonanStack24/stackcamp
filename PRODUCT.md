# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are independent builders, software developers, engineers (IT and electronics), architects, creators, students, and innovators. They arrive seeking refuge from noisy, engagement-driven social feeds to quietly document authentic daily build progress, discover thoughtful peer projects, and find aligned collaborators.

## Product Purpose

Stackcamp is a cozy digital campsite where creators gather, share progress, and build meaningful things together. Success means delivering a slower, craft-focused space that honors real building milestones, mutual encouragement, and steady craft over vanity metrics.

## Positioning

Unlike mainstream algorithmic developer platforms or fast-paced social networks that reward hype and metrics, Stackcamp offers a warm, retro campsite retreat. The campsite metaphor (campfire rosters, build logs, passports, cabins) grounds collaboration in quiet presence, creative sanctuary, and peer camaraderie.

## Operating Context

Builders drop in during late-night build sessions, morning check-ins, or project milestones to log work, reflect, and see who is at camp. The product operates in standard modern web browsers on desktop and mobile, with local development running via Vite and PHP, deployed to shared PHP/MySQL hosting (InfinityFree).

## Capabilities and Constraints

- Confirmed capabilities:
  - Camper registration and live camper roster (`backend/api.php`)
  - Persistent community build logs (`backend/logs.php`)
  - Session-aware visitor counter (`backend/counter.php`)
  - Dual ambiance themes: Night Forest and Sakura Morning with ambient particles (fireflies, petals)
  - Builder passport generator, project showcase with reaction simulator, collaboration request board, and community cabin simulator
  - Guild founder and collective story showcase
- Technical constraints:
  - Frontend: React 19, TypeScript, Vite, Tailwind CSS 4, Motion, Lucide React
  - Backend: PHP 8 with MySQL database
  - Hosting: Must remain fully deployable to low-cost or shared PHP/MySQL hosting (InfinityFree) using static/Vite export and PHP API structure without mandatory cloud dependencies
- Explicitly open decisions:
  - Depth of authentication system (lightweight camper handles vs passworded accounts with sessions)
  - Real-time cabin discussion mechanics and moderation controls

## Brand Commitments

- Name: Stackcamp
- Identity & Vibe: Warm retro campsite, pixel-art aesthetic, ambient fireflies and petals, cozy pixel-forest backgrounds
- Voice & Tone: Welcoming, humble, craft-respectful, calm, and grounded; free of corporate jargon, artificial urgency, and hustle hype
- Roots: Founded by a multidisciplinary collective from information technology, software development, electronics engineering, and architecture in the Philippines, led by RonanStack24

## Evidence on Hand

- Runnable full-stack codebase with frontend components in `src/` and PHP endpoints in `backend/`
- MySQL schema definitions in `backend/schema.sql` and `backend/schema.infinityfree.sql`
- Automated deployment scripts for shared hosting in `scripts/prepare-infinityfree.ps1` and `scripts/deploy-infinityfree.ps1`
- Pixel art backgrounds and theme tokens implemented across `src/components/` and `src/index.css`

## Product Principles

1. **Craft Over Noise**: Value deliberate, incremental progress and genuine build logs over algorithmic feeds and vanity metrics.
2. **Warmth and Shelter**: Maintain an unhurried, hospitable campsite atmosphere where makers of all experience levels feel welcome to share work-in-progress.
3. **Frictionless and Accessible**: Keep the architecture lightweight, accessible, and easily hosted on modest infrastructure so the platform remains durable and free from heavy overhead.
4. **Metaphor with Substance**: Use the campsite motifs (campfires, cabins, logs, passports) to clarify community functions rather than decorative novelty.

## Accessibility & Inclusion

- Keyboard navigability across all modals, interactive campfire elements, and forms
- Legible text contrast preserved across both dark (Night Forest) and light (Sakura Morning) themes
- Respect `prefers-reduced-motion` for ambient canvas animations (floating fireflies, falling petals, pixel forest transitions)
