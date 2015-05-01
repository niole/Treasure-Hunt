"use strict";
var express = require('express');
var router = express.Router();
var _ = require('lodash');

/*DELETE removes everything from all collections*/
router.delete('/deleteall', function(req, res) {
  var db = req.db;
  db.collection('usercollection').remove( {}, function(err, result) {
    db.collection('projectcollection').remove( {}, function(err, result) {
      res.json(result);
    });
  });
});

/*POST finds specific user*/
router.post('/finduser', function(req, res) {
  var db = req.db;
  db.collection('usercollection').find( { "user": req.body.user } ).toArray( function(err, result) {
    res.json(result);
  });
});

/*GET gets users from usercollection*/
router.get('/getusers', function(req, res) {
  var db = req.db;
  db.collection('usercollection').find().toArray( function(err, result) {
    res.json(result);
  });
});


/* usercollection -> [ {'user':string, 'projects': [ {_id:int, "title":string}, {.}.. ] }, ... ]
 * projectcollection -> [ {'project':string, _id:int, 'gps': [ { 'gpsAt': int, 'gpsDest': int, 'clue': string},
 *                                                      { 'gpsStart': int, 'clue': string },
 *                                                       { 'gpsEnd': int, 'clue':string } ] }, ... ] */


/*GET gets all of a user's projects from projectcollection*/
router.get('/getprojects/:user', function(req, res) {
  var db = req.db;
  db.collection('usercollection').find( { "user": req.params.user } ).toArray(
    function(err, result) {
    console.log('result getprojects/;user');
    console.log(result);
    res.json(result);
  });
});

/*POST create new user*/
router.post('/newuser', function(req, res) {
  //req.body = {'user':string,_id:int,'projects':[]}
  var db = req.db;
  console.log('req.body');
  console.log(req.body);
  var newUser = { "user": req.body.user, "projects": [] };
  db.collection('usercollection').insert( newUser, function(err, response) {
    console.log('response');
    console.log(response);
    res.json(response);
  });
});

/*POST add new project*/
router.post('/newproject', function(req, res) {
  //req.body = {_id:int,'project':string,'user':string}
  //TODO: update projectcollection and usercollection
  var newProject = { 'project': req.body.project, _id: req.body._id, 'gps': [] };
  var db = req.db;
  db.collection('projectcollection').insert( newProject, function( err, response ) {
    db.collection('usercollection').update(
    { 'user': req.body.user },
    { $push : { 'projects': { "_id": req.body._id, "title": req.body.project } } },
    function(err, response) {
      if (err) throw err;
      res.json(response);
    });
 });
});

/*GET project*/
router.get('/getproject/:projectID', function(req, res) {
  var db = req.db;
  db.collection('projectcollection').find( { "_id": req.params.projectID } ).toArray(
    function( err, result ) {
      console.log('get project result');
      console.log(result);
      res.json(result);
  });
});


/*POST add general gps coordinate with a clue*/
router.post('/addgps/:project', function(req, res) {
  //req.body = { 'gpsAt':int,'clue':string,'gpsDest': int }
  var db = req.db;
  db.collection('projectcollection').update(
    { 'project': req.params.project },
    { $push: { 'gps': req.body } },
    function(err, response) {
      res.json(response);
    });
});

/*POST add beginning clue and gps to a project*/
router.post('/addstart/:project', function(req, res) {
  //req.body = { 'gpsStart': int, 'clue': string }
  var db = req.db;
  db.collection('projectcollection').update(
    { 'project': req.params.project },
    { $push: { 'gps': req.body } },
    function(err, response) {
      res.json(response);
    });
});

/*POST add ending clue and gps to a project*/
router.post('/addend/:project', function(req, res) {
  //req.body = { 'gpsEnd': int, 'message': string }
  var db = req.db;
  db.collection('projectcollection').update(
    { 'project': req.params.project },
    { $push: { 'gps': req.body } },
    function(err, response) {
      res.json(response);
    }
  );
});


/*POST to update a general gps coordinate's clue*/
router.post('/updateclue/:id', function(req, res) {
  //req.body = { 'gpsAt':int, 'clue':string }
  var db = req.db;
  db.collection('projectcollection').update(
    { _id: req.params.id },
    { $pull: { 'gps': { 'gpsAt': req.body.gpsAt } } },
    function(err, result) {
      db.collection('projectcollection').update(
        { _id: req.params.id },
        { $push: { 'gps': req.body } },
        function(err, result) {
          res.json(result);
        }
      );
    }
  );
});

/*POST to update gpsStarts clue*/
router.post('/updateclue/:id', function(req, res) {
  //req.body = { 'gpsStart': int, 'clue': string }
  var db = req.db;
  db.collection('projectcollection').update(
    { _id: req.params.id },
    { $pull: { 'gps': { 'gpsStart': req.body.gpsStart } } },
    function(err, result) {
      db.collection('projectcollection').update(
        { _id: req.params.id },
        { $push: { 'gps': req.body } },
        function(err, result) {
          res.json(result);
        }
      );
    }
  );
});

/*POST to update gpsEnd's message*/
router.post('/updateclue/:id', function(req, res) {
  //req.body = { 'gpsEnd': int, 'message': string }
  var db = req.db;
  db.collection('projectcollection').update(
    { _id: req.params.id },
    { $pull: { 'gps': { 'gpsEnd': req.body.gpsStart } } },
    function(err, result) {
      db.collection('projectcollection').update(
        { _id: req.params.id },
        { $push: { 'gps': req.body } },
        function(err, result) {
          res.json(result);
        }
      );
    }
  );
});


/*DELETE to delete a project*/
router.delete('/deleteproject/:id', function(req, res) {
  var db = req.db;
  db.collection('usercollection').update(
    { 'projects': req.params.id },
    { $pull: { 'projects': req.params.id } },
    { multi: true },
    function(err, response) {
      db.collection('projectcollection').remove( { _id: req.params.id }, function( err, response ) {
        res.json(response);
      });
    }
  );
});

/*DELETE to delete a gps coordinate and clue*/
router.delete('/deletegps/:id', function(req, res) {
  //req.body = { 'gpsAt: int }
  var db = req.db;
  db.collection('projectcollection').update(
    { _id: req.params.id },
    { $pull: req.body },
    function( err, response ) {
      res.json(response);
    }
  );
});

/* usercollection -> [ {'user':string, 'projects': [ _id, _id, ... ] }, ... ]
 * projectcollection -> [ {'project':string, _id:int, 'gps': [ { 'gpsAt': int, 'gpsDest': int, 'clue': string},
 *                                                      { 'gpsStart': int, 'clue': string },
 *                                                       { 'gpsEnd': int, 'clue':string } ] }, ... ] */

/* DELETE user*/
router.delete('/deleteuser/:user', function(req, res) {
  var db = req.db;
  db.collection('usercollection').remove( { 'user': req.params.user }, function(err, result) {
    res.json(result);
  });
});

module.exports = router;
