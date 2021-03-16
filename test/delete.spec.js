var sheetdbAPI = require('../');
var assert = require('assert');

var mock = require('xhr-mock');

describe('sheetdb', function() {
  describe('delete() function', function() {
    var sheetdb = sheetdbAPI({
      address: 'dfsdf43fsd',
    });

    it('should run with DELETE method', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body('test');
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data, 'test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should run with Http Basic Auth', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(201).body(req._headers);
      });

      sheetdbLocal = sheetdbAPI({
        address: 'dfsdf43fsd',
        auth_login: 'somekey',
        auth_password: 'somesecret',
      });

      return sheetdbLocal.delete('column', 'test').then(function(data) {
        assert.equal(data.authorization, "Basic c29tZWtleTpzb21lc2VjcmV0");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with correct headers', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(201).body(req._headers);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data["accept"], "application/vnd.sheetdb.3+json");
        assert.equal(data["content-type"], "application/json");
        assert.equal(data["x-user-agent"], "SheetDB-Node/1");
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function(){
        mock.teardown();
      });
    });

    it('should run with column name and value', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body(req);
      })

      return sheetdb.delete('column', 'test').then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/dfsdf43fsd/column/test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should throw error when no column param', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.delete().then(function(data){
        assert.fail('sheetdb do not throw error');
      }, function(err) {
        assert.equal(err, 'no column name');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should return url different Sheet', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/sheets/Sheet3/column/test', function(req, res) {
        return res.status(200).body(req);
      });

      return sheetdb.delete('column', 'test', 'Sheet3').then(function(data){
        assert.equal(data._url, 'https://sheetdb.io/api/v1/dfsdf43fsd/sheets/Sheet3/column/test');
      }, function(err) {
        assert.fail('sheetdb throw error');
      }).then(function() {
        mock.teardown();
      });
    });

    it('should return error when 404', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(404).body(req._xhr);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 404);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 429', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(429).body(req._xhr);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 429);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 403', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(403).body(req._xhr);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 403);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 401', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(401).body(req._xhr);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 401);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

    it('should return error when 500', function() {
      mock.setup();
      mock.delete('https://sheetdb.io/api/v1/dfsdf43fsd/column/test', function(req, res) {
        return res.status(500).body(req._xhr);
      });

      return sheetdb.delete('column', 'test').then(function(data) {
        assert.equal(data.status, 500);
      }, function(err) {
      }).then(function(){
        mock.teardown();
      });
    });

  });
});
