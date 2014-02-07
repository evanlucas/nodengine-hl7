## nodengine-hl7

### Message

#### Message.prototype.hasSegments()

Does this message have any segments?

***

#### Message.prototype.addSegment()

Adds the given _segment_ to the message

##### Params

| Name | Type(s) | Description |
| ---- | ------- | ----------- |
| segment | [Segment](segment.md) | The Segment to add to the message |

***

#### Message.prototype.getHeader()

Gets the header Segment of the Message

***

#### Message.prototype.delimiters()

Gets the delimiters for the given message. These are taken from the MSH.