# socialPilot
# An assignment for social pilot to upload images on s3 from image urls given by user
<!-- {
  "MONGO_USERNAME": "XXXXXXXX",
  "MONGO_PASSWORD": "XXXXXXXX",
  "accessKeyId": "XXXXXXXX",
  "secretAccessKey": "XXXXXXXX"
} -->

# insert API endpoint :- /api/socialPilot/insert
# list API endpoint :- /api/socialPilot/list 
# query params for list API :- "page" - number, "description" - string, createdAfter - date, createdBefore - date

Running the application
Create a json file to save db & s3 keys as above and add it's path in app.js then run
npm install
npm start
