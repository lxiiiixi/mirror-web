import { create } from 'zustand'

interface LoginModalState {
  open: boolean
  openModal: () => void
  closeModal: () => void
}

export const useLoginModalStore = create<LoginModalState>((set) => ({
  open: false,
  openModal: () => set({ open: true }),
  closeModal: () => set({ open: false }),
}))
