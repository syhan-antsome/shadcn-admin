'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Kiosk } from '../data/schema'
import { useKiosksStore } from '../store/kiosks-store'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow: Kiosk
}

export function KiosksDeleteDialog({ open, onOpenChange, currentRow }: Props) {

  // Zustand 스토어에서 deleteKiosk 함수 가져오기
  const deleteKiosk = useKiosksStore((state) => state.deleteKiosk)
  
  // 로딩 상태 추가 (옵션)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      
      // 키오스크 ID 가져오기 (id나 kioskId 중 존재하는 값 사용)
      const kioskId = currentRow.id || currentRow.kioskId
      
      // deleteKiosk 함수 호출
      await deleteKiosk(kioskId)
      
      // 성공 메시지 표시
      toast.success(`"${currentRow.kioskNm}" 키오스크가 성공적으로 삭제되었습니다.`)
      
      // 다이얼로그 닫기
      onOpenChange(false)
    } catch (error) {
      // 오류 처리
      // eslint-disable-next-line no-console
      console.error('키오스크 삭제 오류:', error)
      toast.error('키오스크 삭제 중 오류가 발생했습니다.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <ConfirmDialog
      key='kiosk-delete'
      destructive
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      className='max-w-md'
      title={`Delete this task: ${currentRow.kioskNm} ?`}
      desc={
        <>
          <strong>{currentRow.id}</strong> 키오스크를 삭제하려합니다.
          <br />이 작업은 취소할 수 없습니다.
        </>
      }
      confirmText={isDeleting ? '삭제 중...' : '삭제'}
      disabled={isDeleting}
    />
  )
}
