# node app using mssql

multy page application: back = node, db = mssql, front = jade

## create schema and tables in your DB

i used my personal name for schema "LABA2ZRPschema"

```sql
CREATE SCHEMA LABA2ZRPschema;
GO

CREATE TABLE LABA2ZRPschema.EUsers (
  Id INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Password NVARCHAR(50)
);
GO

CREATE TABLE LABA2ZRPschema.Faculties (
  IdFaculty INT IDENTITY(100,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(50),
  Shortname NVARCHAR(20),
  Id INT FOREIGN KEY REFERENCES LABA2ZRPschema.EUsers(Id)
);
GO

CREATE TABLE LABA2ZRPschema.Groups (
  IdGroup INT IDENTITY(1000,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(10),
  Course INT,
  IdFaculty INT FOREIGN KEY REFERENCES LABA2ZRPschema.Faculties(IdFaculty)
);
GO

CREATE TABLE LABA2ZRPschema.Students (
  IdStudent INT IDENTITY(10000,1) NOT NULL PRIMARY KEY,
  Name NVARCHAR(40),
  Email NVARCHAR(30),
  Phone NVARCHAR(20),
  IdGroup INT FOREIGN KEY REFERENCES LABA2ZRPschema.Groups(IdGroup)
);
GO
```
