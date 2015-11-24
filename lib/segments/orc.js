'use strict'

exports.name = 'ORC'

exports.fields = [
    'SegmentType'
    , 'OrderControl'                           	//4.5.1.1	ORC-1   Order Control   (ID)   00215 4-33
    , 'PlacerOrderNumber'                      	//4.5.1.2	ORC-2   Placer Order Number   (EI)   00216 4-33
    , 'FillerOrderNumber'                      	//4.5.1.3	ORC-3   Filler Order Number   (EI)   00217 4-34
    , 'PlacerGroupNumber'                      	//4.5.1.4	ORC-4   Placer Group Number   (EI)   00218 4-35
    , 'OrderStatus'                            	//4.5.1.5	ORC-5   Order Status   (ID)   00219 4-35
    , 'ResponseFlag'                           	//4.5.1.6	ORC-6   Response Flag   (ID)   00220 4-35
    , 'QuantityTiming'                         	//4.5.1.7	ORC-7   Quantity/Timing   (TQ)   00221 4-36
    , 'Parent'                                 	//4.5.1.8	ORC-8   Parent   (EIP)   00222 4-36
    , 'DateTimeofTransaction'                  	//4.5.1.9	ORC-9   Date/Time of Transaction   (DTM)   00223 4-37
    , 'EnteredBy'                              	//4.5.1.10	ORC-10   Entered By   (XCN)   00224 4-37
    , 'VerifiedBy'                             	//4.5.1.11	ORC-11   Verified By   (XCN)   00225 4-37
    , 'OrderingProvider'                       	//4.5.1.12	ORC-12   Ordering Provider   (XCN)   00226 4-38
    , 'EnterersLocation'                       	//4.5.1.13	ORC-13   Enterer's Location   (PL)   00227 4-38
    , 'CallBackPhoneNumber'                    	//4.5.1.14	ORC-14   Call Back Phone Number   (XTN)   00228 4-39
    , 'OrderEffectiveDateTime'                 	//4.5.1.15	ORC-15   Order Effective Date/Time   (DTM)   00229 4-39
    , 'OrderControlCodeReason'                 	//4.5.1.16	ORC-16   Order Control Code Reason   (CWE)   00230 4-39
    , 'EnteringOrganization'                   	//4.5.1.17	ORC-17   Entering Organization   (CWE)   00231 4-39
    , 'EnteringDevice'                         	//4.5.1.18	ORC-18   Entering Device   (CWE)   00232 4-40
    , 'ActionBy'                               	//4.5.1.19	ORC-19   Action By   (XCN)   00233 4-40
    , 'AdvancedBeneficiaryNoticeCode'          	//4.5.1.20	ORC-20   Advanced Beneficiary Notice Code   (CWE)   01310 4-40
    , 'OrderingFacilityName'                   	//4.5.1.21	ORC-21   Ordering Facility Name   (XON)   01311 4-41
    , 'OrderingFacilityAddress'                	//4.5.1.22	ORC-22   Ordering Facility Address   (XAD)   01312 4-41
    , 'OrderingFacilityPhoneNumber'            	//4.5.1.23	ORC-23   Ordering Facility Phone Number   (XTN)   01313 4-41
    , 'OrderingProviderAddress'                	//4.5.1.24	ORC-24   Ordering Provider Address   (XAD)   01314 4-41
    , 'OrderStatusModifier'                    	//4.5.1.25	ORC-25   Order Status Modifier   (CWE)   01473 4-42
    , 'AdvancedBeneficiaryNoticeOverrideReason'	//4.5.1.26	ORC-26   Advanced Beneficiary Notice Override Reason   (CWE)   01641 4-42
    , 'FillersExpectedAvailabilityDateTime'    	//4.5.1.27	ORC-27   Filler's Expected Availability Date/Time   (DTM)   01642 4-42
    , 'ConfidentialityCode'                    	//4.5.1.28	ORC-28   Confidentiality Code   (CWE)   00615 4-42
    , 'OrderType'                              	//4.5.1.29	ORC-29   Order Type   (CWE)   01643 4-43
    , 'EntererAuthorizationMode'               	//4.5.1.30	ORC-30   Enterer Authorization Mode   (CNE)   01644 4-43
    , 'ParentUniversalServiceIdentifier'       	//4.5.1.31	ORC-31   Parent Universal Service Identifier   (CWE)   02287 4-43
]

