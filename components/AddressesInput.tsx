import React, { useCallback, useState } from "react";
import { utils } from "ethers";
import { isAddressZero } from "utils/addressUtils";
import ENSAvatar from "components/ENSAvatar";
import useENSSupported from "hooks/useENSSupported";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";

export interface AddressesInputProps {
  addresses: string[];
  onAdd: (address: string) => void;
  onRemove: (address: string) => void;
}

const AddressesInput: React.FC<AddressesInputProps> = ({
  addresses,
  onAdd,
  onRemove,
}) => {
  const isENSSupported = useENSSupported();
  const [value, setValue] = useState("");

  const handleAddress = useCallback(
    (address: string) => {
      if (
        utils.isAddress(address) &&
        !isAddressZero(address) &&
        !addresses.includes(address)
      ) {
        onAdd(utils.getAddress(address));
        setValue("");
      }
    },
    [onAdd, addresses]
  );

  console.log(addresses);

  return (
    <>
      <VStack as="ul" align="stretch" spacing="2">
        {addresses.map((address) => (
          <HStack key={address} as="li" spacing="2">
            {isENSSupported && <ENSAvatar addressOrName={address} size="sm" />}
            <Text isTruncated>{address}</Text>
            {addresses.length > 1 && (
              <Button
                onClick={() => onRemove(address)}
                size="sm"
                flexShrink="0"
              >
                Remove
              </Button>
            )}
          </HStack>
        ))}
      </VStack>

      <HStack spacing="2" mt="2">
        <Input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddress(value);
            }
          }}
          placeholder="Address"
        />
        <Button onClick={() => handleAddress(value)}>Add</Button>
      </HStack>
    </>
  );
};

export default AddressesInput;
