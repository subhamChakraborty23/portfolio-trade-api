const trade = require('../models/trade');
const BigPromise = require("../middlewares/bigPromise");
const CustomError = require("../utils/customError");

//get all the trades
exports.getAllTrades = BigPromise(async (req, res, next) => {
    try {
        const trades = await trade.find();
        res.status(200).json({
            success: true,
            count: trades.length,
            data: trades
        });
    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})

//get a trade by id
exports.getTradeById = BigPromise(async (req, res, next) => {
    try {
        const trade = await trade.findById(req.params.id);
        if (!trade) {
            return next(new CustomError("Trade not found", 404));
        }
        res.status(200).json({
            success: true,
            data: trade
        });
    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})


//add a new trade
exports.addTrade = BigPromise(async (req, res, next) => {
    try {
        let {ticker,price,quantity} = req.body;
        // console.log(ticker,price,quantity);
        if(!ticker || !price || !quantity){
            return next(new CustomError("Please provide all the required fields", 400));
        }
        ticker = ticker.toUpperCase();
        const isTickerExist = await trade.findOne({ticker});
        if(isTickerExist){
            return next(new CustomError("Ticker already exist", 400));
        }
        price =Number.parseFloat(price)
        quantity = Number.parseInt(quantity)
        const newTrade = await trade.create({ticker,price,quantity});
        const savedTrade = await newTrade.save();
        res.status(201).json({
            success: true,
            data: savedTrade
        });
    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})

//update a trade by id
exports.updateTradeById = BigPromise(async (req, res, next) => {
    try {
        const id = req.params.id;
        const tradeMethod = req.query.method;
        const data = req.body;
        let isTradeExist = await trade.findById(id);
        if (!isTradeExist) {
            return next(new CustomError("Trade not found", 404));
        }
        let oldPrice = Number.parseFloat(isTradeExist.price);
        let oldQuantity = Number.parseInt(isTradeExist.quantity);
        let newPrice = Number.parseFloat(data.price);
        let newQuantity = Number.parseInt(data.quantity);
        if(tradeMethod.toLowerCase() === "sell"){
            if(newQuantity > oldQuantity){
                return next(new CustomError("Quantity is greater than the available quantity", 400));
            }
            if(newQuantity < oldQuantity){
                newQuantity = oldQuantity - newQuantity;
            }
            if(newQuantity === oldQuantity){
                newQuantity = 0;
            }

            const updatedTrade = await trade.findByIdAndUpdate(id, {
                $set: {
                    quantity: newQuantity
                }
            }, {new: true});
            res.status(200).json({
                success: true,
                data: updatedTrade
            });

        }else if(tradeMethod.toLowerCase() === "buy"){
            let currentNetWorth = oldPrice * oldQuantity;
            let newNetWorth = newPrice * newQuantity;
            currentNetWorth = currentNetWorth + newNetWorth;
            let totalQuantity = oldQuantity + newQuantity;
            let avgPrice = currentNetWorth / totalQuantity;
            avgPrice = Number.parseFloat(avgPrice).toFixed(2);
            const updatedTrade = await trade.findByIdAndUpdate(id, {    
                $set: {
                    price: avgPrice,
                    quantity: totalQuantity
                }
            }, {new: true});
            res.status(200).json({
                success: true,
                data: updatedTrade
            });
        }else{
            return next(new CustomError("Please provide a valid method", 400));
        }

    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})

//delete trade by id
exports.deleteTradeById = BigPromise(async (req, res, next) => {
    try {
        const deletedTrade = await trade.findByIdAndDelete(req.params.id);
        if (!deletedTrade) {
            next(new CustomError("Trade not found", 404));
        }
        res.status(200).json({
            success: true,
            data: deletedTrade
        });
    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})

//calculate returns for all trades
exports.calculateReturns = BigPromise(async (req, res, next) => {
    try {
        const trades = await trade.find();
        // console.log(trades);
        let currentPrice = Number.parseFloat(req.query.price);
        let totalReturns = 0;
        for(let i=0; i<trades.length; i++){
            let tradePrice = Number.parseFloat(trades[i].price);
            let tradeQuantity = Number.parseInt(trades[i].quantity);
            let returns = (currentPrice - tradePrice) * tradeQuantity;
            totalReturns = totalReturns + returns;
        }
        if(totalReturns < 0){
            totalReturns = 0;
        }
        res.status(200).json({
            success: true,
            data: totalReturns
        });
       
    } catch (err) {
        next(new CustomError(err.message, err.statusCode));
    }
})