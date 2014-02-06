#!/usr/bin/env node

var fs = require('fs')
  , log = require('npmlog')
  , args = process.argv.splice(2)
  , path = require('path')

if (args.length !== 1) {
  log.error('invalid args')
  log.error('usage', 'stripline <file>')
  process.exit(1)
}

var contents = fs.readFileSync(args[0], 'utf8')

var lines = contents.split('\n')

lines = lines.filter(function(line) {
  return (line && line !== '' && line !== '\n')
})

lines = lines.map(function(line, idx) {
  if (matches = line.match(/SetID ?\-.../)) {
    line = 'SetID'
  }
  line = line.replace(/[\-\*\s\/\'\+\#]/g, '')
  return "  , '"+line+"'"
})

var name = path.basename(args[0])
var file = [
    "exports.name = '"+name+"'"
  , ''
  , 'exports.fields = ['
  , "    'SegmentType'"
]

file = file.concat(lines)
file.push(']')
console.log(file.join('\n'))
