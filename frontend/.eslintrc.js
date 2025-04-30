module.exports = {
    extends: ['react-app'],
    rules: {
      'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    },
  };