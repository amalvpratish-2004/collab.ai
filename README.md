# collab.ai

A Next.js + TypeScript project for **collab.ai** (working title).  
(Note: this is an initial scaffold — features and documentation to be expanded.)

---

## Table of Contents

- [About](#about)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running Locally](#running-locally)  
  - [Environment Variables](#environment-variables)  
- [Folder Structure](#folder-structure)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## About

**collab.ai** is a web application built with Next.js and TypeScript.  
It is designed to facilitate collaborations (e.g. teams, projects, shared resources) — further details to be filled in as implementation evolves.

---

## Tech Stack

- **Next.js** (React framework)  
- **TypeScript**  
- Tailwind CSS and shadcn for modern UI designs 
- Drizzle (used as ORM / DB layer) — via `drizzle.config.ts`
- Postgres DB - Neon
- Stream sdk for real time video conferencing
- Vercel (preferred deployment)
- polar.sh for payment integration
- inngest for background jobs
- open ai platform for AI intergration
- Others (see `package.json` for full dependencies)  

---

## Features

*(To be updated as features are added)*

- User authentication & authorization  
- Meeting creation
- Agent creation with specializations of any kind
- Real-time collaboration or updates with the agent and other users
- Meeting summarisation and recording features  
- Responsive, modern UI  

---

## Getting Started

### Prerequisites

- Node.js (>= 16 recommended)  
- npm / yarn / pnpm  
- Database (e.g. PostgreSQL, MySQL, SQLite — as configured via Drizzle)  
- Environment variables (see below)  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/amalvpratish-2004/collab.ai.git
   cd collab.ai
