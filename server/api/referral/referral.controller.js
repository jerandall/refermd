/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/referrals              ->  index
 * POST    /api/referrals              ->  create
 * GET     /api/referrals/:id          ->  show
 * PUT     /api/referrals/:id          ->  update
 * DELETE  /api/referrals/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import {
	Referral
} from '../../sqldb';
import {
	User
} from '../../sqldb';

function respondWithResult(res, statusCode) {
	statusCode = statusCode || 200;
	return function(entity) {
		if (entity) {
			res.status(statusCode).json(entity);
		}
	};
}

function saveUpdates(updates) {
	return function(entity) {
		return entity.updateAttributes(updates)
			.then(updated => {
				return updated;
			});
	};
}

function removeEntity(res) {
	return function(entity) {
		if (entity) {
			return entity.destroy()
				.then(() => {
					res.status(204).end();
				});
		}
	};
}

function handleEntityNotFound(res) {
	return function(entity) {
		if (!entity) {
			res.status(404).end();
			return null;
		}
		return entity;
	};
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

// Gets a list of Referral
export function index(req, res) {
	Referral.findAll({
		where: {
				isHoliday:false
			},
			include: [{
				model: User,
				as: 'creator',
				attributes: ['first_name', 'last_name', 'email', 'mobile','_id']
			}, {
				model: User,
				as: 'Patient',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender', '_id']
			}, {
				model: User,
				as: 'Physician',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender','npi','city','country', '_id']
			}]
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a list of Referrals by docId
export function byDocID(req, res) {
	// console.log(req.params.docId);
	Referral.findAll({
			where: {
				physicianId: req.params.docId,
				isHoliday:false
			},
			include: [{
				model: User,
				as: 'creator',
				attributes: ['first_name', '_id']
			}, {
				model: User,
				as: 'Patient',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender', '_id']
			}, {
				model: User,
				as: 'Physician',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender','npi','city','country', '_id']
			}]
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a list of Referrals by patientId
export function byPatientID(req, res) {
	Referral.findAll({
			where: {
				patientId: req.params.patientId
			},
			include: [{
				model: User,
				as: 'creator',
				attributes: ['first_name', '_id']
			}, {
				model: User,
				as: 'Patient',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender', '_id']
			}, {
				model: User,
				as: 'Physician',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender','npi','city','country', '_id']
			}]
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a list of holidays by docId
export function holidays(req, res) {
	// console.log(req.params.docId);
	Referral.findAll({
			where: {
				physicianId: req.params.docId,
				isHoliday:true
			},
			include: [ {
				model: User,
				as: 'Physician',
				attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender','npi','city','country', '_id']
			}]
		})
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Gets a single Referral from the DB
export function show(req, res) {
	Referral.find({
			where: {
				_id: req.params.id
			},
			include: [{
				model: User,
				attributes: ['first_name', '_id']
			}]
		})
		.then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates a new Referral in the DB
export function create(req, res) {
	Referral.create(req.body)
		.then(respondWithResult(res, 201))
		.catch(handleError(res));
}

// Updates an existing Referral in the DB
export function update(req, res) {
	if (req.body._id) {
		delete req.body._id;
	}
	Referral.find({
			where: {
				_id: req.params.id
			}
		})
		.then(handleEntityNotFound(res))
		.then(saveUpdates(req.body))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Deletes a Referral from the DB
export function destroy(req, res) {
	Referral.find({
			where: {
				_id: req.params.id
			}
		})
		.then(handleEntityNotFound(res))
		.then(removeEntity(res))
		.catch(handleError(res));
}
