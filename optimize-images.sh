#!/bin/bash

# Script para optimizar imágenes PNG a WebP
# Mantiene las imágenes originales y crea versiones WebP optimizadas

echo "🖼️  Iniciando optimización de imágenes..."

# Contador de imágenes procesadas
count=0

# Buscar todas las imágenes PNG en _posts
find _posts -type f -name "*.png" | while read -r img; do
    # Obtener el directorio y nombre base
    dir=$(dirname "$img")
    base=$(basename "$img" .png)
    
    # Crear versión WebP con calidad 85
    output="${dir}/${base}.webp"
    
    if [ ! -f "$output" ]; then
        echo "Convirtiendo: $img -> $output"
        cwebp -q 85 "$img" -o "$output" 2>/dev/null
        
        if [ $? -eq 0 ]; then
            # Mostrar tamaños
            original_size=$(du -h "$img" | cut -f1)
            webp_size=$(du -h "$output" | cut -f1)
            echo "  ✓ Original: $original_size | WebP: $webp_size"
            ((count++))
        else
            echo "  ✗ Error al convertir $img"
        fi
    else
        echo "  ⊘ Ya existe: $output"
    fi
done

echo ""
echo "✅ Optimización completada: $count imágenes convertidas a WebP"
echo ""
echo "📝 Nota: Las imágenes originales PNG se mantienen como fallback."
echo "   Para usar WebP en tus posts, actualiza las referencias de imágenes."