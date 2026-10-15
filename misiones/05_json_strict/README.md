# Misión 05: Depuración de sintaxis JSON estricta (RFC 8259)

## Contexto del incidente
El servicio de pasarela de red rechaza el archivo de configuración `gateway_config.json` durante el arranque. Al ejecutar `JSON.parse()`, el motor de Node.js lanza una excepción `SyntaxError: Unexpected token` y detiene el contenedor. El programador que redactó el archivo confundió la sintaxis permisiva de JavaScript/Python con el estándar estricto de JSON.

## Especificación de requisitos
Depura el archivo `gateway_config.json` corrigiendo los 4 errores de sintaxis que impiden que sea un documento JSON válido conforme a la especificación oficial RFC 8259:
1. **Claves de objeto:** Todas las claves deben estar obligatoriamente delimitadas por comillas dobles (`"clave"`). No se permiten identificadores sin entrecomillar ni comillas simples.
2. **Cadenas de texto:** Los valores de tipo string deben usar exclusivamente comillas dobles (`"valor"`). Las comillas simples (`'valor'`) son inválidas en JSON estándar.
3. **Valores booleanos y nulos:** Deben escribirse estrictamente en minúsculas: `true`, `false`, `null`. Valores como `True` o `None` son errores léxicos.
4. **Comas finales (*trailing commas*):** No está permitido colocar una coma tras el último elemento de un array o tras el último par clave-valor de un objeto.

Conserva todos los nombres de propiedades y datos numéricos originales; repara únicamente la sintaxis para que `JSON.parse()` lo procese sin excepciones.

## Criterios de evaluación vinculados
- `CE1g`: Identificación de reglas sintácticas y estructura de datos.
- `CE1h`: Contraste de la necesidad de crear documentos estrictos y bien formados.
