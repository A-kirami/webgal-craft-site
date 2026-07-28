/** @type {import('stylelint').Config} */
export default {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order',
    '@stylistic/stylelint-config',
  ],
  plugins: ['stylelint-declaration-block-no-ignored-properties'],
  overrides: [
    {
      files: ['**/*.astro', '**/*.svelte'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'color-named': ['never', { ignore: ['inside-function'] }],
    'color-hex-length': 'long',
    'function-url-no-scheme-relative': true,
    // Stylelint 无法解析分散在不同 CSS 文件中的共享关键帧
    'no-unknown-animations': null,
    'import-notation': 'string',
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'local', 'deep', 'slotted'],
      },
    ],
    'selector-pseudo-element-no-unknown': true,
    'selector-class-pattern': [
      '^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--(?:[a-z0-9]+(?:-[a-z0-9]+)*))?$',
      { message: 'Expected class selector to use kebab-case or BEM.' },
    ],
    'no-descending-specificity': null,
    'at-rule-no-deprecated': null,
    '@stylistic/max-line-length': null,
    'plugin/declaration-block-no-ignored-properties': true,
    'no-invalid-position-declaration': null,
    'declaration-property-value-no-unknown': null,
    'property-no-vendor-prefix': [
      true,
      {
        ignoreProperties: [
          '-webkit-background-clip',
          '-webkit-font-smoothing',
          '-webkit-mask',
          '-webkit-mask-image',
          '-webkit-tap-highlight-color',
          '-webkit-text-fill-color',
        ],
      },
    ],
  },
}
