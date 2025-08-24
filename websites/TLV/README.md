# SproutSpace (BASE∞ Static Site)

This is a complete, production-ready static website for **SproutSpace**, an eco-friendly co-working space in Tel Aviv. It's built with vanilla HTML, CSS, and JavaScript, focusing on performance, accessibility, and modern design.

## Features

* **Multi-Page Architecture**: Home, About, Pricing, and Contact pages.
* **Modern & Responsive Design**: Clean, green-themed aesthetic that works beautifully on all devices.
* **Light/Dark Mode**: User-toggleable theme with preferences saved to `localStorage`.
* **Bilingual (EN/HE)**: Simple, dictionary-based internationalization with full RTL support for Hebrew.
* **Performance Optimized**: No external frameworks, deferred scripts, and a minimal footprint.
* **SEO & a11y Ready**: Semantic HTML, proper meta tags, JSON-LD structured data, and accessible navigation.

## Quick Start

1.  **Clone the repository.**
2.  **Serve the files locally.** You can use any simple static server. With Python 3:
    ```bash
    python3 -m http.server
    ```
3.  Open `http://localhost:8000` in your browser.

## Deployment

Deploying this static site is straightforward.

### GitHub Pages

1.  Push the code to a new repository on GitHub.
2.  Go to your repository's **Settings** > **Pages**.
3.  Under **Build and deployment**, select **Deploy from a branch**.
4.  Choose the `main` branch and the `/ (root)` folder. Save.
5.  Your site will be live in a few minutes.

### Firebase Hosting

1.  Install the Firebase CLI: `npm install -g firebase-tools`.
2.  Log in: `firebase login`.
3.  Initialize your project: `firebase init hosting`.
    * When asked for the public directory, enter `.` (the current directory).
    * Configure as a single-page app? **No**.
    * Set up automatic builds and deploys with GitHub? **(Optional)**
4.  Deploy your site:
    ```bash
    firebase deploy
    ```

## File Structure
