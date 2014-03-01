#!/usr/bin/env node

var nopt = require('nopt')
  , log = require('npmlog')
  , path = require('path')
  , pkg = require('../package')
  , split = require('split')
  , fs = require('fs')
  , Parser = require('../').Parser
  , Message = require('../').Message
  , Segment = require('../').Segment
  , knownOpts = { loglevel: ['verbose', 'info', 'error', 'warn', 'silent']
                , file: path
                , help: Boolean
                , version: Boolean
                , segments: Boolean
                , count: Boolean
                , json: Boolean
                }
  , shortHand = { verbose: ['--loglevel', 'verbose']
                , quiet: ['--loglevel', 'silent']
                , f: ['--file']
                , v: ['--version']
                , h: ['--help']
                , H: ['--help']
                , s: ['--segments']
                , c: ['--count']
                , j: ['--json']
                }
  , parsed = nopt(knownOpts, shortHand)

log.heading = 'nodengine-hl7'

if (parsed.loglevel) log.level = parsed.loglevel

if (parsed.json) parsed.loglevel = 'quiet'

if (parsed.help) {
  return help()
}

if (parsed.version) {
  console.log('nehl7', 'v'+pkg.version)
  process.exit()
}

function help() {
  console.log('nehl7', 'v'+pkg.version)
  console.log()
  console.log(' usage: nehl7 [options]')
  console.log()
  console.log(' options:')
  console.log()
  console.log('   -l, --loglevel <level>', '      ', 'set the log level')
  console.log('   -f, --file <file>', '           ', 'parse file')
  console.log('   -s, --segments', '              ', 'only show segment types')
  console.log('   -c, --count', '                 ', 'print message count')
  console.log('   -j, --json', '                  ', 'print output in json')
  console.log('   -h, --help', '                  ', 'shows help and usage')
  console.log('   -v, --version', '               ', 'shows the current version')
  process.exit(1)
}

var buf = ''
  , parser = new Parser()
  , stream
process.stdin.setEncoding('utf8')

if (parsed.file) {
  stream = fs.createReadStream(parsed.file)
} else {
  // expect stdin
  var stream = process.stdin
}
stream
  .pipe(split(/\r/))
  .pipe(parser)

var mCount = 0
  , out = []
parser.on('message', function(message) {
  mCount++
  if (parsed.json) {
    var m = []
    message.segments.forEach(function(s) {
      m.push(s.parsed)
    })
    out.push(m)
  } else
  if (parsed.segments) {
    log.info('message', mCount)
    message.segmentTypes.forEach(function(s) {
      log.info('segment', s)
    })
  } else {
    message.segments.forEach(function(s) {
      log.info(s.parsed.SegmentType, s.parsed)
    })
  }
})

parser.on('finish', function() {
  if (parsed.json) {
    console.log(JSON.stringify(out, null, 2))
  } else if (parsed.count) {
    log.info('message count', mCount)
  }
  process.exit()
})

parser.on('error', function(e) {
  log.error('parse', e)
  process.exit(1)
})
