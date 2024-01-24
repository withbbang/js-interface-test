module.exports = {
  plugins:
    process.env.REACT_APP_MODE === 'prod'
      ? [['transform-remove-console', { exclude: ['error', 'warn'] }]]
      : []
};
