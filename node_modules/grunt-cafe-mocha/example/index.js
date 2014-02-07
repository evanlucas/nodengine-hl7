module.exports = process.env.COV
    ? require('./lib-cov/example')
    : require('./lib/example');
