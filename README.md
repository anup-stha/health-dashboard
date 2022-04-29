This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
cp .env.example .env
npm install
npm run dev
# or
cp .env.example .env
yarn install
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/_app.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use
the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Running e2e Cypress Tests

Check out [Cypress Documentation](https://docs.cypress.io/) for more info

```bash
npm run test
# or
yarn test
```

## Technologies Used

[React Query](https://react-query.tanstack.com/overview) for managing API Calls \
[React Hook Form](https://react-hook-form.com/api) for managing form states \
[Zustand](https://github.com/pmndrs/zustand) for managing client side data like auth \
[TailwindCSS](https://tailwindcss.com/docs) for UI \
[Framer Motion](https://www.framer.com/docs/) for animations

## Folder Structure

```
.storybook/           => contains Storybook Configuration
cypress/              => contains all cypress tests
public/               => contains all public assets like images and fonts.
src/
├── components/       => shared react components used in project.
├── layout/           => all layout components like Header, Footer etc.
├── models/           => types and interfaces used in project in .d.ts( No Need To Import ).
├── modules/          => contains components related to each domains like auth, members, etc.
├── pages/            => file based routing files in Next.js.
├── pages/app.tsx     => project Starting Point And Configuration.
├── pages/error.tsx   => project default error page.
├── routes/           => routes of website and related components.
├── services/         => 3rd party api and services
├── shared/           => shared HOC and hooks
├── utils/            => all utilities of the project
└── types.ts          => types and interfaces used in project ( Need to Import )
```
