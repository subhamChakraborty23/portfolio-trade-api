
## Smallcase Backend Assignment :[Portfolio Tracking API]

The main objective of this task is to create an API which can track the changes made by an user on his portfolio of different securities.

## Tech stack

* Javascript
* Node.js(Express.js)
* MongoDB
* Heroku

## DB Schema
```
  id : object id
  price : float 
  quantiy : int 
  ticker : string
  
```
## API Endpoints
The base url for this application is [URL] : \
**https://portfolio-tracking-api-2.herokuapp.com/**

The API routes are as follows:
### POST `{{URL}}/trade` 
* Add trades for a security(either BUY/SELL)
* The HTTP POST method takes body in the following format:
Example:
```
    "price": 10.56,
    "quantity": 6,
    "ticker": "WIPRO"
```
### PUT `{{URL}}/trade/:id?method=<type_of_trade>` 
* update a trade for security already present in the portfolio
* type_of_trade can either BUY or SELL
* The PUT method takes body in the following format for BUY method:
Example: 
```
    "price": 10.0,
    "quantity": 10,
```
* The PUT method takes body in the following format for SELL method:
Example:
```
    "quantity": 10
```
### GET `{{URL}}/trade/portfolio` 
* Fetch portfolio which is an aggregate view of all securities in the portfolio with its final quantity and average buy price.
* The HTTP GET method lists all the securities and average buy price along with shares count
### DELETE `{{URL}}/trade/:id`
* A trade of a security can be removed from the portfolio reverting the changes it had when it was added.
* The HTTP DELETE method deletes that trade which has an id and reflects the changes in the portfolio as well.

### GET `{{URL}}/trade/returns?price=<price>`
* Fetch the returns for a security based on the current price provided.
* The cumulative returns is calculated as `SUM((CURRENT_PRICE[ticker] - AVERAGE_BUY_PRICE[ticker]) * CURRENT_QUANTITY[ticker])` and this sum is returned as response.
* The GET method fetches the cumulative return value of the current portfolio.
