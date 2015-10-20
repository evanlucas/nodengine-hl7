# nodengine-hl7

[![Build Status](https://travis-ci.org/evanlucas/nodengine-hl7.png?branch=master)](https://travis-ci.org/evanlucas/nodengine-hl7)
[![Coverage Status](https://coveralls.io/repos/evanlucas/nodengine-hl7/badge.svg?branch=master&service=github)](https://coveralls.io/github/evanlucas/nodengine-hl7?branch=master)

A hl7 parser

## Installation
```sh
$ npm install --save nodengine-hl7
```

## Basic Example (Coffescript) 
Transform the following code to JS: http://js2.coffee/
Test messages can be sent with http://www.hl7soup.com/

```
net = require('net')
hl7 = require('nodengine-hl7')
Parser = hl7.Parser
parser = new Parser()

parser.on('error', (err) ->
  console.log('Error parsing:', err)
)

parser.on('messages', (messages) ->
  console.log('Messages:', messages)
)

parser.on('message', (message) ->
  console.log('Message:', message.header.parsed)
)

server = net.createServer((stream) ->
  stream.setEncoding 'utf8'
  stream.addListener 'connect', ->
    console.log 'Client connected'
    return

  stream.pipe(parser)

  stream.addListener 'end', ->
    console.log 'Client disconnected'
    stream.end()
    return
  return
)
server.listen 59895 #or any other port
```

## Unit Tests

To run tests:

```bash
$ npm test
```

**NOTE: All hl7 test fixtures are samples taken from various places on the internet**

## API

### Parser

  Constructor

***

### Message

  Constructor

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| segments | Array, Segment | A single Segment or an array of Segments |


***

### Message.hasSegments()

  Does this message have any segments?



***

### Message.addSegment()

  Adds the given _segment_ to the message

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| segment | Segment | The Segment to add to the message |


***

### Message.getHeader()

  Gets the header Segment of the Message



***

### Message.delimiters()

  Gets the delimiters for the given message. These are taken from the MSH



***

### Segment

  Constructor

***

### Segment.parse()

  Parses _data_ as a hl7 segment

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| data | Buffer, String | The segment |


***

### utils.segmentIsHeader()

  Is the given _segment_ a header segment?

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| segment | Segment | A Segment object |


***

### utils.segmentTypeIsHeader()

  Is the given segment _type_ a header segment?

##### Params
| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| type | String | The segment type |

## License

MIT (See `LICENSE` for more info)
