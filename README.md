

## Setup and run instructions

For running app in local:

```bash
npm install
npm run dev

```
## Concise description of the architecture

1. Frontend (Next.js + React + TailwindCSS)

Canvas Area (fabric.js)

Manages drawing surface.

Supports adding images, text, layers, and object transformations.

Toolbar

Handles actions: upload image, add text, export, undo/redo, reset.

Layer Sidebar

Lists and manages layers (objects).

Selecting a layer makes it active in the canvas.

Side Panel

Exposes editable properties (color, font, alignment, etc.) of the active object.


2. State Management

React hooks (useState, useRef) for local state.

fabric.Canvas instance stored in useRef for direct manipulation.

Undo/redo stack managed using arrays (history + future states).

3. File Handling

Image Uploads: HTML file input → FileReader → add as background image.

Export: Convert canvas to PNG via canvas.toDataURL() and trigger download.

## Technology Choices & Trade-offs

1. Next.js (React framework)

Server-side rendering (SSR) & static generation (SEO-friendly).

Built-in image optimization, fast refresh, hybrid rendering.

2. React (UI library)

Declarative, component-based architecture → reusable UI.

Large ecosystem (hooks, context, community libraries).

Works well with canvas wrappers like fabric.js.

3. Tailwind CSS (Styling)

Utility-first → rapid UI prototyping.

Consistent design system without writing custom CSS repeatedly.

Small final bundle size (purges unused classes).

## Known limitations

1. Redo and undo - I tried to implement but on undo and redo in canvas resulting to a blank screen so avoided that peice of code 