const express = require("express");
const router = express.Router();

const {
    getAllTrades,
    getTradeById,
    addTrade,
    updateTradeById,
    deleteTradeById,
    calculateReturns,
    getAllTransactions
} = require("../controllers/tradeController");

router.get("/",getAllTransactions);
router.get("/portfolio", getAllTrades);
router.get("/returns", calculateReturns);
router.get("/:id", getTradeById);
router.post("/", addTrade);
router.put("/:id", updateTradeById);
router.delete("/:id", deleteTradeById);


module.exports=router;