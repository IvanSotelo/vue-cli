# @vue/cli-plugin-e2e-nightwatch

> plugin e2e-nightwatch para vue-cli

## Comandos inyectados

- **`vue-cli-service test:e2e`**

  Ejecute pruebas de punto a punto con [Nightwatch.js](https://nightwatchjs.org).

  Opciones:

  ```
  --url                 ejecutar las pruebas contra la URL dada en lugar de iniciar automáticamente el servidor de desarrollo
  --config              usar el archivo de configuración de nightwatch personalizado (anula las partes internas)
  --headless            usa Chrome o Firefox en modo headless
  --parallel            habilitar el modo paralelo a través de trabajadores de prueba (solo disponible en chromedriver)
  --use-selenium        use un servidor independiente Selenium en lugar de chromedriver o geckodriver
  -e, --env             especifica envs del navegador delimitados por comas para ejecutar (predeterminado: Chrome)
  -t, --test            especificar una prueba para ejecutar por nombre
  -f, --filter          glob para filtrar las pruebas por nombre de archivo
  ```

  Además, todas las [Opciones de CLI de Nightwatch](https://nightwatchjs.org/guide/running-tests/#command-line-options) también son compatibles.
  ej: `--verbose`, `--retries` etc.


## Estructura del proyecto

La siguiente estructura se generará al instalar este complemento. Hay ejemplos para la mayoría de los conceptos de prueba en Nightwatch disponibles.

```
tests/e2e/
  ├── custom-assertions/
  |   └── elementCount.js
  ├── custom-commands/
  |   ├── customExecute.js
  |   ├── openHomepage.js
  |   └── openHomepageClass.js
  ├── page-objects/
  |   └── homepage.js
  ├── specs/
  |   ├── test.js
  |   └── test-with-pageobjects.js
  └── globals.js
```

#### `specs`
La ubicación principal donde se ubican las pruebas. Puede contener subcarpetas que pueden dirigirse durante la ejecución utilizando el argumento `--group`. [Más información](https://nightwatchjs.org/guide/running-tests/#test-groups).

#### `custom-assertions`
Nightwatch carga automáticamente los archivos que se encuentran aquí y los coloca en los espacios de nombres de la API `.assert` y` .verify` para ampliar las aserciones incorporadas de Nightwatch. Ver [escribir afirmaciones personalizadas](https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-assertions) para detalles.

#### `custom-commands`
Nightwatch carga automáticamente los archivos que se encuentran aquí y los coloca en el objeto principal del 'navegador' para extender los comandos integrados de Nightwatch. Ver [escribir comandos personalizados](https://nightwatchjs.org/guide/extending-nightwatch/#writing-custom-commands) para detalles.

#### `page objects`
Trabajar con objetos de página es una metodología popular en las pruebas de interfaz de usuario de extremo a extremo. Los archivos colocados en esta carpeta se cargan automáticamente en el espacio de nombres api `.page`, siendo el nombre del archivo el nombre del objeto de página. Consulte la sección [trabajar con objetos de página](https://nightwatchjs.org/guide/working-with-page-objects/) para detalles.

#### `globals.js`
El archivo globals externo puede contener propiedades globales o hooks. Ver la sección [prueba global](https://nightwatchjs.org/gettingstarted/configuration/#test-globals).

## Instalación en un proyecto ya creado

``` sh
vue add e2e-nightwatch
```

## Configuración

Preconfiguramos Nightwatch para que se ejecute con Chrome de forma predeterminada. Firefox también está disponible a través de `--env firefox`. Si desea ejecutar pruebas de extremo a extremo en navegadores adicionales (por ejemplo, Safari, Microsoft Edge), deberá agregar un `nightwatch.conf.js` o` nightwatch.json` en la raíz del proyecto para configurar navegadores adicionales. La configuración se fusionará en la [configuración interna de Nightwatch](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-plugin-e2e-nightwatch/nightwatch.config.js).

Alternativamente, puede reemplazar completamente la configuración interna con un archivo de configuración personalizado utilizando la opción `--config`.

Consulte los documentos de Nightwatch para [opciones de configuración](https://nightwatchjs.org/gettingstarted/configuration/) y cómo [configurar los controladores del navegador](http://nightwatchjs.org/gettingstarted#browser-drivers-setup).

## Ejecutando pruebas

Por defecto, todas las pruebas dentro de la carpeta `specs` se ejecutarán con Chrome. Si desea ejecutar pruebas de extremo a extremo contra Chrome (o Firefox) en modo headless, simplemente pase el argumento `--headless`.

```sh
$ vue-cli-service test:e2e
```

**Ejecutando una sola prueba**

Para ejecutar una sola prueba, proporcione la ruta del nombre del archivo. P.ej.:

```sh
$ vue-cli-service test:e2e tests/e2e/specs/test.js
```

**Saltar inicio automático del servidor Dev**

Si el servidor de desarrollo ya se está ejecutando y desea omitir el inicio automático, pase el argumento `--url`:

```sh
$ vue-cli-service test:e2e --url http://localhost:8080/
```

**Ejecutando en Firefox**

El soporte para ejecutar pruebas en Firefox también está disponible de forma predeterminada. Simplemente ejecute lo siguiente (opcionalmente agregue `--headless` para ejecutar Firefox en modo sin cabeza):

```sh
$ vue-cli-service test:e2e --env firefox [--headless]
```

**Ejecutando en Firefox y Chrome simultáneamente**

También puede ejecutar las pruebas simultáneamente en ambos navegadores proporcionando ambos entornos de prueba separados por una coma (","), sin espacios.

```sh
$ vue-cli-service test:e2e --env firefox,chrome [--headless]
```

**Ejecución de pruebas en paralelo**

Para una ejecución de prueba significativamente más rápida, puede habilitar la ejecución de prueba paralela cuando hay varios conjuntos de pruebas. La concurrencia se realiza a nivel de archivo y se distribuye automáticamente por núcleo de CPU disponible.

Por ahora, esto solo está disponible en Chromedriver. Leer más sobre [funcionamiento en paralelo](https://nightwatchjs.org/guide/running-tests/#parallel-running) en la documentacióm de Nightwatch.

```sh
$ vue-cli-service test:e2e --parallel
```

**Correr con Selenium**

Desde `v4`, el servidor independiente Selenium ya no está incluido en este complemento y, en la mayoría de los casos, no se requiere ejecutar Selenium desde Nightwatch v1.0.

Todavía es posible usar el servidor Selenium siguiendo estos pasos:

__1 .__ Instalar el paquete NPM `selenium-server`:

  ```sh
  $ npm install selenium-server --save-dev
  ```

__2 .__ Ejecutar con el argumento cli `--use-selenium`:

  ```sh
  $ vue-cli-service test:e2e --use-selenium
  ```
