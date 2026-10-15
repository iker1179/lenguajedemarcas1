| <img src="logoIES.jpg" alt="IES Pío Baroja" width="90"> | **IES Pío Baroja**<br>Departamento de Informática<br>Ciclo Superior DAM | **Lenguajes de marcas y sistemas de gestión de información**<br>UT-1. Características y clasificación de los lenguajes de marcas |
|---|---|---|

# The Markup Protocol: Auditoría técnica de lenguajes de marcado

Entorno interactivo de resolución de incidentes técnicos y afianzamiento de conocimientos para 1º de DAM.

## Contexto de la auditoría
Un fallo en el proceso de integración continua ha bloqueado el despliegue del clúster de microservicios de la organización. Diversos archivos de configuración y esquemas de datos han quedado corrompidos o mal formateados. Tu cometido como auditor técnico de datos es inspeccionar los archivos, reparar las discrepancias de sintaxis y validar los documentos contra los parsers oficiales.

## Requisitos previos
- Node.js (versión 20.x o superior).
- Visual Studio Code.
- Git.

## Puesta en marcha

1. Clona el repositorio y sitúate en el directorio de trabajo:
   ```bash
   git clone <url-del-repositorio>
   cd lmsgi-protocol-ut1
   ```

2. Instala las dependencias del motor de validación:
   ```bash
   npm install
   ```

3. Inicia el panel de control interactivo local (HUD):
   ```bash
   npm run dev
   ```
   Abre en tu navegador `http://localhost:3000` para monitorizar en tiempo real el progreso de cada misión.

4. Para verificar las pruebas desde la terminal:
   ```bash
   npm test
   ```

## Catálogo de misiones

| Misión | Módulo | Fichero a auditar | Objetivo |
|---|---|---|---|
| **01** | `01_taxonomia` | `misiones/01_taxonomia/clasificacion.json` | Catalogar tecnologías según marcado de presentación, procedimental o descriptivo. |
| **02** | `02_xml_well_formed` | `misiones/02_xml_well_formed/microservicio.xml` | Depurar 4 fallos críticos de sintaxis XML (comillas, case-sensitive, cierre y raíz). |
| **03** | `03_arbol_nodos` | `misiones/03_arbol_nodos/inventario_lab.xml` | Construir un árbol jerárquico de infraestructura con elementos hijos y atributos. |
| **04** | `04_xml_vs_json` | `misiones/04_xml_vs_json/payload_eval.json` | Evaluar la sobrecarga en red de XML frente a JSON y justificar tipos nativos. |
| **05** | `05_json_strict` | `misiones/05_json_strict/gateway_config.json` | Corregir la sintaxis JSON no conforme con el estándar RFC 8259. |
| **06** | `06_namespaces` | `misiones/06_namespaces/sensores_red.xml` | Resolver una colisión semántica mediante prefijos y atributos `xmlns`. |

## Procedimiento de entrega

Cada vez que resuelvas una misión y pase las comprobaciones de `npm test`:
1. Registra tus cambios con Git:
   ```bash
   git add .
   git commit -m "auditoria: resolver mision 0X"
   ```
2. Sube tus avances a tu repositorio personal:
   ```bash
   git push origin main
   ```
   El flujo de GitHub Actions ejecutará automáticamente la batería de pruebas y emitirá la certificación final de la auditoría.
