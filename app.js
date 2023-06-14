const express = require('express');
const sdk = require('node-appwrite');
const utils = require('./utils');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new sdk.Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.PROJECT_ID)
  .setKey(process.env.PROJECT_KEY)
  .setSelfSigned();

const databases = new sdk.Databases(client);

const databaseID = process.env.DATABASE_ID;
const collectionID = process.env.COLLECTION_ID;


app.post('/traces', (req, res) => {
  const body = req.body;

  const spans = utils.processSpans(body);
  const promises = [];

  spans.forEach((span) => {
    promises.push(
      databases.createDocument(
        databaseID,
        collectionID,
        sdk.ID.unique(),
        { ...span }
      )
    );
  });

  Promise.all(promises).then(
    function (response) {
      console.log({ success: true });
    },
    function (error) {
      console.error({ error });
    }
  );
});

app.get('/requests', (req, res) => {
  databases
    .listDocuments(databaseID, collectionID, [
      sdk.Query.equal('kind', 2),
      sdk.Query.limit(50),
    ])
    .then(
      function (response) {
        res.send(response);
      },
      function (error) {
        console.error({ error });
      }
    );
});

app.get('/errors', (req, res) => {
  databases
    .listDocuments(databaseID, collectionID, [
      sdk.Query.equal('error_code', 1),
    ])
    .then(
      function (response) {
        res.send(response);
      },
      function (error) {
        console.error({ error });
      }
    );
});

app.get('/requests/:id', (req, res) => {
  const id = req.params.id;
  databases
    .listDocuments(databaseID, collectionID, [
      sdk.Query.equal('spanId', id),
    ])
    .then(
      function (response) {
        res.send(response);
      },
      function (error) {
        console.error({ error });
      }
    );
});

app.get('/traces', (req, res) => {
  databases
    .listDocuments(databaseID, collectionID, [
      sdk.Query.limit(100),
    ])
    .then(
      function (response) {
        res.send(response);
      },
      function (error) {
        console.error({ error });
      }
    );
});

app.get('/traces/:id', (req, res) => {
  const id = req.params.id;
  databases
    .listDocuments(databaseID, collectionID, [
      sdk.Query.equal('traceId', id),
    ])
    .then(
      function (response) {
        res.send(response);
      },
      function (error) {
        console.error({ error });
      }
    );
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
