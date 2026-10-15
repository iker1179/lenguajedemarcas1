# Misión 02: Depuración de documento XML mal formado

## Contexto del incidente
El servicio de despliegue automatizado ha colapsado al procesar la configuración del microservicio de autenticación. El parser XML arroja una excepción fatal durante el análisis sintáctico y ha abortado la inicialización del contenedor.

## Especificación de requisitos
Inspecciona el archivo `microservicio.xml` y corrige los 4 errores sintácticos que impiden que sea un documento XML bien formado según la recomendación del W3C:
1. Todos los valores de los atributos deben estar delimitados obligatoriamente por comillas (simples o dobles).
2. Los nombres de las etiquetas son estrictamente sensibles a mayúsculas y minúsculas (*case-sensitive*). La etiqueta de cierre debe coincidir con la de apertura.
3. Todo elemento que no sea vacío debe cerrarse explícitamente y respetar las reglas de anidamiento estricto.
4. Un documento XML válido debe contar con un único elemento raíz que contenga a todos los demás.

No alteres los nombres lógicos de los elementos ni los valores de los datos; corrige exclusivamente los fallos de sintaxis para que el parser pueda generar el árbol DOM sin arrojar excepciones.

## Criterios de evaluación vinculados
- `CE1b`: Reconocimiento de las ventajas de la estructuración rigurosa.
- `CE1g`: Identificación de reglas sintácticas y estructura de un documento.
- `CE1h`: Contraste de la necesidad de crear documentos bien formados.
