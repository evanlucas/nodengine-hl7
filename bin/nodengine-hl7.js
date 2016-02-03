#!/usr/bin/env node

'use strict'

var nopt = require('nopt')
  , log = require('npmlog')
  , path = require('path')
  , pkg = require('../package')
  , split = require('split')
  , help = require('help')()
  , fs = require('fs')
  , Parser = require('../').Parser
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
  console.log('ne-hl7', 'v'+pkg.version)
  process.exit()
}

var parser = new Parser()
  , stream
process.stdin.setEncoding('utf8')

if (parsed.file) {
  stream = fs.createReadStream(parsed.file)
} else {
  // expect stdin
  stream = process.stdin
}
stream
  .pipe(split(/\r/))
  .pipe(parser)

var mCount = 0
  , out = []
parser.on('message', function(message) {
  mCount++
  if (parsed.json) {
    var m = message.segments.map(function(s) {
      return s.parsed
    })
    out.push(m)
  } else
  if (parsed.segments) {
    log.info('message', mCount)
    for (var i=0, len=message.segmentTypes.length; i<len; i++) {
      log.info('segment', message.segmentTypes[i])
    }
  } else {
    var segs = message.segments
    for (var i=0, len=segs.length; i<len; i++) {
      log.info(segs[i].parsed.SegmentType, segs[i].parsed)
    }
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
