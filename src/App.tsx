import "./App.css";
import { VStack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RiMailLine } from "react-icons/ri";

function App() {
  return (
    <VStack>
      <Alert status="info" title="This is the alert title" />
      <Button colorPalette="teal" variant="solid">
        <RiMailLine />
        Click my buttons!
      </Button>
    </VStack>
  );
}

export default App;
