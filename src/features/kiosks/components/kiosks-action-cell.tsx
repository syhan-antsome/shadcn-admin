import { MoreHorizontal } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Kiosk } from '../data/schema'
import { useKiosks } from '../context/kiosks-context'
import { useKiosksStore } from '../store/kiosks-store'

// ActionsCell 컴포넌트 정의 - Hook 을 사용하여 키오스크 관련 작업을 처리하기 위해 별도의 컴포넌트로 분리함.
export function ActionsCell({ kiosk }: { kiosk: Kiosk }) {
  // Hook 사용
  const { setOpen, setCurrentRow } = useKiosks()

  const deleteKiosk = useKiosksStore((state) => state.deleteKiosk)

  // 키오스크 수정 핸들러
  const handleEdit = () => {
    setCurrentRow(kiosk)
    setOpen('edit')
  }

  // 키오스크 상세 보기 핸들러
  const handleViewDetails = () => {
    setCurrentRow(kiosk)
    setOpen('view')
  }

  // 키오스크 삭제 핸들러
  const handleDelete = async () => {
    if (window.confirm(`정말 "${kiosk.kioskNm || kiosk.kioskId}" 키오스크를 삭제하시겠습니까?`)) {
      try {
        await deleteKiosk(kiosk.id || kiosk.kioskId)
        toast.success('키오스크가 성공적으로 삭제되었습니다.')
      } catch (error) {
        toast.error('키오스크 삭제 중 오류가 발생했습니다.')
        // eslint-disable-next-line no-console
        console.error('Error deleting kiosk:', error)
      }
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>메뉴 열기</span>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>작업</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(kiosk.kioskId)}>
          ID 복사
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleViewDetails}>
          상세 정보 보기
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEdit}>정보 수정</DropdownMenuItem>
        <DropdownMenuItem className='text-red-600' onClick={handleDelete}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
