import React, { createContext, useState, useContext } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Kiosk } from '../data/schema'

type KiosksDialogType = 'add' | 'edit' | 'delete' | 'view' | null

interface KiosksContextType {
  open: KiosksDialogType
  setOpen: (type: KiosksDialogType) => void
  currentRow: Kiosk | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Kiosk | null>>
}

const KiosksContext = createContext<KiosksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function KiosksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<KiosksDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Kiosk | null>(null)

  return (
    <KiosksContext.Provider value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </KiosksContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useKiosks = () => {
  const context = useContext(KiosksContext)
  if (!context) {
    throw new Error('useKiosks must be used within a KiosksProvider')
  }
  return context
}
