$ErrorActionPreference = "Stop"

Write-Host "Iniciando sincronización con GitHub..." -ForegroundColor Cyan

# Añadir todos los cambios
git add .

# Verificar si hay cambios para commitear
if ($(git status --porcelain) -eq $null) {
    Write-Host "No hay cambios nuevos para subir." -ForegroundColor Yellow
} else {
    # Hacer commit con fecha actual
    $fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    git commit -m "Actualización automática: $fecha"
    
    # Subir cambios
    Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Cyan
    git push origin main
    
    if ($?) {
        Write-Host "¡ÉXITO! Tu página web ha sido actualizada." -ForegroundColor Green
    } else {
        Write-Host "Hubo un error al subir los cambios." -ForegroundColor Red
    }
}

Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
