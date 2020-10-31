var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
// var async = require('async');

// Create connection to database
var config = {
  server: "localhost",
  authentication: {
    type: "default",
    options: {
      userName: "sa",
      password: "shokoman12345"
    }
  },
  options: {
    encrypt: false,
    database: "LABA2ZRP",
    validateBulkLoadParameters: false,
    rowCollectionOnRequestCompletion: true
  }
};

var connection = new Connection(config);
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
});

connection.on("connect", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected");
  }
});

function Insert(id, name, shortname, responsee) {
  console.log("Inserting '" + name + "' into Table...");

  request = new Request(
    `INSERT INTO LABA2ZRPschema.Faculties (Name, Shortname, Id) VALUES (@Name, @Shortname, @Id);
    SELECT Id, IdFaculty, Name, Shortname FROM LABA2ZRPschema.Faculties
    WHERE Id = @Id;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
        responsee.render("faculties", {
          title: "Faculties",
          rows: rows,
          id: id
        });
      }
    }
  );
  request.addParameter("Id", TYPES.Int, id);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Shortname", TYPES.NVarChar, shortname);

  // Execute SQL statement
  connection.execSql(request);
}

function Update(id, name, shortname, pastname, pastshortname, responsee) {
  console.log("Updating facultie to '" + name + "' for '" + shortname + "'...");

  // Update the fak record requested
  request = new Request(
    `UPDATE LABA2ZRPschema.Faculties
     SET Name=@Name,
         Shortname=@Shortname
     WHERE Name = @PastName AND (Shortname = @PastShortname AND Id = @Id);
     SELECT Id, IdFaculty, Name, Shortname FROM LABA2ZRPschema.Faculties
     WHERE Id = @Id;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) updated");
        responsee.render("faculties", {
          title: "Faculties",
          rows: rows,
          id: id
        });
      }
    }
  );
  request.addParameter("Id", TYPES.Int, id);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Shortname", TYPES.NVarChar, shortname);
  request.addParameter("PastName", TYPES.NVarChar, pastname);
  request.addParameter("PastShortname", TYPES.NVarChar, pastshortname);

  // Execute SQL statement
  connection.execSql(request);
}

function Delete(id, fakId, responsee) {
  console.log("Deleting '" + fakId + "' from Table Faculties...");

  // Delete the employee record requested
  request = new Request(
    `DELETE FROM LABA2ZRPschema.Students
     WHERE IdGroup BETWEEN (SELECT MIN(IdGroup) FROM LABA2ZRPschema.Groups WHERE IdFaculty = @IdFaculty) AND (SELECT MAX(IdGroup) FROM LABA2ZRPschema.Groups WHERE IdFaculty = @IdFaculty);
     DELETE FROM LABA2ZRPschema.Groups
     WHERE IdFaculty = @IdFaculty;
     DELETE FROM LABA2ZRPschema.Faculties
     WHERE IdFaculty = @IdFaculty;
     SELECT Id, IdFaculty, Name, Shortname FROM LABA2ZRPschema.Faculties
     WHERE Id = @Id;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) deleted");
        responsee.render("faculties", {
          title: "Faculties",
          rows: rows,
          id: id
        });
      }
    }
  );
  request.addParameter("IdFaculty", TYPES.Int, fakId);
  request.addParameter("Id", TYPES.Int, id);

  // Execute SQL statement
  connection.execSql(request);
}

function ReadCheckUser(name, password, responsee) {
  console.log("Reading rows from the Table...");

  let id;

  request1 = new Request(
    `SELECT Id FROM LABA2ZRPschema.EUsers
     WHERE Name = @Name AND Password = @Password;
     SELECT Id, IdFaculty, Name, Shortname FROM LABA2ZRPschema.Faculties
     WHERE Id = (SELECT Id FROM LABA2ZRPschema.EUsers
     WHERE Name = @Name AND Password = @Password)
     ORDER BY Name DESC;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("callback in request: " + rowCount + " row(s) returned");
        responsee.render("faculties", {
          title: "Faculties",
          rows: rows,
          id: rows[0][0].value
        });
      }
    }
  );
  request1.addParameter("Name", TYPES.NVarChar, name);
  request1.addParameter("Password", TYPES.NVarChar, password);
  var result1 = "";
  request1.on("row", function (columns) {
    columns.forEach(function (column) {
      if (column.value === null) {
        console.log("NULL");
      } else {
        result1 += column.value + " ";
      }
    });
    // responsee.render("faculties", { title: result1 });
    console.log(result1);
    result1 = "";
  });

  // Execute SQL statement
  connection.execSql(request1);
}

function SaveUser(name, password, responsee) {
  console.log("Inserting '" + name + "' into users...");

  request = new Request(
    `INSERT INTO LABA2ZRPschema.EUsers (Name, Password)
       VALUES (@Name, @Password);`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
        responsee.render("login", {
          title: "Login"
        });
      }
    }
  );
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Password", TYPES.NVarChar, password);

  // Execute SQL statement
  connection.execSql(request);
}

function GetFaks(idFak, responsee) {
  console.log("Reading '" + idFak + "' from faculties...");

  request = new Request(
    `SELECT Id, IdFaculty, Name, Shortname FROM LABA2ZRPschema.Faculties
    WHERE Id = (SELECT Id FROM LABA2ZRPschema.Faculties
    WHERE IdFaculty = @IdFaculty)
    ORDER BY Name DESC;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
        responsee.render("faculties", {
          title: "Faculties",
          rows: rows,
          id: rows[0][0].value
        });
      }
    }
  );
  request.addParameter("IdFaculty", TYPES.Int, idFak);

  // Execute SQL statement
  connection.execSql(request);
}

module.exports = { Update, ReadCheckUser, Delete, Insert, SaveUser, GetFaks };
