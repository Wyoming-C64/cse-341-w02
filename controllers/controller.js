const mongoDb = require('../db/connect'); // Must connect to DB if not already.
const {ObjectId} = require('mongodb');


const defaultRoute = async(req, res) => {
  res.send("This is the default route.");
}

const getData = async (req, res, next) => {
  if (req.query.id) {
    const myObjId = new ObjectId(req.query.id);    
    result = await mongoDb.getDb().db().collection('people').findOne( { "_id": myObjId } );
    res.setHeader('Content-Type', 'application/json');  // Set the header to tell the client what to expect.
    res.status(200).json(result);                       // Set HTTP status and return only the matching result from the database.
  } else {
    const result = await mongoDb.getDb().db().collection('people').find();
    // Convert result to an array, THEN call a function to send data to frontend.
    result.toArray().then(        
      (lists) => {      
        res.setHeader('Content-Type', 'application/json');  // Set the header to tell the client what to expect.
        res.status(200).json(lists);                        // Set HTTP status and return all results from the database.
      }
    );
  }
};

  module.exports = {
    defaultRoute,
    getData
  };