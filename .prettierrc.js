/** @type {import('prettier').Config} */

module.exports = {
  singleQuote: true,
  tabWidth: 2,
  semi: false,
  trailingComma: 'none',
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js'
}
