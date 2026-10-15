| <img src="logoIES.jpg" alt="IES Pío Baroja" width="90"> | **IES Pío Baroja**<br>Departamento de Informática<br>Ciclo Superior DAM | **Lenguajes de marcas y sistemas de gestión de información**<br>UT-1. Características y clasificación de los lenguajes de marcas |
|---|---|---|

# Guía docente y solucionario: The Markup Protocol

Material exclusivo para el profesorado del IES Pío Baroja. Contiene la fundamentación didáctica, la matriz de evaluación y las soluciones modelo para la dinamización en aula.

## 1. Ponderación por Criterios de Evaluación

| Misión | Criterios de Evaluación | Ponderación | Descripción de la competencia |
|---|---|---|---|
| **01** | `CE1a`, `CE1c`, `CE1d`, `CE1e` | 1,5 puntos | Clasificación formal de lenguajes de marcas según su tipología y propósito. |
| **02** | `CE1b`, `CE1g`, `CE1h` | 2,0 puntos | Detección y corrección de reglas de documento XML bien formado ante excepciones de parser. |
| **03** | `CE1b`, `CE1f`, `CE1g` | 2,0 puntos | Modelado estructurado en árbol de nodos, diferenciando atributos de elementos hijos. |
| **04** | `CE1b`, `CE1d`, `CE1f` | 1,5 puntos | Análisis de sobrecarga de datos en red (XML vs JSON) y coste de parseo DOM. |
| **05** | `CE1g`, `CE1h` | 1,5 puntos | Rigor sintáctico del estándar JSON RFC 8259 frente a permisividad de código cliente. |
| **06** | `CE1i`, `CE1g` | 1,5 puntos | Resolución de ambigüedades y colisiones semánticas mediante espacios de nombres (`xmlns`). |
| **Total** | `RA1` completo | **10 puntos** | Calificación final de la actividad práctica de auditoría. |

<div class="page-break"></div>

## 2. Solucionario modelo comentado

### Misión 01: Taxonomía de lenguajes (`clasificacion.json`)
```json
{
  "lenguajes": {
    "xml": {
      "tipo_marcado": "descriptivo",
      "proposito_principal": "Almacenamiento e intercambio estructurado de datos entre sistemas heterogéneos",
      "desacoplamiento_presentacion": true
    },
    "html5": {
      "tipo_marcado": "descriptivo",
      "proposito_principal": "Estructuración semántica de contenidos para su renderizado en navegadores web",
      "desacoplamiento_presentacion": true
    },
    "json": {
      "tipo_marcado": "descriptivo",
      "proposito_principal": "Formato ligero de intercambio de datos y serialización de objetos en APIs REST",
      "desacoplamiento_presentacion": true
    },
    "yaml": {
      "tipo_marcado": "descriptivo",
      "proposito_principal": "Serialización legible de configuraciones de despliegue y pipelines CI/CD",
      "desacoplamiento_presentacion": true
    },
    "latex": {
      "tipo_marcado": "procedimental",
      "proposito_principal": "Composición tipográfica y edición de documentos científicos de alta calidad",
      "desacoplamiento_presentacion": false
    },
    "postscript": {
      "tipo_marcado": "procedimental",
      "proposito_principal": "Lenguaje de descripción de páginas orientado a dispositivos de impresión",
      "desacoplamiento_presentacion": false
    }
  }
}
```

### Misión 02: XML bien formado (`microservicio.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<microservicio id="AUTH-SERVICE" version="2.4.0">
    <identificacion>
        <nombre>Servicio de Autenticacion Central</nombre>
        <entorno>produccion</entorno>
    </identificacion>
    <red>
        <host>auth.cluster.internal</host>
        <puerto>8443</puerto>
        <ssl habilitado="true"/>
    </red>
    <politicas>
        <sesion timeout_minutos="15">
            <max_reintentos>3</max_reintentos>
        </sesion>
    </politicas>
    <registro_auditoria nivel="INFO"/>
</microservicio>
```
*Correcciones aplicadas:*
1. Atributo `id="AUTH-SERVICE"` delimitado entre comillas.
2. Cierre de `<puerto>` en minúsculas en lugar de `</Puerto>`.
3. Cierre explícito de `<max_reintentos>3</max_reintentos>`.
4. Inclusión del elemento `<registro_auditoria>` dentro de la raíz única `<microservicio>`.

<div class="page-break"></div>

### Misión 03: Árbol de nodos (`inventario_lab.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<laboratorio codigo="LAB-01">
    <puestos>
        <puesto id="PC-01">
            <procesador>Intel Core i7-13700</procesador>
            <ram unidades="GB">32</ram>
            <sistema_operativo>Ubuntu Linux 24.04</sistema_operativo>
        </puesto>
        <puesto id="PC-02">
            <procesador>AMD Ryzen 7 7800X3D</procesador>
            <ram unidades="GB">64</ram>
            <sistema_operativo>Debian 12</sistema_operativo>
        </puesto>
    </puestos>
    <red>
        <switches>
            <switch id="SW-01">Cisco Catalyst 2960</switch>
            <switch id="SW-02">Ubiquiti EdgeSwitch 24</switch>
        </switches>
        <puntos_acceso>
            <punto_acceso id="AP-01">UniFi U6 Pro</punto_acceso>
        </puntos_acceso>
    </red>
</laboratorio>
```

### Misión 04: Comparativa XML vs JSON (`payload_eval.json`)
```json
{
  "auditoria_rendimiento": {
    "formato_menor_sobrecarga": "json",
    "razon_principal_sobrecarga_xml": "etiquetas_cierre_redundantes",
    "soporte_tipos_nativos": "json",
    "justificacion_computacional": "JSON mapea directamente a estructuras de datos nativas del lenguaje mediante un analizador lexico lineal, mientras que XML requiere construir un arbol DOM completo con nodos de elementos, atributos y texto, generando mayor consumo de memoria y ciclos de CPU."
  }
}
```

<div class="page-break"></div>

### Misión 05: Sintaxis JSON estricta (`gateway_config.json`)
```json
{
    "nombre_nodo": "Gateway-Principal-DMZ",
    "ip_publica": "198.51.100.25",
    "puertos_habilitados": [
        80,
        443,
        8443
    ],
    "modo_estricto": true,
    "ssl": {
        "certificado": "/etc/ssl/gateway.crt",
        "clave_privada": "/etc/ssl/gateway.key"
    }
}
```
*Correcciones aplicadas:*
1. Clave `"nombre_nodo"` entre comillas dobles.
2. Valor `"Gateway-Principal-DMZ"` con comillas dobles en lugar de simples.
3. Eliminada la coma final tras el puerto `8443`.
4. Booleano `true` en minúsculas en lugar de `True`.

### Misión 06: Espacios de nombres (`sensores_red.xml`)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sistema xmlns:hw="http://ies.es/telemetria/hardware"
         xmlns:net="http://ies.es/telemetria/red">
    <componentes_fisicos>
        <hw:dispositivo>
            <hw:serie>HW-SN-9921</hw:serie>
            <hw:temperatura>41.2</hw:temperatura>
        </hw:dispositivo>
    </componentes_fisicos>

    <interfaces_logicas>
        <net:dispositivo>
            <net:direccion_ip>10.0.1.50</net:direccion_ip>
            <net:mascara>255.255.255.0</net:mascara>
        </net:dispositivo>
    </interfaces_logicas>
</sistema>
```

<div class="page-break"></div>

## 3. Dinamización pedagógica y preguntas socráticas en el aula

1. **¿Por qué los navegadores antiguos perdonaban etiquetas sin cerrar en HTML, mientras que un parser XML colapsa inmediatamente?**
   - *Respuesta esperada:* HTML fue diseñado para presentar páginas web donde era preferible renderizar contenido defectuoso que mostrar una pantalla en blanco. XML fue diseñado para intercambio de datos entre programas máquina-a-máquina, donde procesar datos ambiguos o corruptos causa fallos críticos de integridad.

2. **¿Por qué JSON no necesita espacios de nombres como XML?**
   - *Respuesta esperada:* JSON estructura la información mediante objetos anidados con nombres de clave relativos a su propio contexto jerárquico. En XML, al poder mezclar vocabularios globales en un mismo flujo de nodos, la ambigüedad exige URIs universales calificados.

3. **¿Qué consecuencias tiene en un sistema embebido o móvil deserializar un documento XML grande frente a JSON?**
   - *Respuesta esperada:* El consumo de batería y memoria RAM aumenta significativamente con XML por la sobrecarga de bytes de red (etiquetas de apertura y cierre repetidas) y la necesidad de instanciar estructuras de árbol DOM en memoria frente al parseo directo de matrices y diccionarios primitivos en JSON.
