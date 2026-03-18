import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/how-long-app.ts',
      formats: ['es']
    }
  }
});
