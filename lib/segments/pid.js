'use strict'

exports.name = 'PID'

exports.fields = [
    'SegmentType'
    , 'SetID'                      	//3.4.2.1	PID-1   Set ID   PID   (SI)   00104
    , 'PatientID'                  	//3.4.2.2	PID-2   Patient ID   (CX)   00105
    , 'PatientIdentifierList'      	//3.4.2.3	PID-3   Patient Identifier List   (CX)   00106
    , 'AlternatePatientID'         	//3.4.2.4	PID-4   Alternate Patient ID - PID   (CX)   00107
    , 'PatientName'                	//3.4.2.5	PID-5   Patient Name   (XPN)   00108
    , 'MothersMaidenName'          	//3.4.2.6	PID-6   Mother's Maiden Name   (XPN)   00109
    , 'DateTimeofBirth'            	//3.4.2.7	PID-7   Date/Time of Birth   (DTM)   00110
    , 'AdministrativeSex'          	//3.4.2.8	PID-8   Administrative Sex   (IS)   00111
    , 'PatientAlias'               	//3.4.2.9	PID-9   Patient Alias   (XPN)   00112
    , 'Race'                       	//3.4.2.10	PID-10   Race   (CWE)   00113
    , 'PatientAddress'             	//3.4.2.11	PID-11   Patient Address   (XAD)   00114
    , 'CountyCode'                 	//3.4.2.12	PID-12   County Code   (IS)   00115
    , 'PhoneNumberHome'            	//3.4.2.13	PID-13   Phone Number - Home   (XTN)   00116
    , 'PhoneNumberBusiness'        	//3.4.2.14	PID-14   Phone Number   Business   (XTN)   00117
    , 'PrimaryLanguage'            	//3.4.2.15	PID-15   Primary Language   (CWE)   00118
    , 'MaritalStatus'              	//3.4.2.16	PID-16   Marital Status   (CWE)   00119
    , 'Religion'                   	//3.4.2.17	PID-17   Religion   (CWE)   00120
    , 'PatientAccountNumber'       	//3.4.2.18	PID-18   Patient Account Number   (CX)   00121
    , 'SSNNumberPatient'           	//3.4.2.19	PID-19   SSN Number   Patient   (ST)   00122
    , 'DriversLicenseNumberPatient'	//3.4.2.20	PID-20   Driver's License Number - Patient   (DLN)   00123
    , 'MothersIdentifier'          	//3.4.2.21	PID-21   Mother's Identifier   (CX)   00124
    , 'EthnicGroup'                	//3.4.2.22	PID-22   Ethnic Group   (CWE)   00125
    , 'BirthPlace'                 	//3.4.2.23	PID-23   Birth Place   (ST)   00126
    , 'MultipleBirthIndicator'     	//3.4.2.24	PID-24   Multiple Birth Indicator   (ID)   00127
    , 'BirthOrder'                 	//3.4.2.25	PID-25   Birth Order   (NM)   00128
    , 'Citizenship'                	//3.4.2.26	PID-26   Citizenship   (CWE)   00129
    , 'VeteransMilitaryStatus'     	//3.4.2.27	PID-27   Veterans Military Status   (CWE)   00130
    , 'Nationality'                	//3.4.2.28	PID-28   Nationality   (CWE)   00739
    , 'PatientDeathDateandTime'    	//3.4.2.29	PID-29   Patient Death Date and Time   (DTM)   00740
    , 'PatientDeathIndicator'      	//3.4.2.30	PID-30   Patient Death Indicator   (ID)   00741
    , 'IdentityUnknownIndicator'   	//3.4.2.31	PID-31   Identity Unknown Indicator   (ID)   01535
    , 'IdentityReliabilityCode'    	//3.4.2.32	PID-32   Identity Reliability Code   (IS)   01536
    , 'LastUpdateDateTime'         	//3.4.2.33	PID-33   Last Update Date/Time   (DTM)   01537
    , 'LastUpdateFacility'         	//3.4.2.34	PID-34   Last Update Facility   (HD)   01538
    , 'SpeciesCode'                	//3.4.2.35	PID-35   Species Code   (CWE)   01539
    , 'BreedCode'                  	//3.4.2.36	PID-36   Breed Code   (CWE)   01540
    , 'Strain'                     	//3.4.2.37	PID-37   Strain   (ST)   01541
    , 'ProductionClassCode'        	//3.4.2.38	PID-38   Production Class Code   (CWE)   01542
    , 'TribalCitizenship'          	//3.4.2.39	PID-39   Tribal Citizenship   (CWE)   01840
]

