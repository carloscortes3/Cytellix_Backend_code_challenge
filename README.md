# PersonalWebapp
 Backend for Webapp code challenge

# Connect to Mango
Please make a file at root titled ".env" and make a variable called "DB_CONNECT" and set it equal to the location of your MangoDB server.

# Setup for compatability w/ Frontend
The application does not work without having at least one company in the "companies" document and the roles "Admin" and "Viewer" in the roles document in the collection. Either add them manually using the API before starting the front end, or upload the files "company.json" and "roles.json" to their respective collections. Both files can be found in the root directory of this project. 

# Run
Run "npm i" to make sure all of the modules are downloaded. Then, "npm start" to run the server. It will be running on "http://localhost:5000"
