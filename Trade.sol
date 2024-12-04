// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Trade {
    //states
    uint256 n_interaction = 20;
    uint256 n_publics = 40;

    // events 
    event OrderPlace(uint256 indexed n_publics, uint256 indexed n_interaction);
}