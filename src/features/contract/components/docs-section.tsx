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
import ABI from "@/constants/SmartoGentDocsAgent.json";

export const DocsSection = ({
  address,
  contractName,
  ipfsHash,
}: ContractCardProps) => {
  const connectWithMetamask = useMetamask();
  const userAddress = useAddress();
  const message =
    "enerate script for interacting with the associated smart contract in python and js";
  const { data: contract } = useContract(
    "0x76e593392523243ACD38ceD87c2007F14483a86B",
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
            Docs for {contractName}
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
