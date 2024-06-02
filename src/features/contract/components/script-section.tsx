import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractCardProps } from "@/features/contracts/components/contract-card";
import {
  useContractWrite,
  useContract,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
import { Contract, ethers, Wallet } from "ethers";
import ABI from "@/constants/SmartoGentScriptGenerator.json";

export const ScriptSection = ({
  address,
  contractName,
  ipfsHash,
}: ContractCardProps) => {
  const connectWithMetamask = useMetamask();
  const userAddress = useAddress();
  const message =
    "enerate script for interacting with the associated smart contract in python and js";
  const { data: contract } = useContract(
    "0x87D3440372293aCf9149552546F7141AAe05Be91",
    ABI
  );
  const {
    mutateAsync: generateScript,
    isLoading,
    error,
  } = useContractWrite(contract, "initiateScripGenerator");

  const getChatId = (receipt: any, contract: any) => {
    let chatId;
    for (const log of receipt.logs) {
      try {
        const parsedLog = contract.interface.parseLog(log);
        if (parsedLog && parsedLog.name === "ChatCreated") {
          chatId = ethers.BigNumber.from(parsedLog.args[1]).toNumber();
        }
      } catch (error) {
        console.log("Could not parse log:", log);
        console.error("Parsing error:", error);
      }
    }
    return chatId;
  };

  const handleGenerate = async () => {
    if (!userAddress) {
      await connectWithMetamask();
    }
    await generateScript({
      args: [message, address],
    }).then((res: any) => {
      console.log(res.receipt.logs);
      const receipt = res.receipt;

      const chatId = getChatId(
        receipt,
        "0x87D3440372293aCf9149552546F7141AAe05Be91"
      );
      console.log(chatId);
    });
  };

  return (
    <Card className="glassmorphism mt-3 w-full">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="orange_gradient">
            Script for {contractName}
          </CardTitle>
          <Button
            className="blue_gradient"
            onClick={handleGenerate}
            disabled={isLoading}
          >
            Generate
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};
