import React, { useContext } from "react";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";
import { AppContext } from "../context/AppProvider";

export default function Alert({ title, content }) {
  const { isOpenAlert, setIsOpenAlert } = useContext(AppContext);
  const onClose = () => setIsOpenAlert(false);

  const cancelRef = React.useRef(null);
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Center>
          <AlertDialog
            leastDestructiveRef={cancelRef}
            isOpen={isOpenAlert}
            onClose={onClose}
          >
            <AlertDialog.Content>
              <AlertDialog.CloseButton />
              <AlertDialog.Header>{title}</AlertDialog.Header>
              <AlertDialog.Body>{content}</AlertDialog.Body>
              <AlertDialog.Footer>
                <Button.Group space={2}>
                  <Button colorScheme="success" onPress={onClose}>
                    Delete
                  </Button>
                  <Button
                    variant="unstyled"
                    colorScheme="coolGray"
                    onPress={onClose}
                    ref={cancelRef}
                  >
                    Cancel
                  </Button>
                </Button.Group>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog>
        </Center>
      </Center>
    </NativeBaseProvider>
  );
}
