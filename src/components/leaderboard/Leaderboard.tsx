import { Box, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import { LeaderboardItem } from "./LeaderboardItem";
import { useState } from "react";
import { Donation } from "@/types";
import { useQuery } from "urql";
import { Radio, RadioGroup } from "@/components/ui/radio";

const DonationQuery = `
  query Query($orderBy: OrderByParams) {
    donations(orderBy: $orderBy) {
      id
      count
      displayName
      team
      message
      createdAt
    }
  }
`;

type DonationQueryRes = {
  donations: Array<Donation>;
};

interface Props {}

export const Leaderboard = (props: Props) => {
  const [field, setField] = useState("createdAt");

  const [{ data, fetching, error }] = useQuery<DonationQueryRes>({
    query: DonationQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  });

  if (error) return <p>Something went wrong...</p>;
  if (fetching || !data) return <p>Loading...</p>;

  return (
    <Box w="100%">
      <VStack gap={4}>
        <Heading as="h1" size="2xl">
          LEADERBOARD
        </Heading>

        <RadioGroup value={field} onValueChange={(e) => setField(e.value)}>
          <HStack gap={6}>
            <Radio value="createdAt">Most recent</Radio>
            <Radio value="count">Most pounds</Radio>
          </HStack>
        </RadioGroup>

        {data.donations.map((donation: Donation) => (
          <LeaderboardItem key={donation.id} donation={donation} />
        ))}
      </VStack>
    </Box>
  );
};
