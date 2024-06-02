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
import ABI from "@/constants/SmartoGentOverview.json";

export const OverViewSection = ({
  address,
  contractName,
  ipfsHash,
}: ContractCardProps) => {
  const connectWithMetamask = useMetamask();
  const userAddress = useAddress();
  const message =
    "enerate script for interacting with the associated smart contract in python and js";
  const { data: contract } = useContract(
    "0xB52329A11333462D192110357Be2da470B79B13e",
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
