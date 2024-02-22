<p align="center">
  <img style="border-width: 0" width="auto" height="400" src="./src/assets/logo.png" alt="ecom logo">
</p>

# JustJoking

Ecommerce-Support : Customer Support Service Application using CallChimp TypeScript SDK

---

## Screenshots

### Mobile Device:

<img src="./src/assets/mobile_SS.png" height='500px'>
<img src="./src/assets/mobile_SS_2.png" height='500px'>

### Laptop Device:

<img src="./src/assets/desktop_SS.png" height='500px'>
<img src="./src/assets/desktop_SS_2.png" height='500px'>

## Tech/ Framework Used

- ReactJS
- Bootstrap
- React Router
- React Icons
- Axios
- callchimp TypeScript SDK

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
