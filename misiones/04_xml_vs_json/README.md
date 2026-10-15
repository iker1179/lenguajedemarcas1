# Misión 04: Comparativa de rendimiento y payload: XML vs JSON

## Contexto del incidente
La aplicación móvil de telemetría experimenta lentitud y alto consumo de datos móviles al sincronizar registros de actividad con el backend. La dirección técnica evalúa migrar los endpoints REST de XML a JSON. Se requiere auditar técnicamente la sobrecarga de bytes (*payload overhead*) y la tipificación de datos.

## Especificación de requisitos
Inspecciona los dos fragmentos de ejemplo proporcionados en este README correspondientes al mismo lote de 5 registros de telemetría y completa las respuestas en `payload_eval.json`.

### Fragmento XML equivalente:
```xml
<telemetria>
    <lectura id="101" activa="true"><temperatura>23.5</temperatura><humedad>45</humedad></lectura>
    <lectura id="102" activa="false"><temperatura>24.1</temperatura><humedad>48</humedad></lectura>
    <lectura id="103" activa="true"><temperatura>22.8</temperatura><humedad>50</humedad></lectura>
    <lectura id="104" activa="true"><temperatura>23.9</temperatura><humedad>42</humedad></lectura>
    <lectura id="105" activa="false"><temperatura>25.0</temperatura><humedad>39</humedad></lectura>
</telemetria>
```

### Fragmento JSON equivalente:
```json
{"telemetria":[{"id":101,"activa":true,"temperatura":23.5,"humedad":45},{"id":102,"activa":false,"temperatura":24.1,"humedad":48},{"id":103,"activa":true,"temperatura":22.8,"humedad":50},{"id":104,"activa":true,"temperatura":23.9,"humedad":42},{"id":105,"activa":false,"temperatura":25.0,"humedad":39}]}
```

## Tareas a completar en `payload_eval.json`:
1. `formato_menor_sobrecarga`: Indica `"json"` o `"xml"`.
2. `razon_principal_sobrecarga_xml`: Selecciona `"etiquetas_cierre_redundantes"` o `"compresion_incompatible"`.
3. `soporte_tipos_nativos`: Indica `"json"` (dispone de number, boolean, array, object) o `"xml"` (trata todo contenido como texto plano salvo si se usa XSD).
4. `consumo_memoria_cliente`: Explica brevemente por qué el navegador o app consume menos CPU al parsear JSON que al generar un árbol DOM completo de XML.

## Criterios de evaluación vinculados
- `CE1b`: Ventajas en el tratamiento y estructuración de la información.
- `CE1d`: Diferenciación de sus ámbitos de aplicación.
- `CE1f`: Características propias de diferentes lenguajes.
