# Clarence Portfolio Site

A modern, responsive portfolio website built with Angular 21 and Tailwind CSS v4. This project showcases a clean interface with smooth animations and server-side rendering support.

## Purpose

This portfolio website was created as a learning project to gain hands-on experience with:
- Angular framework and its latest features
- Tailwind CSS utility-first approach
- Modern TypeScript development
- Component-based architecture
- Server-side rendering

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher recommended)
- npm 10.9.3 or higher

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

### Development Server

Run the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building the Project

Build the project for production:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Server-Side Rendering

To run the SSR version:
```bash
npm run build
npm run serve:ssr:portfolio
```

### Running Tests

Execute the test suite:
```bash
npm test
```

### Build in Watch Mode

For development with automatic rebuilds:
```bash
npm run watch
```

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── about/          # About section component
│   │   ├── hero/           # Hero/landing section component
│   │   ├── journey/        # Journey/experience section component
│   │   ├── projects/       # Projects showcase component
│   │   ├── skills/         # Skills section component
│   │   ├── app.ts          # Root component
│   │   ├── app.routes.ts   # Application routes
│   │   └── app.config.ts   # Application configuration
│   ├── styles/             # Global styles and SCSS utilities
│   │   ├── _variables.scss # SCSS variables
│   │   ├── _mixins.scss    # SCSS mixins
│   │   └── _shared.scss    # Shared styles
│   └── index.html          # Main HTML file
├── public/                 # Static assets
├── angular.json            # Angular configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Project dependencies
```
