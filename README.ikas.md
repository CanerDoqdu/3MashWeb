# 3MashTemplate

An ikas code components project.

## Getting Started

1. Install dependencies with pnpm:
   ```bash
   pnpm install
   ```

   > This project relies on the pnpm patch configuration in `pnpm-lock.yaml` and `patches/@ikas__component-cli@2.6.1.patch`. Using npm skips that patch and can break the Windows build silently.

2. Start the development server:
   ```bash
   pnpm run dev
   ```

3. Open the ikas editor and connect to the dev server from the Dev Components panel.

## Commands

- `pnpm run dev` - Start development server with live editor updates
- `pnpm run build` - Build components for production
- `pnpm run add` - Add a new component to the project

## Project Structure

```
3MashTemplate/
├── src/
│   ├── components/
│   │   └── index.ts           # Auto-generated component exports
│   ├── global.css             # Unscoped global styles
│   └── global-types.ts        # Auto-generated shared enum types
├── ikas.config.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Building for Production

Run `pnpm run build` to compile your components. The output will be ready to upload to the ikas editor.
