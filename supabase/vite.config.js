// Configuração do Vite para o projeto Supabase
import { defineConfig } from 'vite';

export default defineConfig({
  // Diretório de entrada
  root: '../',
  
  // Diretório de saída do build
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,
  },
  
  // Configurações de otimização
  optimizeDeps: {
    include: ['@supabase/supabase-js'],
  },
  
  // Configurações de resolução de módulos
  resolve: {
    alias: {
      '@': '../',
      '~': '../',
    },
  },
  
  // Configurações de assets
  assetsInclude: ['**/*.svg', '**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
});