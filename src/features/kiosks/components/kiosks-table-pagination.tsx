import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"

interface KiosksTablePaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isLoading?: boolean
}

export function KiosksTablePagination({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: KiosksTablePaginationProps) {
  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground">
        페이지 {currentPage} / {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(1)}
          disabled={isLoading || currentPage === 1}
        >
          <span className="sr-only">첫 페이지</span>
          <ChevronLeftIcon className="h-4 w-4" />
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage === 1}
        >
          <span className="sr-only">이전 페이지</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage === totalPages}
        >
          <span className="sr-only">다음 페이지</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(totalPages)}
          disabled={isLoading || currentPage === totalPages}
        >
          <span className="sr-only">마지막 페이지</span>
          <ChevronRightIcon className="h-4 w-4" />
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}