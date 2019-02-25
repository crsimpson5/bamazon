CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price FLOAT(10,2) NOT NULL,
  stock_quantity INT default 0,
  PRIMARY KEY (item_id)
);