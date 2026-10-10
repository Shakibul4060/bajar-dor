# 🛒 Bazar Dor — বাজার দর

Bazar Dor is a Next.js web application designed to help users explore products, browse categories, and compare prices through a simple, user-friendly interface.

## ✨ Features

- Responsive homepage and navigation
- Product listing and product details pages
- Product categories and sorting options
- Price comparison interface
- User authentication pages
- User profile and profile update interface
- Bengali-language user interface

## 🧰 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- Lucide React
- React Hot Toast

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Shakibul4060/bajar-dor.git
   ```

2. Open the project directory:

   ```bash
   cd bajar-dor
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the required environment variables and authentication/database services according to your project setup.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Main Project Structure

```text
bajar-dor/
├── app/
│   ├── product/
│   ├── profile/
│   ├── signin/
│   ├── signup/
│   └── page.tsx
├── components/
├── lib/
├── public/
├── package.json
└── README.md
```

## Netlify Deployment

This repository is a Next.js application, not a plain static HTML site. The
root `netlify.toml` configures `npm run build` as the build command and `.next`
as the publish directory. Netlify handles the Next.js runtime automatically.
Do not use an empty build command or publish the repository root: the application
requires compilation and server-side routing.

The committed `package-lock.json` pins the dependency tree for reproducible
installs. Configure the application's required environment variables in Netlify
before deploying.

Authentication requires `MONGODB_URI` in the Netlify runtime environment.
Database validation and connections occur only when authentication is requested,
not when modules are imported during a build. Both profile pages render per
request rather than being prerendered. Missing runtime database configuration
still causes authentication requests to fail; it is not replaced with dummy data.

If a deployment stops during dependency installation, inspect the complete
deploy log for the first error. A log ending at "Installing dependencies" does
not identify the cause of a failure.

## 📌 Project Status

This project is being developed as part of a web development assignment.

## 👨‍💻 Author

**Shakibul**

GitHub: [Shakibul4060](https://github.com/Shakibul4060)
