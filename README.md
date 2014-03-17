# nodengine-hl7
## Installation
```sh
$ npm install --save nodengine-hl7
```

## Unit Tests

To run tests:

```bash
$ npm test
```

**NOTE: All hl7 test fixtures are samples taken from various places on the internet**

To generate code coverage:

```bash
$ npm run cover
```

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

### e

  TODO Remove this and add a default segment parser
  This is mainly in place so we can see what default
  segments we are missing

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


***

## Development

### homebrew

- To install, copy and paste the below into Terminal, hit enter, and follow the onscreen instructions

```
ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
```

### node.js

- Go to http://nodejs.org and click download
- Then, follow the instructions

### Xcode (including command line tools)

- Download from the App Store
- To install command line tools, open Terminal and run:

```bash
$ git
```

### jscoverage (for code coverage)

- Clone the repo

```bash
$ git clone https://github.com/visionmedia/node-jscoverage
$ cd node-jscoverage
$ ./configure --prefix=/usr/local
$ make
$ make install
```
