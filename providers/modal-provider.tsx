"use client";

import { useState, useEffect } from "react";
import { Owner } from "@prisma/client";

import { StoreModal } from "@/components/modals/store-modal";

interface ModalProviderProps {
  owners: Owner[];
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ owners }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <StoreModal owners={owners} />
    </>
  );
};
