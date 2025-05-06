import { useKiosks } from '../context/kiosks-context'
import { KiosksActionDialog } from './kiosks-action-dialog'
import { KiosksDeleteDialog } from './kiosks-delete-dialog'
import { KiosksInviteDialog } from './kiosks-invite-dialog'

export function KiosksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useKiosks()
  return (
    <>
      <KiosksActionDialog
        key='user-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
      />

      <KiosksInviteDialog
        key='user-invite'
        open={open === 'invite'}
        onOpenChange={() => setOpen('invite')}
      />

      {currentRow && (
        <>
          <KiosksActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <KiosksDeleteDialog
            key={`user-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />
        </>
      )}
    </>
  )
}
