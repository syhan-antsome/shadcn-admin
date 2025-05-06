import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Kiosk, KiosksDialogType } from '../data/schema'

interface KiosksContextType {
  open: KiosksDialogType
  setOpen: (type: KiosksDialogType) => void
  currentKiosk: Kiosk | null
  setCurrentKiosk: React.Dispatch<React.SetStateAction<Kiosk | null>>
}

const KiosksContext = React.createContext<KiosksContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function KiosksProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<KiosksDialogType>(null)
  const [currentKiosk, setCurrentKiosk] = useState<Kiosk | null>(null)

  return (
    <KiosksContext.Provider value={{ open, setOpen, currentKiosk, setCurrentKiosk }}>
      {children}
    </KiosksContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useKiosks = () => {
  const context = React.useContext(KiosksContext)
  if (!context) {
    throw new Error('useKiosks must be used within a KiosksProvider')
  }
  return context
}
