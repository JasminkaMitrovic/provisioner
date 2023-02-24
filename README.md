# provisioner
Scripts to help testing V2 endpoints in Provisioner

Work in Progress!!!

Intended use: 
1. add raw event data, in form of a json object, into the request.json
2. start your local provisioner service
3. run: node demo_db_insert.js

This will insert a record into the SlcsRequests and will raise a new Domain Event which will kick off Event Worker (SLCSRequestReceivedCommand.cs).
