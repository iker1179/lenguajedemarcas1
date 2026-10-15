# Misión 03: Modelado jerárquico en árbol de nodos

## Contexto del incidente
El departamento de soporte requiere un inventario estructurado en XML de los laboratorios de desarrollo. El archivo actual está vacío y el sistema de aprovisionamiento rechaza el registro si no se cumplen las reglas de subordinación y cardinalidad exigidas por el esquema de gestión.

## Especificación de requisitos
Desarrolla en `inventario_lab.xml` un documento XML bien formado con la siguiente estructura en árbol:
1. **Elemento raíz:** `<laboratorio>` con el atributo obligatorio `codigo="LAB-01"`.
2. **Subsección de puestos:** Elemento contenedor `<puestos>` que agrupa exactamente dos elementos `<puesto>`. Cada `<puesto>` debe contener:
   - Atributo obligatorio `id` (por ejemplo, `id="PC-01"` y `id="PC-02"`).
   - Elemento hijo `<procesador>` con el modelo de CPU como texto.
   - Elemento hijo `<ram>` con un atributo `unidades="GB"` y el valor numérico como contenido.
   - Elemento hijo `<sistema_operativo>` con el nombre de la distribución.
3. **Subsección de infraestructura de red:** Elemento contenedor `<red>` que contenga:
   - Un contenedor `<switches>` con al menos dos elementos `<switch>` (cada uno con atributo `id` y modelo como texto).
   - Un contenedor `<puntos_acceso>` con al menos un elemento `<punto_acceso>` (con atributo `id` y modelo como texto).

## Criterios de evaluación vinculados
- `CE1b`: Ventajas en el tratamiento y estructuración de la información.
- `CE1f`: Características de modelado de datos jerárquicos.
- `CE1g`: Estructura de un documento, anidamiento y uso adecuado de atributos frente a elementos.
