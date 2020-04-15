const ethers = require('ethers');
const provider = ethers.getDefaultProvider();
const utils = ethers.utils;
const txDecoder = require('ethereum-tx-decoder');


const abi = require('./BulkShadowTokenABI.json');

let contractAddress = "0xf3ECC2816e50D48Fd2AbB9acB1Fb4c6dBC10F9CA";
let contract = new ethers.Contract(contractAddress, abi, provider);

// let iface = new ethers.utils.Interface(abi);
(async () => {
    resultData = await provider.getTransaction("0xa2fe4a518453ad6c5e500f722d16fc70ef389abc16a438451a9414507e32d212");
    let bytesMessageSent = utils.defaultAbiCoder.decode(
        [ 'address', 'uint', 'bytes' ],
        utils.hexDataSlice(resultData.data, 4)
        );
    var fnDecoder = new txDecoder.FunctionDecoder(abi);
    let decodedFunctionResult = fnDecoder.decodeFn(bytesMessageSent[2]);
    console.log(decodedFunctionResult);
  
    // the result decodedFunctionValues will tell us the function that was used and its associated parameters.  Eg below:
    console.log("The function called was: ", getFunctionName(decodedFunctionResult));
    console.log("The types of the parameters of this function were: ", getParameters(decodedFunctionResult));
    for (let i=0;i<getParameters(decodedFunctionResult).length;i++) {
      console.log(`For the parameter number ${i+1}: ${getParameters(decodedFunctionResult)[i]}  --> the value was: ${decodedFunctionResult[i]}`)      
    }

    
})();


function getFunctionName(decodedFunction) {
  return decodedFunction["signature"].split(/\((.+)/)[0];
}

function getParameters(decodedFunction){
  return decodedFunction["signature"].split(/\((.+)/)[1].split(/\)/)[0].split(",");
}

// let resultData;
// (async () => {
//     resultData = await provider.getTransaction("0x462549936e6401a4c5b3891671c98934e051f3895f5739c27487d51fde55a6cd").then((result) => {return(result.data)});
//     if (utils.isHexString(resultData)) {
//       let answer = utils.defaultAbiCoder.decode(
//         [ 'address', 'uint', 'bytes' ],
//         utils.hexDataSlice(resultData, 4)
//         );
//       let derived_answer = utils.defaultAbiCoder.decode(
//         [ 'address', 'address', 'uint' ],
//         utils.hexDataSlice(answer[2], 4)
//       );
//     }
//     console.log(derived_answer);
// })().catch(err => {
//     console.error(err);
// });


