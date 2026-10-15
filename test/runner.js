import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarTodo } from '../src/engine/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const VERDE = '\x1b[32m';
const ROJO = '\x1b[31m';
const AMARILLO = '\x1b[33m';
const RESET = '\x1b[0m';
const NEGRITA = '\x1b[1m';

console.log(`${NEGRITA}================================================================${RESET}`);
console.log(`${NEGRITA}  THE MARKUP PROTOCOL - SUITE DE AUDITORIA TECNICA (LMSGI UT-1) ${RESET}`);
console.log(`${NEGRITA}  IES Pio Baroja - Ciclo Superior DAM                           ${RESET}`);
console.log(`${NEGRITA}================================================================${RESET}\n`);

const resultado = validarTodo(ROOT_DIR);

resultado.misiones.forEach((m) => {
    const estadoStr = m.exito ? `${VERDE}[OK]   ${RESET}` : `${ROJO}[ERROR]${RESET}`;
    console.log(`${estadoStr} Mision ${m.id}: ${m.titulo}`);
    if (!m.exito) {
        console.log(`        ${AMARILLO}-> ${m.mensaje}${RESET}`);
        if (m.detalles && m.detalles.length > 0) {
            m.detalles.forEach((d) => console.log(`           ${d}`));
        }
    }
});

console.log('\n----------------------------------------------------------------');
console.log(`Resumen: ${resultado.superadas} de ${resultado.total} misiones auditadas (${resultado.porcentaje}%)`);
console.log('----------------------------------------------------------------\n');

if (resultado.superadas === resultado.total) {
    console.log(`${VERDE}${NEGRITA}AUDITORIA SUPERADA: Todos los sistemas de marcado cumplen los estandares.${RESET}\n`);
    process.exit(0);
} else {
    console.log(`${ROJO}AUDITORIA INCOMPLETA: Corrige los incidentes y vuelve a ejecutar 'npm test'.${RESET}\n`);
    process.exit(1);
}
