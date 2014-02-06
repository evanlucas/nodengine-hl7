#!/usr/bin/env node

var fs = require('fs')
  , log = require('npmlog')
  , args = process.argv.splice(2)

log.heading = 'segmentdef'

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

var file = [
    'var segment = exports'
  , ''
  , 'segment.parse = function(data, delims) {'
  , '  data = String(data)'
  , '  var out = {}'
  , '  var comps = data.split(delims.field)'
  , '  var len = comps.length'
  , '  for (var i=0; i<len; i++) {'
  , '    out[segment.fields[i]] = comps[i]'
  , '  }'
  , '  return out'
  , '}'
  , ''
  , 'segment.fields = ['
  , "    'SegmentType'"
]

file = file.concat(lines)
file.push(']')
console.log(file.join('\n'))
