module.exports = function () {
  return {
    env: {
      production: {
        plugins:
          process.env.REACT_APP_MODE === 'production'
            ? ['transform-remove-console', { exclude: ['error', 'warn'] }]
            : []
      }
    }
  };
};
