module.exports = {
  '**/*.{ts,tsx}': [
    (filenames) => `eslint ${filenames.join(' ')} --max-warnings 0`,
    (filenames) =>
      filenames.map((filename) => `prettier --write '${filename}'`),
  ],
};
