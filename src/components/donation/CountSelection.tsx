import { Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "@/components/ui/radio-card";
import { useState } from "react";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Button } from "@/components/ui/button";

const options = [5, 20, 50, 100];

interface Props {
  initialCount: number;
  next: (values: any) => void;
}

export const CountSelection = ({ initialCount, next }: Props) => {
  const [pounds, setPounds] = useState(initialCount);
  const [customAmount, setCustomAmount] = useState(
    "" + (options.includes(pounds) ? "" : pounds),
  );

  const nextStep = () => {
    next({ count: pounds });
  };

  return (
    <VStack gap={2} align="stretch" width="full">
      <Heading as="h2" fontWeight="bold">
        Join #TEAMTREES
      </Heading>
      <Text fontSize="sm">$1 removes a pound of trash</Text>

      <RadioCardRoot
        orientation="horizontal"
        align="center"
        justify="center"
        width="full"
        defaultValue={pounds.toString()}
        onValueChange={(e) => {
          setCustomAmount("");
          setPounds(parseInt(e.value));
        }}
      >
        <SimpleGrid columns={2} gap="2">
          {options.map((option) => (
            <RadioCardItem
              _checked={{
                bg: "blue.100",
                color: "blue.500",
              }}
              label={option + " pounds"}
              indicator={false}
              key={option}
              value={option.toString()}
            />
          ))}
        </SimpleGrid>
      </RadioCardRoot>

      <NumberInputRoot
        onValueChange={(e) => {
          setPounds(parseInt(e.value));
          setCustomAmount(e.value);
        }}
        value={customAmount}
      >
        <NumberInputField placeholder="Other value" />
      </NumberInputRoot>

      <hr />

      <Button
        width="full"
        colorPalette="orange"
        size="lg"
        borderRadius="full"
        onClick={nextStep}
      >
        Next
      </Button>
    </VStack>
  );
};
