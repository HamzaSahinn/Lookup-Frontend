import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function ModalSchema({
  children,
  setIsOpen,
  isOpen,
}: {
  children: React.ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen((prev) => !prev);
        }}
        size="4xl"
        className="p-2"
      >
        <ModalContent className="p-4">
          {(onClose) => <>{children}</>}
        </ModalContent>
      </Modal>
    </>
  );
}
