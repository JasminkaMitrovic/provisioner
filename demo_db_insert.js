var http = require('http');
var dt = require('./date_time');
var fs = require('fs');
var uc = require('upper-case');
var mysql = require('mysql');
var guid = require('guid');

/*
console.log('See the browser on http://localhost:8080/');
http.createServer(function (req, res) {
    fs.readFile('demofile1.html', function (err, data ) {
        // res.writeHead(200, {'Content-Type': 'text/plain'});
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("\nThe date and time are currently: " + dt.myDateTime());
        res.write("\n");
        res.write(data);
        res.write("\n");
        res.write(uc.upperCase("Hello World!"));
        return res.end();
        // res.end('\nHello World!');
    });
}).listen(8080);
 */

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin"
});

/* Reading back fields, not working atm
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("SELECT * FROM `sbc-core-provisioner`.SlcsRequests", function (err, result, fields) {
        if (err) throw err;
        // console.log("Result: " + result);
        console.log("Fields: " + fields);
    });
});
*/

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var randomGuid = guid.create();
    console.log("Random Guid: " + randomGuid);

    fs.readFile('request.json', function (err, data) {
        console.log("Data: " + data);

        var sql = "insert into `sbc-core-provisioner`.SlcsRequests (Id, CorrelationRequestId, CorrelationTraceId, EventClient, EventData, SlcsEventName)" + 
            " values (" + 
            "`sbc-core-provisioner`.GuidToBinary('" + randomGuid + "'), " + 
            "`sbc-core-provisioner`.GuidToBinary('" + randomGuid + "'), " + 
            "`sbc-core-provisioner`.GuidToBinary('" + randomGuid + "'), " + 
            "'Provisioner', " + 
            "'" + data + "', " + 
            "'Subscription.Fulfil.Commit')";

        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
            process.exit();
    });
});
});
