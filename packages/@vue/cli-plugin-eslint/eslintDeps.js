const DEPS_MAP = {
  base: {
    eslint: '^6.7.2',
    'eslint-plugin-vue': '^6.1.2'
  },
  airbnb: {
    '@vue/eslint-config-airbnb': '^5.0.1',
    'eslint-plugin-import': '^2.18.2'
  },
  prettier: {
    '@vue/eslint-config-prettier': '^6.0.0',
    'eslint-plugin-prettier': '^3.1.1',
    prettier: '^1.19.1'
  },
  standard: {
    '@vue/eslint-config-standard': '^5.1.0',
    'eslint-plugin-import': '^2.18.2',
    'eslint-plugin-node': '^9.1.0',
    'eslint-plugin-promise': '^4.2.1',
    'eslint-plugin-standard': '^4.0.0'
  },
  typescript: {
    '@vue/eslint-config-typescript': '^5.0.1',
    '@typescript-eslint/eslint-plugin': '^2.10.0',
    '@typescript-eslint/parser': '^2.10.0'
  }
}

exports.DEPS_MAP = DEPS_MAP

exports.getDeps = function (api, preset) {
  const deps = Object.assign({}, DEPS_MAP.base, DEPS_MAP[preset])

  if (api.hasPlugin('typescript')) {
    Object.assign(deps, DEPS_MAP.typescript)
  }

  if (api.hasPlugin('babel') && !api.hasPlugin('typescript')) {
    Object.assign(deps, {
      'babel-eslint': '^10.0.3'
    })
  }

  return deps
}
