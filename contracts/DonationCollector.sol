// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";

// OCC smart contract
contract DonationsCollector {
    address public owner;
    uint256 public balance;

    event TransferReceived(address _from, uint256 _amount);
    event TransferSent(address _from, address _destAddr, uint256 _amount);

    constructor() {
        owner = msg.sender;
    }

    // receive transactions/donations
    receive() external payable {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }

    // function that swap tokens from our smart contract
    // address of the sushiswap router: 0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506
    // address of the uniswap v2 router: 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
    address private constant SUSHISWAP_ROUTER =
        0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506;
    //address of WETH token
    address private constant WETH = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;
    address private constant LINK = 0xa36085F69e2889c224210F603D836748e7dC0088;
    address private constant DAI = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;

    // swap function that trade one one token to another
    function swap(
        address _tokenIn,
        address _tokenOut,
        uint256 _amountIn,
        uint256 _amountOutMin,
        address _to
    ) external {
        // allow the uniswapv2 router to spend the token we just sent to this contract calling IERC20 approve
        require(
            IERC20(_tokenIn).approve(SUSHISWAP_ROUTER, _amountIn),
            "approve failed."
        );

        address[] memory path;
        // 2 possible cases in swapping tokens:
        // 1. TokenA -> TokenB
        // 2. TokenA -> WETH (intermediary token) -> TokenB (In most cases, this will get you better price)
        path = new address[](3);
        path[0] = _tokenIn;
        path[1] = WETH;
        path[2] = _tokenOut;

        IUniswapV2Router02(SUSHISWAP_ROUTER).swapExactTokensForTokens(
            _amountIn,
            _amountOutMin,
            path,
            _to,
            block.timestamp
        );
    }

    // function that transfer/donate tokens to charity
    function transferERC20(
        IERC20 token,
        address to,
        uint256 amount
    ) public {
        require(msg.sender == owner, "Only owner can withdraw funds");
        uint256 erc20balance = token.balanceOf(address(this));
        require(amount <= erc20balance, "balance is low");
        token.transfer(to, amount);
        emit TransferSent(msg.sender, to, amount);
    }
}
