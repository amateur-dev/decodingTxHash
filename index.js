const ethers = require('ethers');
// const provider = ethers.getDefaultProvider("rinkeby");

const newWallet = ethers.Wallet.createRandom({} );

console.log(newWallet);