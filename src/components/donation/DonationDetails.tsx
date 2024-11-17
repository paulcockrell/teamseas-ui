import { Button, Heading, Input, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { useForm } from "react-hook-form";

interface Props {
  next: (values: any) => void;
  previous: () => void;
}

interface FormValues {
  displayName: string;
  email: string;
  mobile: string;
  team: string;
  message: string;
}

export const DonationDetails = ({ next, previous }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      displayName: "",
      email: "",
      mobile: "",
      team: "",
      message: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("XXX doing submit");
    next(data);
  });

  return (
    <form onSubmit={onSubmit} style={{ width: "100%" }}>
      <VStack gap={4} align="stretch" width="full">
        <Heading as="h2" size="xl">
          Details
        </Heading>

        <Field
          label="Display name"
          invalid={!!errors.displayName}
          errorText={errors.displayName?.message || "Invalid display name"}
        >
          <Input
            {...register("displayName", {
              required: "Display name is required",
              minLength: 2,
              maxLength: 30,
            })}
          />
        </Field>
        <Field
          label="Email"
          invalid={!!errors.email}
          errorText={errors.email?.message || "Invalid email"}
        >
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
            })}
          />
        </Field>
        <Field
          label="Mobile"
          invalid={!!errors.mobile}
          errorText={errors.mobile?.message || "Invalid mobile number"}
        >
          <Input
            {...register("mobile", {
              minLength: 8,
              maxLength: 12,
            })}
          />
        </Field>
        <Field
          label="Team"
          invalid={!!errors.team}
          errorText={errors.team?.message || "Invalid team name"}
        >
          <Input
            {...register("team", {
              minLength: 2,
              maxLength: 30,
            })}
          />
        </Field>
        <Field
          label="Message"
          invalid={!!errors.message}
          errorText={errors.message?.message || "Invalid mesasge"}
        >
          <Input
            {...register("message", {
              minLength: 2,
              maxLength: 100,
            })}
          />
        </Field>
        <Button
          width="full"
          colorPalette="orange"
          size="lg"
          borderRadius="full"
          type="submit"
        >
          Submit
        </Button>
        <Button
          width="full"
          size="xl"
          borderRadius="full"
          variant="ghost"
          fontSize="sm"
          colorPalette="gray.700"
          onClick={previous}
        >
          Previous
        </Button>
      </VStack>
    </form>
  );
};
