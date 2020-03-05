# @vue/cli-plugin-eslint

> plugin eslint para vue-cli

## Comandos inyectados

- **`vue-cli-service lint`**

  ```
  Ejecuta: vue-cli-service lint [options] [...files]

  Opciones:

    --format [formatter] especifica el formateador (predeterminado: codeframe)
    --no-fix             no corrije errores
    --max-errors         especifique el número de errores para hacer que la compilación falle (predeterminado: 0)
    --max-warnings       especifique el número de advertencias para hacer que la compilación falle (predeterminado: Infinito)
  ```

  Formatea y arregla archivos. Si no se proporcionan archivos específicos, se unen todos los archivos en `src` y `test`.

  Otras [opciones de ESLint CLI](https://eslint.org/docs/user-guide/command-line-interface#options) también son compatibles.

## Configuración

ESLint se puede configurar a través de `.eslintrc` o el campo `eslintConfig` en `package.json`.

Lint-on-save durante el desarrollo con `eslint-loader` está habilitado por defecto. Se puede deshabilitar con la opción `lintOnSave` en `vue.config.js`:

``` js
module.exports = {
  lintOnSave: false
}
```

Cuando se establece en `true`, `eslint-loader` emitirá errores de lint como advertencias. Por defecto, las advertencias solo se registran en el terminal y no fallan en la compilación.

Para que aparezcan errores de lint en la superposición del navegador, puede usar `lintOnSave: 'error'`. Esto obligará a `eslint-loader` a emitir siempre errores. Esto también significa que los errores de lint ahora harán que la compilación falle.

Alternativamente, puede configurar la superposición para mostrar advertencias y errores:

``` js
// vue.config.js
module.exports = {
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  }
}
```

Cuando `lintOnSave` es un valor verdadero, `eslint-loader` se aplicará tanto en el desarrollo como en la producción. Si desea deshabilitar `eslint-loader` durante la compilación de producción, puede usar la siguiente configuración:

``` js
// vue.config.js
module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production'
}
```

## Instalación en un proyecto ya creado

``` sh
vue add eslint
```

## Reglas webpack-chain inyectadas

- `config.module.rule('eslint')`
- `config.module.rule('eslint').use('eslint-loader')`
