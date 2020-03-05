# @vue/cli-plugin-unit-jest

> plugin unit-jest para vue-cli

## Comandos inyectados

- **`vue-cli-service test:unit`**

  Ejecute pruebas unitarias con Jest. El valor predeterminado `testMatch` es `<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))` que coincide con:

  - Cualquier archivo en `tests/unit` que termine en `.spec.(js|jsx|ts|tsx)`;
  - Cualquier archivo js(x)/ts(x) dentro de los directorios `__tests__`.

  Ejecuta: `vue-cli-service test:unit [options] <regexForTestFiles>`

  Todas las [Opciones de línea de comando de Jest](https://facebook.github.io/jest/docs/en/cli.html) también son compatibles.

## Pruebas de depuración

Tenga en cuenta que la ejecución directa de `jest` fallará porque el preajuste de Babel requiere sugerencias para que su código funcione en Node.js, por lo que debe ejecutar sus pruebas con `vue-cli-service test:unit`.

Si desea depurar sus pruebas a través del inspector de Node, puede ejecutar lo siguiente:

```sh
# macOS or linux
node --inspect-brk ./node_modules/.bin/vue-cli-service test:unit --runInBand

# Windows
node --inspect-brk ./node_modules/@vue/cli-service/bin/vue-cli-service.js test:unit --runInBand
```

## Configuración

Jest se puede configurar a través de `jest.config.js` en la raíz de su proyecto, o el campo `jest` en `package.json`.

## Instalación en un proyecto ya creado

```sh
vue add unit-jest
```

## Transforma las dependencias de `/node_modules`

Por defecto, jest no transforma nada de `/node_modules`.

Como jest se ejecuta en Node, tampoco tenemos que transpilar nada que use las funciones modernas de ECMAScript, ya que Node >=8 ya admite estas funciones, por lo que es un valor predeterminado razonable. cli-plugin-jest tampoco respeta la opción `transpileDependencies` en `vue.config.js` por la misma razón.

Sin embargo, tenemos (al menos) tres casos en los que necesitamos transpilar código de `/node_modules` en jest:

1.  Uso de declaraciones ES6 `import`/`export`, que deben compilarse en commonjs `module.exports`
2.  Componentes de archivo único (archivos `.vue`) que deben ejecutarse a través de `vue-jest`
3.  Código Typescript

Para hacer esto, necesitamos agregar una excepción a la opción `transformIgnorePatterns` de jest. Este es su valor predeterminado:

```javascript
transformIgnorePatterns: ['/node_modules/']
```

Tenemos que agregar excepciones a este patrón con una anticipación negativa RegEx:

```javascript
transformIgnorePatterns: ['/node_modules/(?!name-of-lib-o-transform)']
```

Para excluir varias librerias:

```javascript
transformIgnorePatterns: ['/node_modules/(?!lib-to-transform|other-lib)']
```
