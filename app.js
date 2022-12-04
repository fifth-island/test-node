const { resolveSoa } = require('dns');
const http = require('http');
const address = require('url');

http.createServer((req, res) => {
    var header = '';
    var form = '';
    header = '<!DOCTYPE html>' + '<html> <head> </head>';
    form = '<body style="background-color:beige"><div style="text-align:center"> ' + '<h1 style="border-bottom: 1px solid black; padding-bottom: 15px">Stock Ticker</h1>'
    +'<form action="#" method="GET"> <label for="#">Search Bar <span style="color:red">*</span>:</label>'
        + '<input type="text" placeholder="Company Name or Symbol" name="search_bar">'
        + '<br> <br> ' + '<input type="radio" name="btns_name" id="comp_name">' + '<label for="comp_name">Company Name</label>'
        + '<input type="radio" name="btns_ticker" id="comp_symbol"> <label for="comp_symbol">Stock Ticker</label>'
        + '<br> <br> <input type="submit" name="submit_btn"> </form> </div>';
    
    var page = header + form;
    var qobj = address.parse(req.url, true).query
    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Lenght': ''});
    res.write(page);
    
    if (qobj.submit_bnt === 'Submit') {
//         pro = clicker(req);
        res.write("End of test");
    }


}).listen(3000);
