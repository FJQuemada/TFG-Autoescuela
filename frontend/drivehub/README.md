# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

⚛️ React / JavaScript/TypeScript (frontend)
Variables y funciones: camelCase

Constantes: UPPER_SNAKE_CASE (aunque a veces también camelCase si no es global)

Clases y componentes: PascalCase

Archivos: Normalmente PascalCase.js para componentes, o camelCase.js para utilidades

🐍 Django / Python (backend)
Variables y funciones: snake_case

Constantes: UPPER_SNAKE_CASE

Clases: CamelCase (más concretamente, PascalCase)

Módulos y archivos: snake_case.py

voy a usar localstorage en lugar de cookies pq para mi proyecto es mas manejable