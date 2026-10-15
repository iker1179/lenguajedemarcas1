import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarTodo } from './validator.js';
import { iniciarObservador } from './watcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const UI_DIR = path.resolve(__dirname, '..', 'ui');
const MISIONES_DIR = path.resolve(ROOT_DIR, 'misiones');

const PUERTO = process.env.PORT || 3000;
const clientesSSE = new Set();

function notificarClientes() {
    const estado = validarTodo(ROOT_DIR);
    const payload = `data: ${JSON.stringify(estado)}\n\n`;
    for (const res of clientesSSE) {
        try {
            res.write(payload);
        } catch {
            clientesSSE.delete(res);
        }
    }
}

iniciarObservador(MISIONES_DIR, (ficheroModificado) => {
    console.log(`[EVENTO] Cambio detectado en: ${ficheroModificado}`);
    notificarClientes();
});

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/api/estado') {
        const estado = validarTodo(ROOT_DIR);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(estado, null, 2));
        return;
    }

    if (url.pathname === '/api/stream') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });
        clientesSSE.add(res);

        // Envío inicial
        const estadoInicial = validarTodo(ROOT_DIR);
        res.write(`data: ${JSON.stringify(estadoInicial)}\n\n`);

        req.on('close', () => {
            clientesSSE.delete(res);
        });
        return;
    }

    // Servir estáticos
    let archivoDestino = path.join(UI_DIR, url.pathname === '/' ? 'index.html' : url.pathname);
    if (!fs.existsSync(archivoDestino)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Recurso no encontrado');
        return;
    }

    const ext = path.extname(archivoDestino).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html; charset=utf-8',
        '.js': 'application/javascript; charset=utf-8',
        '.css': 'text/css; charset=utf-8',
        '.json': 'application/json; charset=utf-8'
    };

    const mime = mimeTypes[ext] || 'text/plain; charset=utf-8';
    res.writeHead(200, { 'Content-Type': mime });
    fs.createReadStream(archivoDestino).pipe(res);
});

server.listen(PUERTO, () => {
    console.log('====================================================');
    console.log('THE MARKUP PROTOCOL - SERVIDOR DE AUDITORIA ACTIVO');
    console.log(`Acceso al dashboard local: http://localhost:${PUERTO}`);
    console.log('Modo en vivo activado (SSE y observador de misiones)');
    console.log('====================================================');
});
