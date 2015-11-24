'use strict'

exports.name = 'RXG'

exports.fields = [
    'SegmentType'
  , 'GiveSubIDCounter'              //4.14.6.1	RXG-1   Give Sub-ID Counter   (NM)   00342
  , 'DispenseSubIDCounter'          //4.14.6.2	RXG-2   Dispense Sub-ID Counter   (NM)   00334
  , 'QuantityTiming'                //4.14.6.3	RXG-3   Quantity/Timing   (TQ)   00221
  , 'GiveCode'                      //4.14.6.4	RXG-4   Give Code   (CWE)   00317
  , 'GiveAmountMinimum'             //4.14.6.5	RXG-5   Give Amount – Minimum   (NM)   00318
  , 'GiveAmountMaximum'             //4.14.6.6	RXG-6   Give Amount - Maximum   (NM)   00319
  , 'GiveUnits'                     //4.14.6.7	RXG-7   Give Units   (CWE)   00320
  , 'GiveDosageForm'                //4.14.6.8	RXG-8   Give Dosage Form   (CWE)   00321
  , 'AdministrationNotes'           //4.14.6.9	RXG-9   Administration Notes   (CWE)   00351
  , 'SubstitutionStatus'            //4.14.6.10	RXG-10  Substitution Status   (ID)   00322
  , 'DispenseToLocation'            //4.14.6.11	RXG-11  Dispense-to Location   (LA2)   01303
  , 'NeedsHumanReview'              //4.14.6.12	RXG-12  Needs Human Review   (ID)   00307
  , 'PharmacyTreatmentSpecialAdministraionInstructions'     //4.14.6.13	RXG-13   Pharmacy/Treatment Supplier's Special Administration Instructions   (CWE)   00343
  , 'GivePerTimeUnit'               //4.14.6.14	RXG-14  Give Per (Time Unit)   (ST)   00331
  , 'GiveRateAmount'                //4.14.6.15	RXG-15  Give Rate Amount   (ST)   00332
  , 'GiveRateUnits'                 //4.14.6.16	RXG-16  Give Rate Units   (CWE)   00333
  , 'GiveStrength'                  //4.14.6.17	RXG-17  Give Strength   (NM)   01126
  , 'GiveStrengthUnits'             //4.14.6.18	RXG-18  Give Strength Units   (CWE)   01127
  , 'SubstanceLotNumber'            //4.14.6.19	RXG-19  Substance Lot Number   (ST)   01129
  , 'SubstanceExpirationDate'       //4.14.6.20	RXG-20  Substance Expiration Date   (DTM)   01130
  , 'SubstanceManufacturerName'     //4.14.6.21	RXG-21  Substance Manufacturer Name   (CWE)   01131
  , 'Indication'                    //4.14.6.22	RXG-22  Indication   (CWE)   01123
  , 'GiveDrugStrengthVolume'        //4.14.6.23	RXG-23  Give Drug Strength Volume   (NM)   01692
  , 'GiveDrugStrengthVolumeUnits'   //4.14.6.24	RXG-24  Give Drug Strength Volume Units   (CWE)   01693
  , 'GiveBardcodeIdentifier'        //4.14.6.25	RXG-25  Give Barcode Identifier   (CWE)   01694
  , 'PharmacyOrderType'             //4.14.6.26	RXG-26  Pharmacy Order Type   (ID)   01695
  , 'DispenseToPharmacy'            //4.14.6.27	RXG-27  Dispense to Pharmacy   (CWE)   01688
  , 'DispenseToPharmacyAddress'     //4.14.6.28	RXG-28  Dispense to Pharmacy Address   (XAD)   01689
  , 'DeliverToPatientLocation'      //4.14.6.29	RXG-29  Deliver-to Patient Location   (PL)   01683
  , 'DeliverToAddress'              //4.14.6.30	RXG-30  Deliver-to Address   (XAD)   01684
  
]
