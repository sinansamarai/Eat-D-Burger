var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../model/burger.js");

// Create all our routes and set up logic withithose routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
// add a insertOne that posts the burgers created by the user and redirects back to index after completion.

router.post("/", function(req, res) {
  console.log(req.body);
  burger.insertOne([
    req.body.burger_name, false
  ], function() {
    res.redirect("/");
  });
});
// add a updateOne route that changes the status of the burger from being uneaten to eaten then redirects to index

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.updateOne({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});

// Export routes for server.js to use.
module.exports = router;