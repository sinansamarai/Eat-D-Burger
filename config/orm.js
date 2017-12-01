var connection = require("./connection.js");

function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}


var orm = {
		// SelectAll function for inserting one burger into table

	selectAll: function(tableName,callback){
		var queryString = "SELECT * FROM "+tableName;
		connection.query(queryString,function(err,result){
			callback(result);
		});
	},
		// insertOne function for inserting one burger into table

	insertOne: function(tableName, cols, vals, callback){
		var queryString = "INSERT INTO "+tableName+" ("+ cols.toString() +") VALUES (?,?)";
		console.log(queryString);
		console.log(vals);
		connection.query(queryString, vals,function(err, result){
			callback(result);
		});
	},
		// updateOne function for inserting one burger into table

	updateOne:function(tableName,objColVals, condition,callback){
		console.log("objcolvals:"+objColVals);
		console.log("objtosql:"+objToSql(objColVals));
		var queryString = "UPDATE "+ tableName+" SET "+objToSql(objColVals)+" WHERE "+ condition;
		console.log(queryString);
		connection.query(queryString,function(err,result){
			callback(result);
		});
	}
};

module.exports = orm;