# bamazon

Bamazon is a store interface that uses Node and a MySQL database to display products in stock.

---

When the app starts all the products are displayed, and the user is prompted to enter an item they'd like to purchase.

Next, they're asked how many of that product they would like to buy. Then the app will compare the quantity in the database to the amount the user would like to buy.

---

If the product is not in stock, it will display "Insufficient quantity".

![out of stock](https://i.imgur.com/DX4KLAG.png)

If the product is in stock, it will display the total price and update the stock in the database.

![purchase success](https://i.imgur.com/uORD31B.png)