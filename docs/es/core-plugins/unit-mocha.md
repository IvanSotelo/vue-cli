# @vue/cli-plugin-unit-mocha

> plugin unit-mocha para vue-cli

## Comandos inyectados

- **`vue-cli-service test:unit`**

  Ejecuta las pruebas unitarias con [mochapack](https://github.com/sysgears/mochapack) + [chai](http://chaijs.com/).

  **Tenga en cuenta que las pruebas se ejecutan dentro de Node.js con un entorno de navegador simulado con JSDOM.**

  ```
  Ejecuta: vue-cli-service test:unit [options] [...files]

  Opciones:

    --watch, -w   correr en modo watch
    --grep, -g    solo ejecuta pruebas que coinciden con <patron>
    --slow, -s    prueba "lenta" en milisegundos
    --timeout, -t tiempo de espera en milisegundos
    --bail, -b    libertad después de la primera prueba fallida
    --require, -r requiere el módulo dado antes de ejecutar pruebas
    --include     incluir el módulo dado en el paquete de prueba
    --inspect-brk habilitar al inspector para depurar las pruebas
  ```

  Las coincidencias de archivos predeterminadas son: cualquier archivo en `tests/unit` que termine en `.spec.(ts|js)`.

  Todas las [opciones de línea de comandos de mochapack](https://sysgears.github.io/mochapack/docs/installation/cli-usage.html) también son compatibles.

## Instalación en un proyecto ya creado

``` sh
vue add unit-mocha
```
