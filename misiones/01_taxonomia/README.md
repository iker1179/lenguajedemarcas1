# Misión 01: Clasificación taxonómica de lenguajes de marcado

## Contexto del incidente
Durante la auditoría del repositorio de arquitecturas de la organización, se detectó que los componentes del sistema utilizan diferentes tecnologías de marcado sin una justificación técnica formal. El equipo de arquitectura exige catalogar cada tecnología según su naturaleza y ámbito de aplicación para consolidar la pila tecnológica del microservicio.

## Especificación de requisitos
Edita el archivo `clasificacion.json` completando las propiedades de cada lenguaje evaluado:
- `tipo_marcado`: Debe ser exactamente uno de los tres valores formales:
  - `"presentacion"` (control directo de formato visual)
  - `"procedimental"` (secuencia de órdenes de procesamiento o comandos de renderizado)
  - `"descriptivo"` (estructura semántica de la información desacoplada de la apariencia)
- `proposito_principal`: Breve descripción técnica de su cometido (intercambio de datos, documentos para imprenta, maquetación web, serialización de configuraciones).
- `desacoplamiento_presentacion`: Valor booleano (`true` o `false`) indicando si el lenguaje separa estrictamente el contenido de las reglas visuales.

## Criterios de evaluación vinculados
- `CE1a`: Identificación de las características generales de los lenguajes de marcas.
- `CE1c`: Clasificación taxonómica de los lenguajes más relevantes.
- `CE1d`: Diferenciación de sus ámbitos de aplicación.
- `CE1e`: Reconocimiento de las consecuencias de la evolución y el desacoplamiento.
