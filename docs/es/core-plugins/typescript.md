# @vue/cli-plugin-typescript

> plugin typescript para vue-cli

Utiliza TypeScript + `ts-loader` + [fork-ts-checker-webpack-plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin) para una verificación más rápida del tipo fuera de hilo.

## Configuración

TypeScript se puede configurar a través de `tsconfig.json`.

Desde `3.0.0-rc.6`, `typescript` ahora es una dependencia de este paquete, por lo que puede usar una versión específica de TypeScript actualizando el `package.json` de su proyecto.

Este complemento se puede usar junto con `@vue/cli-plugin-babel`. Cuando se usa con Babel, este complemento generará ES2015 y delegará el resto a Babel para autocompletar según los objetivos del navegador.

## Comandos inyectados

Si optó por usar [TSLint](https://palantir.github.io/tslint/) durante la creación del proyecto, `vue-cli-service lint` será inyectado.

## Almacenamiento en caché

[cache-loader](https://github.com/webpack-contrib/cache-loader) está habilitado de forma predeterminada y el caché se almacena en `<projectRoot>/node_modules/.cache/ts-loader`.

## Paralelización

[thread-loader](https://github.com/webpack-contrib/thread-loader) está habilitado de forma predeterminada cuando la máquina tiene más de 1 núcleos de CPU. Esto se puede desactivar configurando `parallel: false` en `vue.config.js`.

## Instalación en un proyecto ya creado

``` sh
vue add typescript
```

## Reglas webpack-chain inyectadas

- `config.rule('ts')`
- `config.rule('ts').use('ts-loader')`
- `config.rule('ts').use('babel-loader')` (cuando se usa junto a `@vue/cli-plugin-babel`)
- `config.rule('ts').use('cache-loader')`
- `config.plugin('fork-ts-checker')`
