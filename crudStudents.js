var Request = require("tedious").Request;
var TYPES = require("tedious").TYPES;
var Connection = require("tedious").Connection;

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

function Get(idGroup, responsee) {
  console.log("Reading rows from the Table Students...");

  request1 = new Request(
    `SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
       WHERE IdGroup = @IdGroup
       ORDER BY IdStudent DESC;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log("callback in request: " + rowCount + " row(s) returned");
        responsee.render("students", {
          title: "Students",
          rows: rows,
          id: idGroup
        });
      }
    }
  );
  request1.addParameter("IdGroup", TYPES.Int, idGroup);
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

function Create(idGroup, name, email, phone, responsee) {
  console.log("Inserting '" + name + "' into Students Table...");

  request = new Request(
    `INSERT INTO LABA2ZRPschema.Students (Name, Email, Phone, IdGroup) VALUES (@Name, @Email, @Phone, @IdGroup);
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) inserted");
        responsee.render("students", {
          title: "Students",
          rows: rows,
          id: idGroup
        });
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, idGroup);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Email", TYPES.NVarChar, email);
  request.addParameter("Phone", TYPES.NVarChar, phone);

  // Execute SQL statement
  connection.execSql(request);
}

function Delete(groupId, studentId, responsee) {
  console.log("Deleting '" + studentId + "' from Table Students...");
  request = new Request(
    `DELETE FROM LABA2ZRPschema.Students
     WHERE IdStudent = @IdStudent;
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) deleted");
        responsee.render("students", {
          title: "Students",
          rows: rows,
          id: groupId
        });
      }
    }
  );
  request.addParameter("IdGroup", TYPES.Int, groupId);
  request.addParameter("IdStudent", TYPES.Int, studentId);

  // Execute SQL statement
  connection.execSql(request);
}

function Update(idGroup, idStudent, name, email, phone, responsee) {
  console.log("Updating student to '" + name + "'...");

  // Update the student record requested
  request = new Request(
    `UPDATE LABA2ZRPschema.Students
     SET Name=@Name,
         Email=@Email,
         Phone=@Phone
     WHERE IdStudent = @IdStudent;
     SELECT IdGroup, IdStudent, Name, Email, Phone FROM LABA2ZRPschema.Students
     WHERE IdGroup = @IdGroup;`,
    function (err, rowCount, rows) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + " row(s) updated");
        responsee.render("students", {
          title: "Students",
          rows: rows,
          id: idGroup
        });
      }
    }
  );
  request.addParameter("IdStudent", TYPES.Int, idStudent);
  request.addParameter("IdGroup", TYPES.Int, idGroup);
  request.addParameter("Name", TYPES.NVarChar, name);
  request.addParameter("Email", TYPES.NVarChar, email);
  request.addParameter("Phone", TYPES.NVarChar, phone);

  // Execute SQL statement
  connection.execSql(request);
}

module.exports = { Get, Create, Delete, Update }; //, Update
