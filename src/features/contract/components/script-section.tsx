import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ContractCardProps } from "@/features/contracts/components/contract-card";
import {
  useContractWrite,
  useContract,
  Web3Button,
  useAddress,
  useMetamask,
} from "@thirdweb-dev/react";
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

  const handleGenerate = async () => {
    if (!userAddress) {
      await connectWithMetamask();
    }
    await generateScript({ args: [message, address] }).then((res) => {
      console.log(res);
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
