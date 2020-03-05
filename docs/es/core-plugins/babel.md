# @vue/cli-plugin-babel

> plugin babel para vue-cli

## Configuración

Utiliza Babel 7 + `babel-loader` + [@vue/babel-preset-app](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app) de forma predeterminada, pero se puede configurar a través de `babel.config.js` para usar cualquier otro preajuste o complemento de Babel.

Por defecto, `babel-loader` excluye los archivos dentro de las dependencias `node_modules`. Si desea transpilar explícitamente un módulo de dependencia, deberá agregarlo a la opción `transpileDependencies` en `vue.config.js`:

``` js
module.exports = {
  transpileDependencies: [
    // puede ser string o regex
    'my-dep',
    /other-dep/
  ]
}
```

## Almacenamiento en caché

[cache-loader](https://github.com/webpack-contrib/cache-loader) está habilitado de forma predeterminada y el caché se almacena en `<projectRoot>/node_modules/.cache/babel-loader`.

## Paralelización

[thread-loader](https://github.com/webpack-contrib/thread-loader) está habilitado de forma predeterminada cuando la máquina tiene más de 1 núcleos de CPU. Esto se puede desactivar configurando `parallel: false` en `vue.config.js`.

## Instalación en un proyecto ya creado

``` sh
vue add babel
```

## Reglas webpack-chain inyectadas

- `config.rule('js')`
- `config.rule('js').use('babel-loader')`
- `config.rule('js').use('cache-loader')`
