// Create a MySQL Database called Bamazon. DONE
// Then create a Table inside of that database called products. DONE
// The products table should have each of the following columns: DONE
// item_id (unique id for each product) DONE
// product_name (Name of product) DONE
// department_name DONE
// price (cost to customer) DONE
// stock_quantity (how much of the product is available in stores) DONE
// Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).DONE
// Then create a Node application called bamazonCustomer.js. Running this application will first display all of the items available (CONT'D)
// for sale. Include the ids, names, and prices of products for sale. DONE
// The app should then prompt users with two messages. DONE
// The first should ask them the ID of the product they would like to buy. DONE
// The second message should ask how many units of the product they would like to buy. DONE
// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request. DONE
// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through. DONE
// However, if your store does have enough of the product, you should fulfill the customer's order.
// This means updating the SQL database to reflect the remaining quantity.
// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});


connection.query("SELECT * FROM products", function(err,res){
	if (err) throw err;
	for (var i=0; i < res.length; i++){
		console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
	};	
});

var questions = function(){
inquirer.prompt([

{
	type: "input",
	name: "item_id",
	message: "What is the id of the product that you would like to buy?",
	validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
},
{
	type: "input",
	name: "stock_quantity",
	message: "How many units of this product would you like to buy?",
	validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
}

]).then(function(answer){
	var query = "SELECT stock_quantity FROM products WHERE ?"; 
	connection.query(query, {item_id: answer.item_id}, function(err, res){
	if (answer.stock_quantity > answer.query){
		console.log ("Sorry we don't have that many in stock");
		stopOrder();
		}
	else {
		console.log("Your order has been received!");
		//totalCost(); - work on this
		}
	});

	var query = "UPDATE stock_quantity FROM products WHERE ?"
	connection.query(query, {item_id: answer.item_id}, function(err, res){
	if (answer.stock_quantity < answer.query){
		answer.query -= answer.stock_quantity;
	};
	});

});


function stopOrder(answer){
	var query = "DELETE item_id FROM products";
	connection.query(query, {item_id: answer.item_id}, function(err, res){
	if (answer.stock_quantity = 0);	
	});
	}
}
//work on stopOrder function



