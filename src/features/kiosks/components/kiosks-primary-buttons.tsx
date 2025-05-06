import { IconDeviceTabletPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useKiosks } from '../context/kiosks-context'

export function KiosksPrimaryButtons() {
  const { setOpen } = useKiosks()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('add')}>
        <span>Add Kiosk</span> <IconDeviceTabletPlus size={18} />
      </Button>
    </div>
  )
}
