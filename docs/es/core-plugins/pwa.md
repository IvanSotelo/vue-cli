# @vue/cli-plugin-pwa

> plugin pwa para vue-cli

El service worker agregado con este plugin solo está habilitado en el entorno de producción (por ejemplo, solo si ejecuta `npm run build` o `yarn build`). La habilitación del service worker en un modo de desarrollo no es una práctica recomendada, ya que puede conducir a la situación cuando se utilizan activos almacenados en caché previamente y no se incluyen los últimos cambios locales.

En cambio, en el modo de desarrollo se incluye el `noopServiceWorker.js`. Este archivo de trabajador de servicio es efectivamente un 'no-op' que restablecerá cualquier trabajador de servicio anterior registrado para la misma combinación de host: puerto.

Si necesita probar un trabajador de servicio localmente, compile la aplicación y ejecute un servidor HTTP simple desde su directorio de compilación. Se recomienda utilizar una ventana de incógnito del navegador para evitar complicaciones con la memoria caché del navegador.

## Configuración

La configuración se maneja a través de la propiedad `pwa` del archivo `vue.config.js`, o el campo `"vue"` del `package.json`.

- **pwa.workboxPluginMode**

  Esto le permite elegir entre los dos modos admitidos por el subyacente
  [`workbox-webpack-plugin`](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin).

  - `'GenerateSW'` (por defecto), conducirá a la creación de un nuevo archivo de service worker
   cada vez que reconstruye su aplicación web.

  - `'InjectManifest'` le permite comenzar con un archivo existente del service worker,
   y crea una copia de ese archivo con un "manifiesto precache" inyectado en él.

  La guía "[¿Qué plugin usar?](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#which_plugin_to_use)"
  puede ayudarlo a elegir entre los dos modos.

- **pwa.workboxOptions**

  Estas opciones se pasan al subyacente `workbox-webpack-plugin`.

  Para obtener más información sobre qué valores son compatibles, consulte la guía para[`GenerateSW`](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_generatesw_config)
  o para [`InjectManifest`](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin#full_injectmanifest_config).

- **pwa.name**

  - Por defecto: "name" del campo en `package.json`

    Se usa como el valor para la metaetiqueta `apple-mobile-web-app-title` en el HTML generado. Tenga en cuenta que deberá editar `public/manifest.json` para que coincida con esto.

- **pwa.themeColor**

  - Por defecto: `'#4DBA87'`

- **pwa.msTileColor**

  - Por defecto: `'#000000'`

- **pwa.appleMobileWebAppCapable**

  - Por defecto: `'no'`

    El valor predeterminado es `'no'` porque para iOS inferiores a 11.3 no tiene el soporte PWA adecuado. Ver [este artículo](https://medium.com/@firt/dont-use-ios-web-app-meta-tag-irresponsibly-in-your-progressive-web-apps-85d70f4438cb) para mayor información.

- **pwa.appleMobileWebAppStatusBarStyle**

  - Por defecto: `'default'`

- **pwa.assetsVersion**

  - Por defecto: `''`

    Esta opción se utiliza si necesita agregar una versión a sus iconos y manifiesto, en la memoria caché del navegador. Esto agregará `?v=<pwa.assetsVersion>` a las URL de los iconos y el manifiesto.

- **pwa.manifestPath**

  - Por defecto: `'manifest.json'`

    La ruta del manifiesto de la aplicación.

- **pwa.manifestOptions**

  - Por defecto: `{}`

    El objeto se usará para generar el `manifest.json`

    Si los siguientes atributos no están definidos en el objeto, se utilizarán las opciones de `pwa` u opciones predeterminadas.
      - name: `pwa.name`
      - short_name: `pwa.name`
      - start_url: `'.'`
      - display: `'standalone'`
      - theme_color: `pwa.themeColor`

- **pwa.iconPaths**

  - Por defectos:

    ```js
    {
      favicon32: 'img/icons/favicon-32x32.png',
      favicon16: 'img/icons/favicon-16x16.png',
      appleTouchIcon: 'img/icons/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/msapplication-icon-144x144.png'
    }
    ```

    Cambie estos valores para usar diferentes rutas para sus iconos.

### Ejemplo de Configuración

```js
// Inside vue.config.js
module.exports = {
  // ...other vue-cli plugin options...
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'dev/sw.js',
      // ...other Workbox options...
    }
  }
}
```

## Instalación en un proyecto ya creado

``` sh
vue add pwa
```

## Reglas webpack-chain inyectadas

- `config.plugin('workbox')`
