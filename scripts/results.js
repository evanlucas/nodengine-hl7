#!/usr/bin/env node

var colors = require('colors')
var results = require('../coverage.json')

var sloc = results.sloc
  , hits = results.hits
  , coverage = results.coverage
  , files = results.files

console.log()
console.log('Code Coverage:')

files.forEach(function(file) {
  getFile(file)
})

function formatCoverage(cov) {
  if (cov < 25) {
    return colors.red(cov+'%')
  } else if (cov < 50) {
    return colors.yellow(cov+'%')
  } else if (cov < 75) {
    return colors.grey(cov+'%')
  }
  return colors.cyan(cov+'%')
}

function getFile(file) {
  console.log()
  console.log(' '+file.filename)
  console.log('   COVERAGE:', formatCoverage(file.coverage))
  console.log('   SLOC:    ', colors.cyan(file.sloc))
  console.log('   HITS:    ', colors.cyan(file.hits))
}

console.log()
console.log(' Overall')
console.log('   COVERAGE:', formatCoverage(coverage))
console.log('   SLOC:    ', colors.cyan(sloc))
console.log('   HITS:    ', colors.cyan(hits))
