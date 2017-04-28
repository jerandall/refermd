/**
 * Sequelize initialization module
 */

'use strict';

import path from 'path';
import config from '../config/environment';
import Sequelize from 'sequelize';

var onHeroku = !!process.env.DYNO;

var db = {
	Sequelize,
	sequelize: new Sequelize(config.mysql.uri, config.mysql.options)
};


// Insert models below
db.Patient = db.sequelize.import('../api/patient/patient.model');

db.Shifts = db.sequelize.import('../api/shifts/shifts.model');
db.Appointment = db.sequelize.import('../api/appointment/appointment.model');
db.Referral = db.sequelize.import('../api/referral/referral.model');
db.User = db.sequelize.import('../api/user/user.model');


// Table Relationships will go here


db.User.hasMany(db.Shifts, {
	foreignKey: 'UserId'
});
db.Shifts.belongsTo(db.User, {
	as: 'settings',
	foreignKey: 'UserId',
	targetKey: '_id',
	constraints: false
});


db.User.hasMany(db.Appointment, {
	foreignKey: 'UserId'
});
db.Appointment.belongsTo(db.User, {
	as: 'creator',
	foreignKey: 'UserId',
	targetKey: '_id',
	constraints: false
});


db.User.hasMany(db.Appointment, {
	foreignKey: 'PatientId'
});
db.Appointment.belongsTo(db.User, {
	as: 'Patient',
	foreignKey: 'PatientId',
	targetKey: '_id',
	constraints: false
});

db.User.hasMany(db.Appointment, {
	foreignKey: 'PhysicianId'
});
db.Appointment.belongsTo(db.User, {
	as: 'Physician',
	foreignKey: 'PhysicianId',
	targetKey: '_id',
	constraints: false
});
// Relationship ends
db.User.hasMany(db.Referral, {
	foreignKey: 'UserId'
});
db.Referral.belongsTo(db.User, {
	as: 'creator',
	foreignKey: 'UserId',
	targetKey: '_id',
	constraints: false
});


db.User.hasMany(db.Referral, {
	foreignKey: 'PatientId'
});
db.Referral.belongsTo(db.User, {
	as: 'Patient',
	foreignKey: 'PatientId',
	targetKey: '_id',
	constraints: false
});

db.User.hasMany(db.Referral, {
	foreignKey: 'PhysicianId'
});
db.Referral.belongsTo(db.User, {
	as: 'Physician',
	foreignKey: 'PhysicianId',
	targetKey: '_id',
	constraints: false
});

export default db;
