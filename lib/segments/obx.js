'use strict'

exports.name = 'OBX'

exports.fields = [
    'SegmentType'
    , 'SetID'                                 //7.1.1.1     OBX-1   Set ID   OBX   (SI)   00569
    , 'ValueType'                             //7.1.1.2	    OBX-2   Value Type   (ID)   00570
    , 'ObservationIdentifier'                 //7.1.1.3	    OBX-3   Observation Identifier   (CWE)   00571
    , 'ObservationSub-ID'                     //7.1.1.4	    OBX-4   Observation Sub ID   (ST)   00572
    , 'ObservationValue'                      //7.1.1.5	    OBX-5   Observation Value   (varies)   00573
    , 'Units'                                 //7.1.1.6	    OBX-6   Units   (CWE)   00574
    , 'ReferencesRange'                       //7.1.1.7	    OBX-7   References Range   (ST)   00575
    , 'AbnormalFlags'                         //7.1.1.8	    OBX-8   Abnormal Flags   (IS)   00576
    , 'Probability'                           //7.1.1.9     OBX-9   Probability   (NM)   00577
    , 'NatureofAbnormalTest'                  //7.1.1.10    OBX-10   Nature of abnormal test   (ID)   00578
    , 'ObservationResultStatus'               //7.1.1.11	OBX-11   Observation Result Status   (ID)   00579
    , 'EffectiveDateofReferenceRange'         //7.1.1.12	OBX-12   Effective Date of Reference Range   (DTM)   00580
    , 'UserDefinedAccessChecks'               //7.1.1.13	OBX-13   User Defined Access Checks   (ST)   00581
    , 'DateTimeoftheObservation'              //7.1.1.14	OBX-14   Date/Time of the Observation   (DTM)   00582
    , 'ProducersID'                           //7.1.1.15	OBX-15   Producer's ID   (CWE)   00583
    , 'ResponsibleObserver'                   //7.1.1.16	OBX-16   Responsible Observer   (XCN)   00584
    , 'ObservationMethod'                     //7.1.1.17	OBX-17   Observation Method   (CWE)   00936
    , 'EquipmentInstanceIdentifier'           //7.1.1.18	OBX-18   Equipment Instance Identifier   (EI)   01479
    , 'DateTimeoftheAnalysis'                 //7.1.1.19	OBX-19   Date/Time of the Analysis   (DTM)   01480
    , 'ObservationSite'                       //7.1.1.20	OBX-20   Observation Site   (CWE)   02179
    , 'ObservationInstanceIdentifier'         //7.1.1.21	OBX-21   Observation Instance Identifier   (EI)   02180
    , 'MoodCode'                              //7.1.1.22	OBX-22   Mood Code   (CNE)   02182
    , 'PerformingOrganizationName'            //7.1.1.23	OBX-23   Performing Organization Name   (XON)   02283
    , 'PerformingOrganizationAddress'         //7.1.1.24	OBX-24   Performing Organization Address   (XAD)   02284
    , 'PerformingOrganizationMedicalDirector' //7.1.1.25	OBX-25   Performing Organization Medical Director   (XCN)   02285

]
