const ethers = require('ethers');
const provider = ethers.getDefaultProvider();

const utils = ethers.utils;
const txDecoder = require('ethereum-tx-decoder');


const shadowTokenabi = require('./BulkShadowTokenABI.json');
const multiSigabi = require('./MultiSigABI.json');

let shadowTokenContractAddress = "0xf3ECC2816e50D48Fd2AbB9acB1Fb4c6dBC10F9CA";
let multiSigContractAddress = "0x4a2d3ffec82b04d2c38cdbf3000bf70cb1f771be";
let shadowTokenContractInstance = new ethers.Contract(shadowTokenContractAddress, shadowTokenabi, provider);
let multiSigContractInstance = new ethers.Contract(multiSigContractAddress, multiSigabi, provider);

let shadowTokenIface = new ethers.utils.Interface(shadowTokenabi);
let multiSigIface = new ethers.utils.Interface(multiSigabi);

let getTxDetails = async (txHash) =>{
  resultData = await provider.getTransaction(txHash);
  var fnDecoder = new txDecoder.FunctionDecoder(multiSigabi);
  // FIXME: THROW THE ERROR IF NOT SUBMIT TO THE MultiSig
  try {
      let decodedFunctionResult = fnDecoder.decodeFn(resultData.data);
        try {
        if (resultData["to"].toUpperCase() == multiSigContractAddress.toUpperCase()) {
        var fnDecoder = new txDecoder.FunctionDecoder(multiSigabi);
        let decodedFunctionResult = fnDecoder.decodeFn(resultData.data);
        if (decodedFunctionResult["signature"].startsWith("submitTransaction")){
          console.info(`Decoding the tx that was submited for execution to the multiSig`);
          let fnDecoderL2 = new txDecoder.FunctionDecoder(shadowTokenabi);
          let decodedFunctionL2Result = fnDecoderL2.decodeFn(decodedFunctionResult.data);
          console.info("The function called was: ", getFunctionName(decodedFunctionL2Result));
          console.info("The types of the parameters of this function were: ", getParameters(decodedFunctionL2Result));
          for (let i=0;i<getParameters(decodedFunctionL2Result).length;i++) {
            console.log(`For the parameter number ${i+1}: ${getParameters(decodedFunctionL2Result)[i]}  --> the value was: ${decodedFunctionL2Result[i]}`) 
          }
        } else {
          console.warn(`The transaction was not a submitTransaction; needs to be analysed separately`);
        }
      }} catch (error) {
        console.error(`ERR: Could not decode the tx; it does not appear to be to the MultiSig Contract`)
      }} catch (error) {
        console.error(`ERR: The tx was not submitted to a smart contract`)
      }
  // console.log(decodedFunctionResult);
    
}

function getFunctionName(decodedFunction) {
  return decodedFunction["signature"].split(/\((.+)/)[0];
}

function getParameters(decodedFunction){
  return decodedFunction["signature"].split(/\((.+)/)[1].split(/\)/)[0].split(",");
}

module.exports = getTxDetails;
