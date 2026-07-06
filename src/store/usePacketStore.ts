"use client";

import { create } from "zustand";

type PacketStore = {
  selectedDocumentIds: string[];
  activePacketTitle: string;
  setPacketTitle: (title: string) => void;
  addDocument: (id: string) => void;
  removeDocument: (id: string) => void;
  clearPacket: () => void;
};

export const usePacketStore = create<PacketStore>((set) => ({
  selectedDocumentIds: ["doc-ca-retaliation", "doc-hcv-termination"],
  activePacketTitle: "Eviction Defense Intake Packet",
  setPacketTitle: (title) => set({ activePacketTitle: title }),
  addDocument: (id) =>
    set((state) => ({
      selectedDocumentIds: state.selectedDocumentIds.includes(id)
        ? state.selectedDocumentIds
        : [...state.selectedDocumentIds, id]
    })),
  removeDocument: (id) =>
    set((state) => ({
      selectedDocumentIds: state.selectedDocumentIds.filter((documentId) => documentId !== id)
    })),
  clearPacket: () => set({ selectedDocumentIds: [] })
}));
