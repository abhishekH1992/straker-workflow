
# Straker Workflow

## Table of Content
- [Overview](#overview)
- [How to use it](#how-to-use-it)
- [Technology](#technology)
- [Project Setup](#project-setup)
- [Future Scope](#future-scope)

## Overview
Create a Single-Page Application (SPA) using Nuxt, Vue, and Vuetify that allows users to drag and drop pre-defined components onto a canvas and connect them to build a workflow or graph.

## Usage
- Select shape
- Drag and drop the shapes
- Double-click on a shape to start drawing a line, then double-click on another shape to connect them.
- Click save to save the current state
- Load to load stored state

## Technology
```Nuxt, Vue, Vuetify, Tailwind```

## Project Setup
### Clone Git Repository
```
git clone https://github.com/abhishekH1992/straker-workflow.git
```
### Install NPM Dependency
```
npm i
```
### Run project
```
npm run dev
```

## Future Scope
- Design more Shapes & Lines with CSS
- Resize tool - write a more effective logic to resize these shapes (there are third party packages for resize like `vue-draggable-resizable` but custom logic for resize will be more effective)
- Add authentication
- Store values in DB instead of localStorage
- Write a non-blocking/async API logic to store values in DB