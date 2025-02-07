// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MemeTrading {
    struct Trade {
        address trader;
        address token;
        uint256 amount;
        uint256 price;
        uint256 timestamp;
    }

    Trade[] public trades;
    uint256 public feePercentage = 1; // 1% fee

    event TradeExecuted(
        address indexed trader,
        address indexed token,
        uint256 amount,
        uint256 price,
        uint256 timestamp
    );

    function executeTrade(
        address token,
        uint256 amount,
        uint256 price
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(price > 0, "Price must be greater than 0");

        uint256 fee = (amount * price * feePercentage) / 100;
        uint256 totalCost = (amount * price) + fee;

        trades.push(Trade({
            trader: msg.sender,
            token: token,
            amount: amount,
            price: price,
            timestamp: block.timestamp
        }));

        emit TradeExecuted(msg.sender, token, amount, price, block.timestamp);
    }

    function getAllTrades() external view returns (Trade[] memory) {
        return trades;
    }

    function setFeePercentage(uint256 _feePercentage) external {
        require(_feePercentage <= 10, "Fee cannot exceed 10%");
        feePercentage = _feePercentage;
    }
}
