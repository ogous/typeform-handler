module.exports = {
  '*.{js,ts,jsx,tsx}': [
    'eslint --fix',
    'prettier --write "**/*.{ts,js,tsx,jsx}"'
  ],
  '*.{json,md}': 'prettier --write "**/*.{md,json}"'
}
