const ethers = require('ethers');
const provider = ethers.getDefaultProvider("rinkeby");
;
const newWallet = ethers.Wallet.createRandom();

console.log(newWallet);



// const iface = new ethers.utils.Interface([
//   // Constructor
//   "constructor(string symbol, string name)",

//   // State mutating method
//   "function transferFrom(address from, address to, uint amount)",

//   // State mutating method, which is payable
//   "function mint(uint amount) payable",

//   // Constant method (i.e. "view" or "pure")
//   "function balanceOf(address owner) view returns (uint)",

//   // An Event
//   "event Transfer(address indexed from, address indexed to, uint256 amount)",

//   // A Custom Solidity Error
//   "error AccountLocked(address owner, uint256 balance)",

//   // Examples with structured types
//   "function addUser(tuple(string name, address addr) user) returns (uint id)",
//   "function addUsers(tuple(string name, address addr)[] user) returns (uint[] id)",
//   "function getUser(uint id) view returns (tuple(string name, address addr) user)"
// ]);



// const ethers = require('ethers');
// const utils = require('ethers/utils'); 



// let emailHex = utils.hashMessage("dipeshsukhani@gmail.com");

// let dobHex = utils.hashMessage("28091985");  // required to be a string 
// let passwordHex = utils.hashMessage("thisIsATestPasswordWhichWillBeHashedUsingASaltInTheServer"); // will ensure that the client will be one of the controlling party in generating the account
// let saltMessageHex = utils.hashMessage("SaltMessageInString"); // will ensure that 1xchange will be one of the controlling party in generating the account

// let concatedMessage = ((emailHex.concat(dobHex)).concat(passwordHex)).concat(saltMessageHex);
// let hexOfConcatedMessage = utils.hashMessage(concatedMessage);
// console.log(hexOfConcatedMessage);

// let wallet = new ethers.Wallet(hexOfConcatedMessage);
// console.log(wallet);

// let randomWallet = ethers.Wallet.createRandom();
// console.log(randomWallet);