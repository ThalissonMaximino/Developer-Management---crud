
# Developer-Management---crud

This API was created for studies proposals.


This API allows us to control a crud where we can register and manipulate "developers" and their projects ("projects").

-I made the queries using 'pg' and 'pg-format'

-The database used was postgress(using dbeaver to properly control queries and tables)

-The connection to database is made by .env, it has a .env.example to show how you can connect yourself on your machine. And tests were made using Jest.

If you have any questions or opinions about this repository feel free to contact me :) 






## Run Locally

Clone the project

```bash
  git clone https://github.com/ThalissonMaximino/Developer-Management---crud.git
```

Install dependencies

```bash
  npm install
```
Run Server

```bash
  npm run dev
```
Run Tests

```bash
  npm run test
```

## Endpoints /Developers

Method | Endpoint | Responsability
| --- | --- | --- | 
POST| /developers |Create a developer| 
POST| /developers/:id/infos | Create Infos for a developer | 
GET| /developers/:id | Search developer by Id | 
PATCH| /developers/:id | Atualizes a developer
DELETE| /developers/:id | Delete a developer by Id

## Endpoints /Projects


Method | Endpoint | Responsability
| --- | --- | --- | 
POST| /projects |Create a project| 
GET| /projects/:id | Search project by Id | 
PATCH| /projects/:id | Atualizes a project


## Running Tests - Developers Routes

You can create the routes on insomnia or postman and test it.

You can also test on your own terminal with "npm run test", its possible to test specific routes on terminal like "npm run test projects"


### POST /developers
Developers creation route. It must be possible to create a developer.


Request submission body:
```

  {
    "email": "john@mail.com",
    "name": "john"
}

```

Server response:
```

 {
    "id": 1,
    "name": "john",
    "email": "john@mail.com"
}

Status code:  201 CREATED.
```
Server response when trying to register an email that already exists:

```
{
  "message": "Email already exists."
}

Status code: 409 CONFLICT
```
### POST /developers/:id/infos


Request submission body:
```

 {
  "developerSince": "2013-01-01",
  "preferredOS": "MacOS"
}
```
Server response:
```
{
  "id": 1,
  "developerSince": "2013-01-01T02:00:00.000Z",
  "preferredOS": "MacOS",
  "developerId": 1
}

Status code:  201 CREATED.
```
server response if the dev already has this information: 
```
{
  "id": 1,
  "developerSince": "2013-01-01T02:00:00.000Z",
  "preferredOS": "MacOS",
  "developerId": 1
}

Status code: 409 CONFLICT.
```

### GET /developers/:id

Developers listing route. It should be possible to return the developers searched by the id passed on params.


Server response:
```
{
    "developerId": 1,
    "developerName": "John",
    "developerEmail": "John@mail.com",
    "developerInfoDeveloperSince": null,
    "developerInfoPreferredOS": null
}
Status code:  200 OK.
```
Server response if Id does not exist: 
```
{
  "message": "Developer not found."
}
Status code:  404 NOT FOUND.
```

### PATCH /developers/:id
Developer update route. It should be possible to update a developer by id. All fields can be optionally updated.

The example below was performed on the following route: /developers/1.

Request submission body:
```
{
  "name": "JhonCenna"
}
```

Server response:
```
[
   "id": 1,
    "email": "john@Mail.com",
    "name": "JhonCenna"
]
Status code:  200 OK.
```
### DELETE /developers/:id
Developer deletion route. It should be possible to delete a developer by id.

The example below was performed on the following route: /movies/1.

Server response:
```
Status code: 204 NO CONTENT.
```

## Running Tests - Projects Routes

### POST /projects 

Should register a new project with the following data

Request submission body:
```
// without endDate and developerId
{
  "name": "Project 1",
  "description": "Fullstack Project",
  "repository": "url.com.br",
  "startDate": "2023-12-02",
}

// with endDate and developerId
{
  "name": "Project 2",
  "description": "Backend project",
  "repository": "url.com.br",
  "startDate": "2023-12-10",
  "endDate": "2023-12-23",
  "developerId": 1
}
```

Server response:
```
// without endDate and developerId on body request
{
  "id": 1,
  "name": "Project 1",
  "description": "Fullstack Project",
  "repository": "url.com.br",
  "startDate": "2023-12-02T03:00:00.000Z",
  "endDate": null,
  "developerId": null
}

// with endDate on body request
{
  "id": 2,
  "name": "Project 2",
  "description": "Backend project",
  "repository": "url.com.br",
  "startDate": "2023-12-10T03:00:00.000Z",
  "endDate": "2023-12-23T03:00:00.000Z",
  "developerId": 1
}
Status code:  201 created.
```
Trying to create with invalid developerId: 

```
{
  "message": "Developer not found."
}
Status code:  201 created.
```

## GET /projects/:id


It must be possible to return the data of a project from the id of that project


Server response:
```
{
    "projectId": 1,
    "projectName": "Projct 1",
    "projectDescription": "Fullstack Project",
    "projectRepository": "url.com.br",
    "projectStartDate": "2023-12-02T03:00:00.000Z",
    "projectEndDate": null,
    "projectDeveloperName": "JhonCenna"
}
Status code:  200 OK.
```
Trying to list with an invalid project id:

```
{
  "message": "Project not found."
}
Status code:  404 NOT FOUND.
```

## PATCH /projects/:id

It must be possible to update all the data of a project, with the exception of the id;

All data allowed for updating must be optional in the submission;


Request submission body:
```
  "name": "New Project",
  "description": "New Description",
  "repository": "newurl.com.br",
  "startDate": "2023-11-13",
  "developerId": 2
```

Server response:
```
{
  "id": 1,
 "name": "New Project",
 "description": "New Description",
  "repository": "newurl.com.br",
  "startDate": "2023-11-13T03:00:00.000Z",
  "endDate": null,
  "developerId": 2
}
Status code:  200 OK.
```
