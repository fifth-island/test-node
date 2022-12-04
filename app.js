var http = require('http');
var qs = require('querystring');


const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://fifth_island:comp20@cluster0.wqsv4y9.mongodb.net/?retryWrites=true&w=majority";

const client =new MongoClient(url,{ useUnifiedTopology: true });


var port = process.env.PORT || 3000;

var user_value = "";
var type_value = "";

http.createServer(async function (req, res) {
 
    var header = '<!DOCTYPE html>' + '<html> <head> </head>';
    var form = '<body style="background-color:beige"><div style="text-align:center"> ' + '<h1 style="border-bottom: 1px solid black; padding-bottom: 15px">Stock Ticker</h1>'
    +'<form action="#" method="GET"> <label for="#">Search Bar <span style="color:red">*</span>:</label>'
        + '<input type="text" placeholder="Company Name or Symbol" name="search_bar">'
        + '<br> <br> ' + '<input type="radio" name="btns_name" id="comp_name">' + '<label for="comp_name">Company Name</label>'
        + '<input type="radio" name="btns_ticker" id="comp_symbol"> <label for="comp_symbol">Stock Ticker</label>'
        + '<br> <br> <input type="submit" name="submit_btn"> </form> </div>';
    
    var page = header + form;
    var qobj = address.parse(req.url, true).query

    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': ''});

    res.write(page);

    if (qobj.submit_btn === 'Submit') {
      res.write("Successful submission");
    }

    print();

}).listen(port);

