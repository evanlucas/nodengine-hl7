module.exports = process.env.NODENGINEHL7_COV
  ? require('./lib-cov')
  : require('./lib')
