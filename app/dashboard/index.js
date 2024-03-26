
const { BigQuery } = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

import * as functions from "firebase-functions"
// import * as admin from 'firebase-admin'
import * as corsModule from "cors"

const cors = corsModule({origin:true})
exports.handleCors = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const query = 'SELECT * FROM `your-project.dataset.table`';

        // Execute the query
        const [rows] = await bigquery.query(query);

        // Format the response as needed
        const formattedData = rows.map(row => ({
            column1: row.column1,
            column2: row.column2,
            // ...
        }));

  // Return the formatted data
  response.status(200).json(formattedData);
        
    });
});

exports.testCallable = functions.https.onCall((data, context) => {
    return `Hello from callable`;
});



