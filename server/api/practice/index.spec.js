'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var practiceCtrlStub = {
  index: 'practiceCtrl.index',
  show: 'practiceCtrl.show',
  create: 'practiceCtrl.create',
  update: 'practiceCtrl.update',
  destroy: 'practiceCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var practiceIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './practice.controller': practiceCtrlStub
});

describe('Practice API Router:', function() {

  it('should return an express router instance', function() {
    practiceIndex.should.equal(routerStub);
  });

  describe('GET /api/practices', function() {

    it('should route to practice.controller.index', function() {
      routerStub.get
        .withArgs('/', 'practiceCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/practices/:id', function() {

    it('should route to practice.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'practiceCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/practices', function() {

    it('should route to practice.controller.create', function() {
      routerStub.post
        .withArgs('/', 'practiceCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/practices/:id', function() {

    it('should route to practice.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'practiceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/practices/:id', function() {

    it('should route to practice.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'practiceCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/practices/:id', function() {

    it('should route to practice.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'practiceCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
