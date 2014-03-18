// Not yet implemented
var types = exports

types.types = {
  ST: {
    description: 'String',
    type: String
  },
  TX: {
    description: 'Text data',
    type: String
  },
  FT: {
    description: 'Formatted text',
    type: String
  },
  CQ: {
    description: 'Composite quantity with units', // <quantity (NM)> ^ <units (CE)>
    type: String
  },
  MO: {
    description: 'Money', // <quantity (NM) > ^ <denomination (ID)>
    type: String
  },
  NM: {
    description: 'Numeric',
    type: Number
  },
  SI: {
    description: 'Sequence ID',
    type: Number
  },
  SN: {
    description: 'Strucured numeric', // <comparator (ST)> ^ <num1 (NM)> ^ (separator/suffox (ST)> ^ <num2 (NM)>
    type: String
  },
  ID: {
    description: 'Coded values for HL7 tables',
    type: String // Could be a number?
  },
  IS: {
    description: 'Coded value for user-defined tables',
    type: String
  },
  VID: {
    description: 'Version identifier', // <version ID (ID)> ^ <internationilization code (CE)> ^ <international version ID (CE)>
    type: String
  },
  HD: {
    description: 'Hierarchic designator', // <namespace ID (IS)> ^ <universal ID (ST)> ^ <universal ID type (ID)>
    type: String
  },
  EI: {
    description: 'Entity identifier',
    type: String
  }
}

types.descriptionForType = function(type) {
  if (~types.types.indexOf(type)) {
    return types.types[type].description
  }
  return null
}
