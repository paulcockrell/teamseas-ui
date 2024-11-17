import { Donation } from "@/types";
import { Badge, Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import formatDate from "@/utils/formatDate";

interface Props {
  donation: Donation;
}

export const LeaderboardItem = ({ donation }: Props) => {
  return (
    <Flex
      boxShadow="md"
      p={3}
      bg="white"
      borderRadius="lg"
      maxWidth="xl"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Avatar size="lg" />

      <Box flex="1" ml={4}>
        <Flex justifyContent="space-between" h="100%">
          <Flex flexDirection="column" textAlign="left" justifyContent="center">
            <Text
              fontWeight="bold"
              color="blue.500"
              fontSize="sm"
              textTransform="uppercase"
            >
              {donation.team}
            </Text>
            <Text fontWeight="bold">{donation.displayName}</Text>
            <Text fontSize="sm">{donation.message}</Text>
          </Flex>

          <Flex
            flexDirection="column"
            justifyContent="space-around"
            textAlign="right"
            gapY={2}
          >
            <div>
              <Badge
                colorPalette="blue"
                borderRadius="full"
                textTransform="lowercase"
                py={1}
                px={3}
                justifyContent="right"
              >
                {donation.count.toLocaleString()} pounds
              </Badge>
            </div>
            <Text fontSize="sm">{formatDate(donation.createdAt)}</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
