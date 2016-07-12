import { Schema, arrayOf } from 'normalizr';

const userSchema = new Schema('user');
const serviceSchema = new Schema('services');
const buildingSchema = new Schema('buildings');
const claimSchema = new Schema('claims');
const incidentReportSchema = new Schema('incidentReports');
const etaSchema = new Schema('etas');
//buidling
buildingSchema.define({
	owner: userSchema,
	manager: arrayOf(userSchema),
	services: arrayOf(serviceSchema)
});
//service
serviceSchema.define({
	owner: userSchema,
	manager: arrayOf(userSchema)
});
//claim
claimSchema.define({
	by: userSchema,
	service: serviceSchema
});
//incidentReport
incidentReportSchema.define({
	building: buildingSchema,
	reportedBy: userSchema
});

const Schemas = {
	USER: userSchema,
	USER_ARRAY: arrayOf(userSchema),
	BUILDING: buildingSchema,
	BUILDING_ARRAY: arrayOf(buildingSchema),
	SERVICE: serviceSchema,
	SERVICE_ARRAY: arrayOf(serviceSchema),
	CLAIM: claimSchema,
	CLAIM_ARRAY: arrayOf(claimSchema),
	INCIDENTREPORT: incidentReportSchema,
	INCIDENTREPORT_ARRAY: arrayOf(incidentReportSchema),
	ETA: etaSchema
};

export default Schemas;
