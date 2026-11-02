# ApplyFlow

A learning project for tracking job applications. This repository currently contains a dashboard, a vacancy list and an interview overview built with React, Vite, React Router and styled-components.

**Demo only:** the companies, dates, salary figures and statuses in `src/data/vacancies.js` are sample records. They do not represent real applications or interviews.

## Run locally

```bash
npm ci
npm run dev
```

See `package.json` for available build and lint commands.

## Current scope

- Dashboard with counts calculated from the example vacancy records
- Vacancy and interview summaries
- Navigation between the current routes

This is a work in progress. Data persistence, complete CRUD workflows, and real integrations are not claimed to be implemented.

## Visual approach

A quiet, neutral UI with one restrained accent. Changes were made as a conservative *unslop* pass, without adding decorative effects. The review followed [Damir Sokolovsky's unslop skill](https://github.com/heydamir/unslop) (CC BY 4.0).
