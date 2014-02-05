var parser = require('./lib')
  , split = require('split')

process.stdin
  .pipe(split(/\r|\n/))
  .pipe(parser())
  .pipe(process.stdout)
