const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "rootroot",
  database: "bamazon"
});

connection.connect(err => {
  if (err) throw err;

  start();
});

const start = () => {
  connection.query(
    "SELECT * FROM products",
    (err, res) => {
      if (err) throw err;

      // Display products
      console.log("\nBamazon products:\n");
      res.forEach(item => {
        console.log(`ID: ${item.item_id} - ${item.product_name} - $${item.price.toFixed(2)}`);
      });
      console.log("");

      // Ask user which item they'd like to buy
      inquirer
        .prompt({
          name: "id",
          message: "Which item would you like to buy? (enter item id):",
        })
        .then(answer => {
          buyItem(answer.id);
        });
    }
  );
};

const buyItem = (id) => {
  connection.query(
    "SELECT * FROM products WHERE ?",
    { item_id: id },
    (err, res) => {
      if (err) throw err;

      let item = res[0];
      
      console.log(`ID: ${item.item_id} - ${item.product_name} - $${item.price}\n`);

      // Ask user for quantity
      inquirer
        .prompt({
          name: "quantity",
          message: "How many would you like to buy?:",
        })
        .then(answer => {
          // If in stock update db and display total price
          if (answer.quantity <= item.stock_quantity) {
            updateStock(id, item.stock_quantity - answer.quantity);

            console.log(`Purchase successful! Total: $${item.price * answer.quantity}`);
          } else {
            console.log("Insufficient quantity!");
          }

          connection.end();
        });
    }
  );
};

const updateStock = (id, quantity) => {
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [{ stock_quantity: quantity }, { item_id: id }],
    (err, res) => {
      if (err) throw err;
    }
  );
};