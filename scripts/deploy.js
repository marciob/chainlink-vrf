const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
require("@nomiclabs/hardhat-etherscan");
const { SUBSCRIPTION_ID } = require("../constants");

async function main() {
  /*
 A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
 so getRandomNumber here is a factory for instances of our GetRandomNumber contract.
 */
  const getRandomNumber = await ethers.getContractFactory("GetRandomNumber");
  // deploy the contract
  const deployedGetRandomNumberContract = await getRandomNumber.deploy(
    SUBSCRIPTION_ID
  );

  await deployedGetRandomNumberContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Verify Contract Address:",
    deployedGetRandomNumberContract.address
  );

  console.log("Waiting for Etherscan verification.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(30000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployedGetRandomNumberContract.address,
    constructorArguments: [SUBSCRIPTION_ID],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//deployed: 0x4492a7c34fea211Fd790df04197C4Cbf8B0be62f
//npx hardhat compile
//npx hardhat run scripts/deploy.js --network goerli
