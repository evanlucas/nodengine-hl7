#!/usr/bin/env node

var log = require('npmlog')
  , fs = require('fs')
  , args = process.argv.splice(2)
  , path = require('path')

if (!args.length) {
  log.error('invalid args')
  log.error('usage', 'fixsegments <dir>')
  process.exit(1)
}

var dir = path.join(args[0])

fs.readdirSync(args[0])
  .filter(function(file) {
    return path.extname(file) === '.js'
  })
  .forEach(function(file) {
    fixFile(file)
  })

function fixFile(file) {
  var name = file.replace('.js', '').toUpperCase()
  var fp = path.join(dir, file)
  var contents = fs.readFileSync(fp, 'utf8')
  var nameFixed = false
    , exportsFixed = false

  if (~contents.indexOf('segment.name = ')) {
    nameFixed = true
  }

  if (~contents.indexOf('exports.fields')) {
    exportsFixed = true
  }
  if (nameFixed && exportsFixed) {
    log.info('skip', name, 'already fixed')
    return
  }
  var lines = contents.split('\n')
  var len = lines.length
  var found = -1
  var foundEnd = -1
  for (var i=0; i<len; i++) {
    var line = lines[i]
    if (~line.indexOf('segment.fields = [')) {
      found = i
    }
    if (~line.indexOf('exports.fields = [')) {
      found = i
    }
    if (found !== -1) {
      if (line === ']') {
        foundEnd = i+1
        break
      }
    }
  }

  if (found === -1 || foundEnd === -1) {
    log.error(name, 'cannot field fields')
    return
  }

  log.info('found', name, found, foundEnd)
  var out = []
  if (!nameFixed) {
    out.push("exports.name = '"+name+"'")
    out.push('')
  }

  if (!exportsFixed) {
    log.warn(name, 'exports is not fixed')
    var fields = lines.slice(found, foundEnd)
    var firstField = fields[0]
    if (firstField === 'segment.fields = [') {
      fields[0] = firstField.replace('segment', 'exports')
    }
    out = out.concat(fields)
  } else {
    var fields = lines.slice(found, foundEnd)
    out = out.concat(fields)
  }

  if (out[out.length-1] !== '')
    out.push('\n')

  console.log(out.join('\n'))
  //log.info('done', name, out.join('\n'))
  //fs.writeFileSync(fp, out.join('\n'), 'utf8')
}
