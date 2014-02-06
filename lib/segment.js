var Buffer = require('buffer').Buffer
  , MSH = require('./segments/msh')
  , MSA = require('./segments/msa')
  , ERR = require('./segments/err')
  , QRD = require('./segments/qrd')
  , URD = require('./segments/urd')
  , URS = require('./segments/urs')
  , DSC = require('./segments/dsc')
  , DSP = require('./segments/dsp')
  , ADD = require('./segments/add')
  , FHS = require('./segments/fhs')
  , FTS = require('./segments/fts')
  , BHS = require('./segments/bhs')
  , BTS = require('./segments/bts')
  , NTE = require('./segments/nte')
  , EQL = require('./segments/eql')
  , VTQ = require('./segments/vtq')
  , RDF = require('./segments/rdf')
  , RDT = require('./segments/rdt')
  , SPR = require('./segments/spr')
  , ERQ = require('./segments/erq')
  , QAK = require('./segments/qak')
  , EVN = require('./segments/evn')
  , PID = require('./segments/pid')
  , PV1 = require('./segments/pv1')
  , PV2 = require('./segments/pv2')
  , NK1 = require('./segments/nk1')
  , AL1 = require('./segments/al1')
  , NPU = require('./segments/npu')
  , MRG = require('./segments/mrg')
  , PD1 = require('./segments/pd1')
  , DB1 = require('./segments/db1')

var types = {
    'MSH': MSH
  , 'MSA': MSA
  , 'ERR': ERR
  , 'QRD': QRD
  , 'URD': URD
  , 'URS': URS
  , 'DSC': DSC
  , 'DSP': DSP
  , 'ADD': ADD
  , 'FHS': FHS
  , 'FTS': FTS
  , 'BHS': BHS
  , 'BTS': BTS
  , 'NTE': NTE
  , 'EQL': EQL
  , 'VTQ': VTQ
  , 'RDF': RDF
  , 'RDT': RDT
  , 'SPR': SPR
  , 'ERQ': ERQ
  , 'QAK': QAK
  , 'EVN': EVN
  , 'PID': PID
  , 'PV1': PV1
  , 'PV2': PV2
  , 'NK1': NK1
  , 'AL1': AL1
  , 'NPU': NPU
  , 'MRG': MRG
  , 'PD1': PD1
  , 'DB1': DB1
}

module.exports = Segment

function Segment() {
  if (!(this instanceof Segment))
    return new Segment()
  this.delimiters = {
    segment: '\r',
    field: '|',
    component: '^',
    subcomponent: '&',
    repetition: '~',
    escape: '\\'
  }
}

Segment.prototype.parse = function(data) {
  if (Buffer.isBuffer(data)) {
    var s = data.slice(0, 3).toString()
    if (s === 'MSH') {
      var delims = data.slice(3, 7).toString()
      this.delimiters.segment = data.slice(-1).toString()
      this.delimiters.field = delims[0]
      this.delimiters.repetition = delims[1]
      this.delimiters.escape = delims[2]
      this.delimiters.subcomponent = delims[3]
    }
    if (types.hasOwnProperty(s)) {
      return types[s].parse(data, this.delimiters)
    } else {
      //throw new Error('Invalid Segment', data.toString())
    }
  }
  return data.toString()
}
