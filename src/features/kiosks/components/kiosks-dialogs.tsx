import { useKiosks } from '../context/kiosks-context'
import { KiosksActionDialog } from './kiosks-action-dialog'
import { KiosksDeleteDialog } from './kiosks-delete-dialog'

export function KiosksDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useKiosks()

  // 다이얼로그 닫기 핸들러
  const handleClose = () => {
    setOpen(null)
    // 다이얼로그가 닫힌 후 currentRow 초기화
    setTimeout(() => {
      setCurrentRow(null)
    }, 300)
  }

  return (
    <>
      {/* 키오스크 추가 다이얼로그 */}
      <KiosksActionDialog
        key='kiosk-add'
        open={open === 'add'}
        onOpenChange={(isOpen) => {
          if (!isOpen) handleClose()
        }}
      />
      
      {/* 키오스크 수정 다이얼로그 - currentRow가 있을 때만 렌더링 */}
      {currentRow && (
        <>
          <KiosksActionDialog
            key={`kiosk-edit-${currentRow.id || currentRow.kioskId}`}
            open={open === 'edit'}
            onOpenChange={(isOpen) => {
              if (!isOpen) handleClose()
            }}
            currentRow={currentRow}
          />

          {/* 키오스크 삭제 다이얼로그 */}
          <KiosksDeleteDialog
            key={`kiosk-delete-${currentRow.id || currentRow.kioskId}`}
            open={open === 'delete'}
            onOpenChange={(isOpen) => {
              if (!isOpen) handleClose()
            }}
            currentRow={currentRow}
          />
          
          {/* 필요한 다른 다이얼로그들... */}
        </>
      )}
    </>
  )
}
