# Guia de Otimização de Imagens - HatchCanvas Copy

## Formatos Recomendados

### WebP
- **Uso**: Imagens principais e fotografias
- **Compressão**: 25-35% menor que JPEG
- **Suporte**: Chrome, Firefox, Safari (iOS 14+), Edge

### AVIF
- **Uso**: Imagens de alta qualidade
- **Compressão**: 50% menor que JPEG
- **Suporte**: Chrome, Firefox (parcial)

### SVG
- **Uso**: Ícones, logos, ilustrações simples
- **Vantagens**: Escalável, pequeno tamanho
- **Otimização**: Minificar com SVGO

## Estratégias de Otimização

### 1. Responsive Images
```html
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Descrição" loading="lazy">
</picture>
```

### 2. Lazy Loading
```html
<img src="placeholder.jpg" 
     data-src="image.jpg" 
     loading="lazy" 
     alt="Descrição">
```

### 3. Tamanhos Múltiplos
```html
<img srcset="image-320w.jpg 320w,
             image-640w.jpg 640w,
             image-1024w.jpg 1024w"
     sizes="(max-width: 320px) 280px,
            (max-width: 640px) 600px,
            1024px"
     src="image-640w.jpg"
     alt="Descrição">
```

## Ferramentas de Otimização

### Online
- **TinyPNG**: PNG e JPEG
- **Squoosh**: Múltiplos formatos
- **SVGOMG**: SVG

### CLI
```bash
# ImageMagick
convert input.jpg -quality 85 -strip output.jpg

# cwebp (WebP)
cwebp -q 80 input.jpg -o output.webp

# SVGO
svgo input.svg -o output.svg
```

## Configurações Recomendadas

### JPEG
- **Qualidade**: 80-85%
- **Progressive**: Sim
- **Strip metadata**: Sim

### PNG
- **Compressão**: Máxima
- **Interlaced**: Não (para web)

### WebP
- **Qualidade**: 75-80%
- **Lossless**: Para imagens com transparência

### SVG
- **Minificar**: Sim
- **Remover comentários**: Sim
- **Otimizar paths**: Sim

## Implementação no Projeto

### Estrutura de Pastas
```
assets/
├── images/
│   ├── original/     # Imagens originais
│   ├── optimized/    # Imagens otimizadas
│   ├── webp/         # Versões WebP
│   ├── avif/         # Versões AVIF
│   └── thumbnails/   # Miniaturas
```

### CSS para Fallbacks
```css
.hero-image {
  background-image: url('image.jpg');
}

.webp .hero-image {
  background-image: url('image.webp');
}

.avif .hero-image {
  background-image: url('image.avif');
}
```

### JavaScript para Detecção
```javascript
// Detectar suporte WebP
function supportsWebP() {
  return new Promise(resolve => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

// Aplicar classe ao body
supportsWebP().then(supported => {
  if (supported) {
    document.body.classList.add('webp');
  }
});
```

## Métricas de Performance

### Antes da Otimização
- **Tamanho médio**: 500KB por imagem
- **Tempo de carregamento**: 3-5 segundos
- **LCP**: > 4 segundos

### Após Otimização
- **Tamanho médio**: 150KB por imagem
- **Tempo de carregamento**: 1-2 segundos
- **LCP**: < 2.5 segundos

## Checklist de Otimização

- [ ] Converter imagens para WebP/AVIF
- [ ] Implementar lazy loading
- [ ] Usar responsive images
- [ ] Minificar SVGs
- [ ] Configurar cache headers
- [ ] Testar em diferentes dispositivos
- [ ] Medir Core Web Vitals
- [ ] Implementar fallbacks
- [ ] Otimizar para retina displays
- [ ] Usar CDN se necessário

## Automação

### Gulp Task
```javascript
gulp.task('images', () => {
  return gulp.src('src/images/**/*')
    .pipe(imagemin([
      imagemin.mozjpeg({quality: 85}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(gulp.dest('dist/images'));
});
```

### Webpack Loader
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 85
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 80
              }
            }
          },
        ],
      },
    ],
  },
};
```