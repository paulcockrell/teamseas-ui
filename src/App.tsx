import {
  Box,
  Checkbox,
  ClientOnly,
  Heading,
  HStack,
  Image,
  Progress,
  RadioGroup,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ColorModeToggle } from "@/components/color-mode-toggle";
import logo from "@/components/teamseas-tm-logo.png";
import AnimatedCounter from "./components/donation/Counter";
import { useQuery } from "urql";

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

function App() {
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  });

  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box textAlign="center" fontSize="xl" pt="30vh">
      <VStack gap="8">
        <Image src={logo} h="132px" />
        <Heading size="4xl">JOIN THE MOVEMENT!</Heading>
        <Text fontWeight="light">
          The team is growing everyday and scoring wins for environment.
          <br /> Remove trash with us and track our progress
        </Text>

        <Heading as="h2" size="6xl">
          {fetching ? (
            <p>Loading...</p>
          ) : (
            <AnimatedCounter from={0} to={data.totalDonations} duration={1} />
          )}
        </Heading>

        <HStack gap="10">
          <Checkbox.Root defaultChecked>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label>Checkbox</Checkbox.Label>
          </Checkbox.Root>

          <RadioGroup.Root display="inline-flex" defaultValue="1">
            <RadioGroup.Item value="1" mr="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>

            <RadioGroup.Item value="2">
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemControl>
                <RadioGroup.ItemIndicator />
              </RadioGroup.ItemControl>
              <RadioGroup.ItemText lineHeight="1">Radio</RadioGroup.ItemText>
            </RadioGroup.Item>
          </RadioGroup.Root>
        </HStack>

        <Progress.Root width="300px" value={65} striped>
          <Progress.Track>
            <Progress.Range />
          </Progress.Track>
        </Progress.Root>

        <HStack>
          <Button>Let's go!</Button>
          <Button variant="outline">bun install @chakra-ui/react</Button>
        </HStack>
      </VStack>

      <Box pos="absolute" top="4" right="4">
        <ClientOnly fallback={<Skeleton w="10" h="10" rounded="md" />}>
          <ColorModeToggle />
        </ClientOnly>
      </Box>
    </Box>
  );
}

export default App;
