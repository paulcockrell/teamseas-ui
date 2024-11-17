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
import { useQuery, useSubscription } from "urql";
import { Leaderboard } from "./components/leaderboard/Leaderboard";
import DonationWizard from "./components/donation/DonationWizard";

const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

const TotalDonationsSubscriptionQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;

const handleTotalDonationsSubscription = (_previous, newTotal) => {
  return newTotal?.totalUpdated?.total;
};

function App() {
  const [res] = useSubscription(
    { query: TotalDonationsSubscriptionQuery },
    handleTotalDonationsSubscription,
  );
  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  });

  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Box
      textAlign="center"
      fontSize="xl"
      pt="30vh"
      colorPalette="green"
      backgroundColor="blue.200"
    >
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
            <AnimatedCounter
              from={0}
              to={res.data || data.totalDonations}
              duration={1}
            />
          )}
        </Heading>

        <DonationWizard />

        <Leaderboard />
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
