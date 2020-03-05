# @vue/cli-plugin-e2e-cypress

> plugin e2e-cypress para vue-cli

Esto agrega soporte para pruebas E2E usando [Cypress](https://www.cypress.io/).

Cypress ofrece una rica interfaz interactiva para ejecutar pruebas E2E, pero actualmente solo admite la ejecución de pruebas en Chromium. Si tiene un requisito difícil en las pruebas E2E en varios navegadores, considere usar el Selenium-based [@vue/cli-plugin-e2e-nightwatch](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-e2e-nightwatch).

## Comandos inyectados

- **`vue-cli-service test:e2e`**

  Ejecute pruebas e2e con `cypress run`.

  Por defecto, lanza Cypress en modo interactivo con una GUI. Si desea ejecutar las pruebas en modo headless (por ejemplo, para CI), puede hacerlo con la opción `--headless`.

  El comando inicia automáticamente un servidor en modo de producción para ejecutar las pruebas de e2e. Si desea ejecutar las pruebas varias veces sin tener que reiniciar el servidor cada vez, puede iniciar el servidor con `vue-cli-service serve --mode production` en una terminal, y luego ejecutar pruebas e2e contra ese servidor usando el Opción `--url`.

  Opciones:

  ```
  --headless ejecutar en modo headless sin GUI
  --mode     especifique el modo en el que se debe ejecutar el servidor de desarrollo. (predeterminado: producción)
  --url      ejecutar pruebas de e2e contra la URL dada en lugar de iniciar automáticamente el servidor de desarrollo
  -s, --spec (solamente headless) ejecuta un archivo de especificaciones específico. el valor predeterminado es "todos"
  ```

  Adicionalmente:

  - En modo GUI, [todas las opciones de Cypress CLI para `cypress open` también son compatibles](https://docs.cypress.io/guides/guides/command-line.html#cypress-open);
  - En el modo `--headless`, [todas las opciones de Cypress CLI para `cypress run` también son compatibles](https://docs.cypress.io/guides/guides/command-line.html#cypress-run).

 Ejemplos:
   - Ejecute Cypress en modo headless para un archivo específico: `vue-cli-service test:e2e --headless --spec tests/e2e/specs/actions.spec.js`

## Configuración

Hemos preconfigurado Cypress para colocar la mayoría de los archivos relacionados con las pruebas de e2e en `<projectRoot>/tests/e2e`. También puede consultar [cómo configurar Cypress a través de `cypress.json`](https://docs.cypress.io/guides/references/configuration.html#Options).

## Variables de entorno

Cypress no carga archivos .env para sus archivos de prueba de la misma manera que lo hace `vue-cli` para su [código de aplicación](https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code). Cypress admite algunas formas de [definir variables env](https://docs.cypress.io/guides/guides/environment-variables.html#) pero la más fácil es usar archivos .json (ya sea `cypress.json` o `cypress.env.json`) para definir variables de entorno. Tenga en cuenta que esas variables son accesibles a través de la función `Cypress.env` en lugar del objeto regular `process.env`.

## Instalación en un proyecto ya creado

``` sh
vue add e2e-cypress
```
