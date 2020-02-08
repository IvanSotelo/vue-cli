---
sidebar: auto
---

# Referencia de configuración


## Configuración global del CLI

Algunas configuraciones globales para `@vue/cli`, como su administrador de paquetes preferido y sus presets guardados localmente, se almacenan en un archivo JSON llamado `.vuerc` en su directorio de inicio. Puede editar este archivo directamente con el editor de su elección para cambiar las opciones guardadas.

También puede usar el comando `vue config` para inspeccionar o modificar la configuración global del CLI.

## Navegadores de destino

Consulte la [Compatibilidad del navegador](../guide/browser-compatibility.md#browserslist) en la sección guía.

## vue.config.js

`vue.config.js` es un archivo de configuración opcional que `@vue/cli-service` cargará automáticamente si está presente en la raíz del proyecto (junto a `package.json`). También puede usar el campo `vue` en `package.json`, pero tenga en cuenta que en ese caso estará limitado solo a valores compatibles con JSON.

El archivo debe exportar un objeto con la configuración:

``` js
// vue.config.js
module.exports = {
  // opciones...
}
```

### baseUrl

Depreciado desde Vue CLI 3.3, utilice [`publicPath`](#publicPath) en su lugar.

### publicPath

- Tipo: `string`
- Por defecto: `'/'`

  La URL base en la que se implementará el paquete de la aplicación (conocida como `baseUrl` antes de Vue CLI 3.3). Este es el equivalente de `output.publicPath` de webpack, pero Vue CLI también necesita este valor para otros fines, por lo que debe **usar siempre `publicPath` en lugar de modificar webpack `output.publicPath`**.

  De forma predeterminada, Vue CLI asume que su aplicación se implementará en la raíz de un dominio, ej. `https://www.my-app.com/`. Si su aplicación se implementa en una ruta secundaria, deberá especificar esa ruta secundaria con esta opción. Por ejemplo, si su aplicación se implementa en `https://www.foobar.com/my-app/`, configure `publicPath` en `'/my-app/'`.

  El valor también se puede establecer en una cadena vacía (`''`) o una ruta relativa (`./`)para que todos los recursos se vinculen usando rutas relativas. Esto permite que el paquete integrado se implemente bajo cualquier ruta pública, o se use en un entorno basado en un sistema de archivos como una aplicación híbrida Cordova.

  ::: warning Limitaciones de publicPath relativo
  El `publicPath` relativo tiene algunas limitaciones y debe evitarse cuando:

  - Está utilizando el enrutamiento HTML5 `history.pushState`;

  - Está utilizando la opción `pages` para crear una aplicación de páginas múltiples (MPA).
  :::

  Este valor también se respeta durante el desarrollo. Si desea que su servidor dev se sirva en la raíz, puede usar un valor condicional:

  ``` js
  module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/production-sub-path/'
      : '/'
  }
  ```

### outputDir

- Tipo: `string`
- Por defecto: `'dist'`

  El directorio donde se generarán los archivos de compilación de producción al ejecutar `vue-cli-service build`. Tenga en cuenta que el directorio de destino se eliminará antes de construir (este comportamiento se puede deshabilitar pasando `--no-clean` al construir).

  ::: tip
  Utilice siempre `outputDir` en lugar de modificar webpack `output.path`.
  :::

### assetsDir

- Tipo: `string`
- Por defecto: `''`

  Un directorio (relativo a `outputDir`) para anidar activos estáticos generados (js, css, img, fonts) debajo.

  ::: tip
  `assetsDir` se ignora al sobrescribir el nombre de archivo o chunkFilename de los archivos generados.
  :::

### indexPath

- Tipo: `string`
- Por defecto: `'index.html'`

  Especifique la ruta de salida para el `index.html` generado (en relación con` outputDir`). También puede ser un ruta absoluta.

### filenameHashing

- Tipo: `boolean`
- Por defecto: `true`

  Por defecto, los archivos estáticos generados contienen hashes en sus nombres de archivo para un mejor control de almacenamiento en caché. Sin embargo, esto requiere que el índice HTML sea generado automáticamente por Vue CLI. Si no puede utilizar el índice HTML generado por Vue CLI, puede deshabilitar el hashing de nombre de archivo configurando esta opción en `false`.

### pages

- Tipo: `Object`
- Por defecto: `undefined`

  Compile la aplicación en modo de varias páginas. Cada "página" debe tener un archivo de entrada de JavaScript correspondiente. El valor debe ser un objeto donde la clave es el nombre de la entrada, y el valor es:

  - Un objeto que define su `entry`, `template`, `filename`, `title` y `chunks` (todos opcionales excepto `entry`). Cualquier otra propiedad agregada además de esas también se pasará directamente a `html-webpack-plugin`, lo que permite al usuario personalizar dicho complemento;
  - O una cadena que define su `entry`.

  ``` js
  module.exports = {
    pages: {
      index: {
        // entrada para la página
        entry: 'src/index/main.js',
        // la plantilla fuente
        template: 'public/index.html',
        // salida como dist/index.html
        filename: 'index.html',
        // cuando se usa la opción de título,
        // la etiqueta del título de la plantilla debe ser <title><%= htmlWebpackPlugin.options.title %></title>
        title: 'Index Page',
        // chunks para incluir en esta página, por defecto incluye
        // chunks comunes y vendor chunks.
        chunks: ['chunk-vendors', 'chunk-common', 'index']
      },
      // cuando se usa el formato de cadena de solo entrada,
      // el template que se infiere es `public/subpage.html`
      // y vuelve a `public/index.html` si no se encuentra.
      // Se infiere que el nombre de archivo de salida es `subpage.html`.
      subpage: 'src/subpage/main.js'
    }
  }
  ```

  ::: tip
  Al construir en modo de páginas múltiples, la configuración de webpack contendrá diferentes plugins (habrá múltiples instancias de `html-webpack-plugin` y `preload-webpack-plugin`). Asegúrese de ejecutar `vue inspect` si está intentando modificar las opciones para esos plugins.
  :::

### lintOnSave

- Tipo: `boolean | 'warning' | 'default' | 'error'`
- Por defecto: `true`

  Si se debe realizar lint-on-save durante el desarrollo utilizando [eslint-loader](https://github.com/webpack-contrib/eslint-loader). Este valor se respeta solo cuando se instala [`@vue/cli-plugin-eslint`](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint) .

  Cuando se establece en `true` o `'warning'`, `eslint-loader` emitirá errores de lint como advertencias. Por defecto, las advertencias solo se registran en el terminal y no fallan en la compilación, por lo que este es un buen valor predeterminado para el desarrollo.

  Para que aparezcan errores de lint en la consola del navegador, puede usar `lintOnSave: 'default'`. Esto obligará a `eslint-loader` a emitir errores. Esto también significa que los errores de lint harán que la compilación falle.

  Establecerlo en `'error'` forzará a `eslint-loader` a emitir advertencias también como errores, lo que significa que las advertencias también aparecerán en el navegador.

  Alternativamente, puede configurar el navegador para mostrar advertencias y errores:

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

  Cuando el valor de `lintOnSave` se convierte en `true`, se aplicará `eslint-loader` tanto en el desarrollo como en la producción. Si desea deshabilitar `eslint-loader` en producción, puede usar la siguiente configuración:

  ``` js
  // vue.config.js
  module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production'
  }
  ```

### runtimeCompiler

- Tipo: `boolean`
- Por defecto: `false`

  Si se debe usar la compilación de Vue core que incluye el compilador de tiempo de ejecución. Establecerlo en `true` le permitirá usar la opción`template` en los componentes de Vue, pero incurrirá en una carga útil adicional de 10 kb para su aplicación.

  Ver también: [Runtime + Compiler vs. Runtime only](https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only).

### transpileDependencies

- Tipo: `Array<string | RegExp>`
- Por defecto: `[]`

  Por defecto, `babel-loader` ignora todos los archivos dentro de `node_modules`. Si desea transpilar explícitamente una dependencia con Babel, puede enumerarla en esta opción.

::: warning Configuración Jest
Esta opción no es respetada por el [plugin cli-unit-jest](#jest), porque en jest, no tenemos que compilar el código de `/node_modules` a menos que use características no estándar de - Node >8.11 a las últimas características de ECMAScript.

Sin embargo, jest a veces tiene que transformar el contenido de `node_modules` si ese código usa la sintaxis ES6 `import`/`export`. En ese caso, use la opción `transformIgnorePatterns` en` jest.config.js`.

Consulte [el archivo README del plugin](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-unit-jest/README.md) para obtener más información.
:::

### productionSourceMap

- Tipo: `boolean`
- Por defecto: `true`

  Establecer esto como `false` puede acelerar las compilaciones de producción si no necesita mapas de origen para la producción.

### crossorigin

- Tipo: `string`
- Por defecto: `undefined`

  Configure el atributo `crossorigin` en las etiquetas `<link rel="stylesheet">` y `<script>` en el HTML generado.

  Tenga en cuenta que esto solo afecta a las etiquetas inyectadas por `html-webpack-plugin` - las etiquetas agregadas directamente en la plantilla fuente (`public/index.html`) no se ven afectadas.

  Consulte también: [Atributos de configuración de CORS](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes)

### integrity

- Tipo: `boolean`
- Por defecto: `false`

  Establezca en `true` para habilitar [Subresource Integrity](<https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity>) (SRI) en las etiquetas `<link rel="stylesheet">` y `<script>` en el HTML generado. Si aloja sus archivos compilados en un CDN, es una buena idea habilitar esto para una seguridad adicional.

  Tenga en cuenta que esto solo afecta a las etiquetas inyectadas por `html-webpack-plugin` - las etiquetas agregadas directamente en la plantilla fuente (`public/index.html`) no se ven afectadas.

  Además, cuando SRI está habilitado, las sugerencias de recursos de precarga se deshabilitan debido a un [error en Chrome](https://bugs.chromium.org/p/chromium/issues/detail?id=677022) que hace que los recursos se descarguen dos veces.

### configureWebpack

- Tipo: `Object | Function`

  Si el valor es un Objeto, se fusionará en la configuración final usando [webpack-merge](https://github.com/survivejs/webpack-merge).

  Si el valor es una función, recibirá la configuración resuelta como argumento. La función puede mutar la configuración y no devolver nada, O devolver una versión clonada o fusionada de la configuración.

  Consulte también: [Trabajar con Webpack> Configuración simple](../guide/webpack.md#simple-configuration)

### chainWebpack

- Tipo: `Function`

  Una función que recibirá una instancia de `ChainableConfig` con tecnología de [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain). Permite una modificación más detallada de la configuración interna del paquete web.

  Consulte también: [Trabajar con Webpack> Encadenamiento](../guide/webpack.md#chaining-advanced)

### css.modules

Depreciado desde v4, utilice [`css.requireModuleExtension`](#css-requireModuleExtension) en su lugar.

En v3 esto significa lo contrario de `css.requireModuleExtension`.

### css.requireModuleExtension

- Tipo: `boolean`
- Por defecto: `true`

  Por defecto, solo los archivos que terminan en `*.module.[ext]` se tratan como módulos CSS. Establecer esto como `false` le permitirá colocar `.module` en los nombres de archivo y tratar todos los archivos `*.(css|scss|sass|less|styl(us)?)` como módulos CSS.

  ::: tip
  Si ha personalizado las configuraciones de los módulos CSS en `css.loaderOptions.css`, entonces el campo `css.requireModuleExtension` debe configurarse explícitamente en `true` o `false`, de lo contrario no podemos estar seguros de si desea aplicar las opciones para todos los archivos CSS o no.
  :::

  Consulte también: [Trabajar con CSS> Módulos CSS](../guide/css.md#css-modules)

### css.extract

- Tipo: `boolean | Object`
- Por defecto: `true` en producción, `false` en desarrollo

  Ya sea para extraer CSS en sus componentes en archivos CSS independientes (en lugar de en línea en JavaScript e inyección dinámica).

  Esto siempre está deshabilitado cuando se compila como componentes web (los estilos están en línea e inyectados en shadowRoot).

  Cuando se construye como una biblioteca, también puede establecer esto en 'falso' para evitar que sus usuarios tengan que importar el CSS ellos mismos.

  La extracción de CSS está deshabilitada de forma predeterminada en el modo de desarrollo, ya que es incompatible con la función hot reloading de CSS. Sin embargo, aún puede exigir la extracción en todos los casos estableciendo explícitamente el valor en `true`.

  En lugar de `true`, también puede pasar un objeto de opciones para el [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) si lo desea para configurar aún más lo que este plugin hace exactamente.

### css.sourceMap

- Tipo: `boolean`
- Por defecto: `false`

  Habilitar mapas de origen para CSS. Establecer esto en `true` puede afectar el rendimiento de la compilación.

### css.loaderOptions

- Tipo: `Object`
- Por defecto: `{}`

  Pase opciones a cargadores relacionados con CSS. Por ejemplo:

  ``` js
  module.exports = {
    css: {
      loaderOptions: {
        css: {
          // las opciones aquí se pasarán a css-loader
        },
        postcss: {
          // las opciones aquí se pasarán a postcss-loader
        }
      }
    }
  }
  ```

  Los cargadores compatibles son:

  - [css-loader](https://github.com/webpack-contrib/css-loader)
  - [postcss-loader](https://github.com/postcss/postcss-loader)
  - [sass-loader](https://github.com/webpack-contrib/sass-loader)
  - [less-loader](https://github.com/webpack-contrib/less-loader)
  - [stylus-loader](https://github.com/shama/stylus-loader)

  También es posible orientar la sintaxis `scss` por separado de `sass`, con la opción `scss`.

  Consulte también: [Opciones de paso a cargadores de Pre-Processor](../guide/css.md#passing-options-to-pre-processor-loaders)

  ::: tip
  Esto es preferible a aprovechar manualmente cargadores específicos usando `chainWebpack`, porque estas opciones deben aplicarse en múltiples ubicaciones donde se usa el cargador correspondiente.
  :::

### devServer

- Tipo: `Object`

  [Todas la opciones para `webpack-dev-server`](https://webpack.js.org/configuration/dev-server/) son soportadas. Tenga en cuenta que:

  - Algunos valores como `host`,` port` y `https` pueden sobrescribirse con banderas de línea de comando.

  - Algunos valores como `publicPath` e `historyApiFallback` no deben modificarse, ya que deben sincronizarse con [publicPath](#baseurl) para que el servidor de desarrollo funcione correctamente.

### devServer.proxy

- Tipo: `string | Object`

  Si su aplicación front-end y el servidor API back-end no se ejecutan en el mismo host, deberá enviar solicitudes de API proxy al servidor API durante el desarrollo. Esto es configurable a través de la opción `devServer.proxy` en` vue.config.js`.

  `devServer.proxy` puede ser una cadena que apunta al servidor API de desarrollo:

  ``` js
  module.exports = {
    devServer: {
      proxy: 'http://localhost:4000'
    }
  }
  ```

  Esto le indicará al servidor de desarrollo que envíe cualquier solicitud desconocida (solicitudes que no coincidan con un archivo estático) a `http: // localhost: 4000`.

  ::: warning
  Cuando `devServer.proxy` se establece en una cadena, solo las solicitudes XHR serán representadas. Si desea probar una URL de API, no la abra en el navegador, utilice una herramienta de API como Postman.
  :::

  Si desea tener más control sobre el comportamiento del proxy, también puede usar un objeto con `path: options`. Consulte [http-proxy-middleware](<https://github.com/chimurai/http-proxy-middleware#proxycontext-config>) para ver las opciones completas:

  ``` js
  module.exports = {
    devServer: {
      proxy: {
        '^/api': {
          target: '<url>',
          ws: true,
          changeOrigin: true
        },
        '^/foo': {
          target: '<other_url>'
        }
      }
    }
  }
  ```

### parallel

- Tipo: `boolean | number`
- Por defecto: `require('os').cpus().length > 1`

  Ya sea para usar el `thread-loader` para la transpilación de Babel o TypeScript. Esto está habilitado para las compilaciones de producción cuando el sistema tiene más de 1 núcleos de CPU. Pasar un número definirá la cantidad de trabajadores utilizados.

### pwa

- Tipo: `Object`

  Pase opciones al [Plugin PWA](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa).

### pluginOptions

- Tipo: `Object`

  Este es un objeto que no pasa por ninguna validación de esquema, por lo que puede usarse para pasar opciones arbitrarias a complementos de terceros. Por ejemplo:

  ``` js
  module.exports = {
    pluginOptions: {
      foo: {
        // los plugins pueden acceder a estas opciones como
        // `options.pluginOptions.foo`.
      }
    }
  }
  ```

## Babel

Babel se puede configurar a través de `babel.config.js`.

::: tip
Vue CLI usa `babel.config.js`, que es un nuevo formato de configuración en Babel 7. A diferencia de `.babelrc` o el campo `babel` en` package.json`, este archivo de configuración no usa una resolución basada en la ubicación del archivo , y se aplica de manera consistente a cualquier archivo bajo la raíz del proyecto, incluidas las dependencias dentro de `node_modules`. Se recomienda usar siempre `babel.config.js` en lugar de otros formatos en los proyectos de Vue CLI.
:::

Todas las aplicaciones Vue CLI usan `@vue/babel-preset-app`, que incluye `babel-preset-env`, soporte JSX y configuración optimizada para una sobrecarga mínima del tamaño del paquete. Consulte [sus documentos](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/babel-preset-app)para obtener detalles y opciones predeterminadas.

Consulte también [Polyfills](../guide/browser-compatibility.md#polyfills) en la sección guía.

## ESLint

ESLint se puede configurar a través de `.eslintrc` o el campo `eslintConfig` en `package.json`.

Consulte [@vue/cli-plugin-eslint](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint) para obtener más detalles.

## TypeScript

TypeScript se puede configurar a través de `tsconfig.json`.

Consulte [@vue/cli-plugin-typescript](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-typescript) para obtener más detalles.

## Pruebas Unitarias

### Jest

Consulte [@vue/cli-plugin-unit-jest](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest) para obtener más detalles.

### Mocha (via `mocha-webpack`)

Consulte [@vue/cli-plugin-unit-mocha](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-mocha) para obtener más detalles.

## Pruebas E2E

### Cypress

Consulte [@vue/cli-plugin-e2e-cypress](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-cypress) para obtener más detalles.

### Nightwatch

Consulte [@vue/cli-plugin-e2e-nightwatch](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch) para obtener más detalles.
