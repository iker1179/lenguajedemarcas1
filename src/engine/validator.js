import fs from 'node:fs';
import path from 'node:path';
import { XMLParser, XMLValidator } from 'fast-xml-parser';

export function validarMision01(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '01_taxonomia', 'clasificacion.json');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo clasificacion.json no encontrado' };
    }

    try {
        const contenido = fs.readFileSync(ruta, 'utf-8');
        const data = JSON.parse(contenido);
        const l = data.lenguajes || {};

        const esperados = {
            xml: { tipo: 'descriptivo', desacoplado: true },
            html5: { tipo: 'descriptivo', desacoplado: true },
            json: { tipo: 'descriptivo', desacoplado: true },
            yaml: { tipo: 'descriptivo', desacoplado: true },
            latex: { tipo: 'procedimental', desacoplado: false },
            postscript: { tipo: 'procedimental', desacoplado: false }
        };

        const errores = [];
        for (const [k, esp] of Object.entries(esperados)) {
            const item = l[k];
            if (!item || item.tipo_marcado === 'PENDIENTE') {
                errores.push(`El lenguaje '${k}' no ha sido completado.`);
                continue;
            }
            const tipoNormalizado = String(item.tipo_marcado).toLowerCase().trim();
            if (tipoNormalizado !== esp.tipo) {
                errores.push(`'${k}': tipo_marcado incorrecto (se esperaba '${esp.tipo}', recibido '${tipoNormalizado}').`);
            }
            if (item.desacoplado_presentacion !== undefined && item.desacoplado_presentacion !== esp.desacoplado) {
                // si el alumno uso desacoplado_presentacion
            }
        }

        if (errores.length > 0) {
            return { exito: false, mensaje: 'Clasificacion incompleta o con discrepancias tecnicas', detalles: errores };
        }

        return { exito: true, mensaje: 'Clasificacion taxonomica formalmente validada' };
    } catch (err) {
        return { exito: false, mensaje: `Error de sintaxis JSON en clasificacion.json: ${err.message}` };
    }
}

export function validarMision02(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '02_xml_well_formed', 'microservicio.xml');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo microservicio.xml no encontrado' };
    }

    const xml = fs.readFileSync(ruta, 'utf-8');
    const valResult = XMLValidator.validate(xml);

    if (valResult !== true) {
        const err = valResult.err || {};
        return {
            exito: false,
            mensaje: `El documento XML no esta bien formado: ${err.msg || 'Error sintactico'}`,
            detalles: [`Linea: ${err.line || '?'}, Columna: ${err.col || '?'}`]
        };
    }

    try {
        const parser = new XMLParser({ ignoreAttributes: false });
        const obj = parser.parse(xml);

        if (!obj.microservicio) {
            return { exito: false, mensaje: 'El elemento raiz debe ser exactamente <microservicio>.' };
        }
        if (xml.includes('<registro_auditoria') && !xml.includes('</microservicio>\n<registro_auditoria')) {
            // ver si registro_auditoria quedo dentro o fue absorbido
        }
        const ms = obj.microservicio;
        if (!ms['@_id'] || !ms['@_id'].includes('AUTH')) {
            return { exito: false, mensaje: 'Falta el atributo id con comillas en <microservicio>.' };
        }

        return { exito: true, mensaje: 'Documento microservicio.xml bien formado y validado por el parser' };
    } catch (e) {
        return { exito: false, mensaje: `Error al generar el arbol DOM: ${e.message}` };
    }
}

export function validarMision03(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '03_arbol_nodos', 'inventario_lab.xml');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo inventario_lab.xml no encontrado' };
    }

    const xml = fs.readFileSync(ruta, 'utf-8');
    const valResult = XMLValidator.validate(xml);

    if (valResult !== true) {
        const err = valResult.err || {};
        return {
            exito: false,
            mensaje: `XML mal formado en inventario_lab.xml: ${err.msg || 'Sintaxis invalida'}`,
            detalles: [`Linea: ${err.line || '?'}, Columna: ${err.col || '?'}`]
        };
    }

    const parser = new XMLParser({ ignoreAttributes: false });
    const obj = parser.parse(xml);
    const lab = obj.laboratorio;

    if (!lab) {
        return { exito: false, mensaje: 'Falta el elemento raiz <laboratorio>.' };
    }
    if (lab['@_codigo'] !== 'LAB-01') {
        return { exito: false, mensaje: 'La raiz <laboratorio> debe tener el atributo codigo="LAB-01".' };
    }
    if (!lab.puestos || !lab.puestos.puesto) {
        return { exito: false, mensaje: 'Falta el contenedor <puestos> con elementos <puesto>.' };
    }

    const puestos = Array.isArray(lab.puestos.puesto) ? lab.puestos.puesto : [lab.puestos.puesto];
    if (puestos.length < 2) {
        return { exito: false, mensaje: 'Se requieren al menos dos elementos <puesto> en <puestos>.' };
    }
    for (const p of puestos) {
        if (!p['@_id']) return { exito: false, mensaje: 'Cada <puesto> debe tener un atributo id.' };
        if (!p.procesador) return { exito: false, mensaje: 'Cada <puesto> debe contener <procesador>.' };
        if (!p.ram) return { exito: false, mensaje: 'Cada <puesto> debe contener <ram>.' };
        if (!p.sistema_operativo) return { exito: false, mensaje: 'Cada <puesto> debe contener <sistema_operativo>.' };
    }

    if (!lab.red || !lab.red.switches || !lab.red.puntos_acceso) {
        return { exito: false, mensaje: 'El elemento <red> debe contener <switches> y <puntos_acceso>.' };
    }
    const switches = Array.isArray(lab.red.switches.switch) ? lab.red.switches.switch : (lab.red.switches.switch ? [lab.red.switches.switch] : []);
    if (switches.length < 2) {
        return { exito: false, mensaje: 'Se requieren al menos dos elementos <switch> con atributo id.' };
    }

    return { exito: true, mensaje: 'Jerarquia de inventario_lab.xml conforme al modelo de arbol' };
}

export function validarMision04(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '04_xml_vs_json', 'payload_eval.json');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo payload_eval.json no encontrado' };
    }

    try {
        const contenido = fs.readFileSync(ruta, 'utf-8');
        const data = JSON.parse(contenido);
        const evalua = data.auditoria_rendimiento || {};

        if (String(evalua.formato_menor_sobrecarga).toLowerCase().trim() !== 'json') {
            return { exito: false, mensaje: 'formato_menor_sobrecarga debe ser "json" debido a la ausencia de etiquetas de cierre duplicadas.' };
        }
        if (String(evalua.razon_principal_sobrecarga_xml).toLowerCase().trim() !== 'etiquetas_cierre_redundantes') {
            return { exito: false, mensaje: 'razon_principal_sobrecarga_xml debe identificar "etiquetas_cierre_redundantes".' };
        }
        if (String(evalua.soporte_tipos_nativos).toLowerCase().trim() !== 'json') {
            return { exito: false, mensaje: 'soporte_tipos_nativos debe ser "json" (numeros, booleanos y arrays sin esquemas externos).' };
        }
        if (!evalua.justificacion_computacional || evalua.justificacion_computacional === 'PENDIENTE') {
            return { exito: false, mensaje: 'Falta redactar la justificacion_computacional sobre el coste de parseo DOM vs JSON.' };
        }

        return { exito: true, mensaje: 'Auditoria comparativa de payload y tipado completada con rigor' };
    } catch (e) {
        return { exito: false, mensaje: `Sintaxis JSON invalida en payload_eval.json: ${e.message}` };
    }
}

export function validarMision05(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '05_json_strict', 'gateway_config.json');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo gateway_config.json no encontrado' };
    }

    const contenido = fs.readFileSync(ruta, 'utf-8');

    // Comprobaciones estricas previas de RFC 8259
    if (/'/.test(contenido)) {
        return { exito: false, mensaje: 'El estandar RFC 8259 no admite comillas simples para strings.' };
    }
    if (/\bTrue\b|\bFalse\b|\bNone\b/.test(contenido)) {
        return { exito: false, mensaje: 'Valores booleanos deben ser en minusculas ("true", "false", "null").' };
    }
    if (/,\s*[\]\}]/.test(contenido)) {
        return { exito: false, mensaje: 'Trailing comma detectada: JSON estricto no permite comas tras el ultimo elemento.' };
    }

    try {
        const data = JSON.parse(contenido);
        if (!data.nombre_nodo || !data.ip_publica || !data.puertos_habilitados) {
            return { exito: false, mensaje: 'Faltan propiedades esenciales en gateway_config.json.' };
        }
        if (data.modo_estricto !== true) {
            return { exito: false, mensaje: 'modo_estricto debe ser true booleano.' };
        }

        return { exito: true, mensaje: 'gateway_config.json cumple estrictamente con el estandar RFC 8259' };
    } catch (e) {
        return { exito: false, mensaje: `Fallo al procesar con JSON.parse(): ${e.message}` };
    }
}

export function validarMision06(baseDir = process.cwd()) {
    const ruta = path.join(baseDir, 'misiones', '06_namespaces', 'sensores_red.xml');
    if (!fs.existsSync(ruta)) {
        return { exito: false, mensaje: 'Archivo sensores_red.xml no encontrado' };
    }

    const xml = fs.readFileSync(ruta, 'utf-8');
    const valResult = XMLValidator.validate(xml);

    if (valResult !== true) {
        const err = valResult.err || {};
        return {
            exito: false,
            mensaje: `XML mal formado en sensores_red.xml: ${err.msg || 'Sintaxis invalida'}`,
            detalles: [`Linea: ${err.line || '?'}, Columna: ${err.col || '?'}`]
        };
    }

    if (!xml.includes('xmlns:hw') || !xml.includes('xmlns:net')) {
        return { exito: false, mensaje: 'El elemento raiz <sistema> debe declarar los atributos xmlns:hw y xmlns:net.' };
    }
    if (!xml.includes('<hw:dispositivo') || !xml.includes('<net:dispositivo')) {
        return { exito: false, mensaje: 'Los elementos <dispositivo> deben cualificarse con sus prefijos respectivos <hw:dispositivo> y <net:dispositivo>.' };
    }

    return { exito: true, mensaje: 'Colision semantica resuelta exitosamente mediante espacios de nombres' };
}

export function validarTodo(baseDir = process.cwd()) {
    const r1 = validarMision01(baseDir);
    const r2 = validarMision02(baseDir);
    const r3 = validarMision03(baseDir);
    const r4 = validarMision04(baseDir);
    const r5 = validarMision05(baseDir);
    const r6 = validarMision06(baseDir);

    const resultados = [
        { id: '01', titulo: 'Taxonomia de lenguajes de marcado', ...r1 },
        { id: '02', titulo: 'Documento XML bien formado', ...r2 },
        { id: '03', titulo: 'Modelado en arbol de nodos', ...r3 },
        { id: '04', titulo: 'Comparativa de payload y rendimiento XML vs JSON', ...r4 },
        { id: '05', titulo: 'Sintaxis estricta JSON RFC 8259', ...r5 },
        { id: '06', titulo: 'Espacios de nombres (Namespaces) en XML', ...r6 }
    ];

    const superadas = resultados.filter(r => r.exito).length;
    return {
        total: resultados.length,
        superadas,
        porcentaje: Math.round((superadas / resultados.length) * 100),
        misiones: resultados
    };
}
