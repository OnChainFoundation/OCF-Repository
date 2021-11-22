// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./DonationCollector.sol";
// import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

contract autoDonate is KeeperCompatibleInterface, OCFDonation {
    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    constructor(uint256 updateInterval) {
        interval = updateInterval;
        lastTimeStamp = block.timestamp;

        performData = checkData;
    }

    // Donation Token address
    address private constant DAI = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa;
    // Charity Wallet address
    address private constant charity =
        0xd1eE5572543FE94f0460d977F220Fc95330181C1;
    // Smart Contract address (remember to update the smart contract address if needed)
    address private constant contract_addr =
        0xd1eE5572543FE94f0460d977F220Fc95330181C1;

    function checkUpkeep(address addr, bytes calldata checkData)
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory performData)
    {
        if (
            (block.timestamp - lastTimeStamp) > interval &&
            DonationStorage == true
        ) {
            upkeepNeeded = true;
            performData = checkData;
        } else {
            upkeepNeeded = false;
            return "No donation transfer is requested at the moment";
        }
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        OCFDonation OCF = OCFDonation(contract_addr);
        OCF.transferERC20(DAI, charity, DonationOut);
        performData;
    }
}
