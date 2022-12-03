var http = require('http');
var qs = require('querystring');
var url = require('url');


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://fifth_island:comp20@cluster0.wqsv4y9.mongodb.net/?retryWrites=true&w=majority";

const client =new MongoClient(uri,{ useUnifiedTopology: true });


var port = process.env.PORT || 3000;

var user_value = "";
var type_value = "";

http.createServer(async function (req, res) {
  res.writeHead(200, {'Content-Type':'text/html'});
  if (req.url == "/") {
	res.write(`
		<h1>Hi! This is the home page</h1>
		<form action="/result" target="_blank" method="POST">
		<h2> Welcome to our Stock Ticker. </h2>

		<p> Select what type of input you want to use in the search </p>

		<label>Company</label>
		<input type='radio' name='type_input' id="company_name" value="company">

		<label>Ticker</label>
		<input type='radio' name='type_input' id="company_ticker" value="ticker">

		<p> Now, provide a word to check in our database </p>

		<label> Search for keyword: </label>
		<input type='text' name='user_input'>


		<input type='submit' name='form_ticker' value='Submit'>
	`);
	res.end();			
   
  } else if (req.url == '/result') {
	res.write ("Process the form<br>");
	

	pdata = "";
	req.on('data', data => {
		pdata += data.toString();
	});

	// when complete POST data is received
	req.on('end', () => {
		pdata = qs.parse(pdata);
		res.write ("The type chosen is: " + pdata['type_input'] + "<br>");
		type_value = pdata['type_input'];
		res.write ("The name is: " + pdata['user_input']);
		user_value = pdata['user_input'];	
		
		res.end();

	});

//         await connect_table();
	  

  }
}).listen(port);

async function connect_table() {
 try {
  res.write("Checkpoint 0");
 
  await client.connect();
  var dbo = client.db("stock");
  
  res.write("Checkpoint 1");
  var collection = dbo.collection("equities");
  const options = {
   projection: { _id: 0, name: 1, ticker: 1 },
  };
  
  res.write("Checkpoint 2");

  const curs = await collection.find({}, options);

  if ((curs.count()) === 0 ) {
   res.write("No documents found!");
  }

  await curs.forEach(function(item){
   if(type_value == 'company') {
    res.write("Your type_value is equal company");
   }


  });


 } catch (err) {
	 res.write("Error found");
	}
	finally {
		client.close();
	}
}
