#### optl-microservice 
This is a microservice built in Express.js application that interacts with the Appwrite platform to handle traces, requests, and errors. It uses the node-appwrite SDK for communication with the Appwrite API.

### Prerequisites
Before running this application, make sure you have the following:
- Node.js installed on your machine.
- An Appwrite account and project set up with the necessary credentials.

### Installation
- Clone this repository to your local machine:

```sh
Copy code
git clone git@github.com:akhil-gautam/optl-micro-service.git
cd optl-micro-service
pnpm install
```

#### Create a .env file in the project root directory and set the following environment variables:

```txt
PROJECT_ID=<your_project_id>
PROJECT_KEY=<your_project_key>
DATABASE_ID=<your_database_id>
COLLECTION_ID=<your_collection_id>
```

#### Usage
To start the Express server, run the following command:

```
pnpm start
The server will be running on http://localhost:3001.
```

### Endpoints

- POST /traces: Accepts trace data in the request body and saves it as documents in the specified Appwrite collection.

- GET /requests: Retrieves a list of requests (documents) from the specified Appwrite collection, limited to 50 items.

- GET /errors: Retrieves a list of errors (documents) from the specified Appwrite collection.

- GET /requests/:id: Retrieves a specific request (document) based on the provided id parameter.

- GET /traces: Retrieves a list of traces (documents) from the specified Appwrite collection, limited to 100 items.

- GET /traces/:id: Retrieves a specific trace (document) based on the provided id parameter.

#### Contributing
Contributions to this project are welcome. Feel free to submit pull requests or open issues for any improvements or bug fixes you may have.

#### License
This project is licensed under the MIT License.