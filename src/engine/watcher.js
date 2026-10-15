import fs from 'node:fs';
import path from 'node:path';

export function iniciarObservador(directorioMisiones, onCambio) {
    if (!fs.existsSync(directorioMisiones)) {
        console.warn(`Directorio no encontrado para observacion: ${directorioMisiones}`);
        return null;
    }

    let timeoutId = null;

    const watcher = fs.watch(directorioMisiones, { recursive: true }, (eventType, filename) => {
        if (!filename) return;
        // Ignorar temporales o editores
        if (filename.endsWith('.tmp') || filename.includes('.git') || filename.startsWith('.')) return;

        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            onCambio(filename);
        }, 150);
    });

    return watcher;
}
