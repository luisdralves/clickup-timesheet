module.exports = {
  extends: ['next/core-web-vitals', '@untile/eslint-config-typescript-react'],
  plugins: ['react-refresh'],
  rules: {
    'id-length': [
      'error',
      {
        exceptions: ['x', 'y', 'z']
      }
    ],
    'react/jsx-max-props-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-refresh/only-export-components': 'warn'
  }
};
