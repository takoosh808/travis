# Travis — Project portfolio

A responsive static portfolio with ten projects, category filters, and accessible project detail dialogs. Built with vanilla JavaScript, CSS, and Vite. Project descriptions draw on the Markdown documents in this repository and the supplied project summaries. Status labels distinguish prototypes, requirements, and roadmap features. Illustrations are decorative, not screenshots of the original applications.

## Local development

Requires Node.js 22.12+ (Node.js 24 recommended).

```sh
npm ci
npm run dev
```

## Production and free hosting

```sh
npm run build
```

Deploy the generated `dist` folder to a static host. For Netlify, import this GitHub repository, use `npm run build` as the build command and `dist` as the publish directory. No backend or environment secrets are needed. Relative asset paths also support hosting under a subdirectory.

## Editing

Project content is in `src/projects.js`; homepage content is in `index.html`; visual styling is in `src/style.css`. “Travis” is the provisional personal name used in the design. The six original project Markdown documents are preserved as supplied.
