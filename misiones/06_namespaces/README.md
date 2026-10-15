# Misión 06: Resolución de colisiones con espacios de nombres (Namespaces)

## Contexto del incidente
En la plataforma de supervisión industrial se fusionan dos flujos de datos independientes: el inventario de componentes físicos (hardware) y la topología de red (interfaces IP). Ambos esquemas utilizan el elemento `<dispositivo>`, pero con significados y atributos completamente diferentes. Al unirlos en un único documento XML, el procesador no puede distinguir a qué modelo pertenece cada etiqueta, provocando una colisión semántica.

## Especificación de requisitos
Edita el archivo `sensores_red.xml` para resolver la colisión mediante el uso de **espacios de nombres XML** (*namespaces*):
1. Declara en el elemento raíz `<sistema>` dos espacios de nombres diferenciados mediante atributos `xmlns`:
   - Para hardware: prefijo `hw` asociado a la URI `"http://ies.es/telemetria/hardware"`.
   - Para redes: prefijo `net` asociado a la URI `"http://ies.es/telemetria/red"`.
2. Cualifica cada elemento hijo conflictivo con el prefijo correspondiente:
   - Los dispositivos de hardware deben etiquetarse como `<hw:dispositivo>` y contener `<hw:serie>` y `<hw:temperatura>`.
   - Los dispositivos de red deben etiquetarse como `<net:dispositivo>` y contener `<net:direccion_ip>` y `<net:mascara>`.
3. El documento resultante debe ser XML bien formado y permitir a los procesadores discriminar sin ambigüedad el vocabulario de procedencia de cada nodo.

## Criterios de evaluación vinculados
- `CE1i`: Identificación de las ventajas que aportan los espacios de nombres para evitar colisiones.
- `CE1g`: Sintaxis y reglas de estructura de documentos XML.
