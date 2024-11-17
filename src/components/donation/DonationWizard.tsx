import { Box, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { CountSelection } from "./CountSelection";
import { DonationDetails } from "./DonationDetails";
import { useMutation } from "urql";
import { Alert } from "@/components/ui/alert";

const CreateDonation = `
  mutation Mutation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      id
      count
      createdAt
    }
  }
`;
const DonationWizard = () => {
  const [step, setStep] = useState(0);
  const [donationDetails, setDonationDetails] = useState({
    count: 20,
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [donationResult, createDonation] = useMutation(CreateDonation);

  const next = (values: any = {}) => {
    const mergeDetails = { ...donationDetails, ...values };

    if (step === pages.length - 1) {
      submitDonation(mergeDetails);
    } else {
      setStep(step + 1 > pages.length - 1 ? step : step + 1);
      setDonationDetails(mergeDetails);
    }
  };

  const previous = () => {
    setStep(step - 1 < 0 ? step : step - 1);
  };

  const submitDonation = async (values: any) => {
    await createDonation({ createDonationInput: values });
    setShowConfirmation(true);
  };

  const pages = [
    <CountSelection next={next} initialCount={donationDetails.count} />,
    <DonationDetails next={next} previous={previous} />,
  ];

  return (
    <Box boxShadow="xl" p={8} bg="white" borderRadius="xl" minW="sm">
      <VStack gap={2}>
        {showConfirmation ? (
          <Alert
            status="success"
            title={`Thank you for your donation of $
            ${donationResult?.data.createDonation?.count}!`}
          />
        ) : (
          pages[step]
        )}
      </VStack>
    </Box>
  );
};

export default DonationWizard;
