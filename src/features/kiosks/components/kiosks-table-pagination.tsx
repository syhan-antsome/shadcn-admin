import { Button } from "@/components/ui/button"
import { DoubleArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons"

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
  // 표시할 페이지 번호 계산 (최대 7개, 현재 페이지는 가운데 위치)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxDisplayPages = 7; // 최대 표시 페이지 수
    
    // 페이지 수가 7개 이하인 경우 모든 페이지 번호 표시
    if (totalPages <= maxDisplayPages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }

    // 표시할 페이지의 중간 위치 계산 (0부터 시작)
    const middleIndex = Math.floor(maxDisplayPages / 2); // 3
    
    // 현재 페이지가 처음 쪽에 가까운 경우
    if (currentPage <= middleIndex + 1) {
      for (let i = 1; i <= maxDisplayPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // 현재 페이지가 마지막 쪽에 가까운 경우
    if (currentPage > totalPages - middleIndex) {
      for (let i = totalPages - maxDisplayPages + 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    }
    
    // 현재 페이지가 중간에 위치하는 경우
    for (let i = currentPage - middleIndex; i <= currentPage + middleIndex; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  // 페이지 번호 버튼 배열
  const pageNumbers = getPageNumbers();

  // eslint-disable-next-line no-console
  console.log("pageNumbers :: ", pageNumbers)

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
        페이지 {currentPage} / {totalPages}
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 mx-auto sm:mx-0">
        {/* 첫 페이지로 이동하는 버튼 */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(1)}
          disabled={isLoading || currentPage === 1}
        >
          <span className="sr-only">첫 페이지</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        
        {/* 이전 페이지로 이동하는 버튼 */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading || currentPage === 1}
        >
          <span className="sr-only">이전 페이지</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        
        {/* 페이지 번호 버튼들 */}
        <div className="hidden sm:flex items-center space-x-2">
          {pageNumbers.map(pageNumber => (
            <Button
              key={pageNumber}
              variant={pageNumber === currentPage ? "default" : "outline"}
              className={`h-8 w-8 p-0 ${pageNumber === currentPage ? 'pointer-events-none' : ''}`}
              onClick={() => onPageChange(pageNumber)}
              disabled={isLoading}
            >
              {pageNumber}
            </Button>
          ))}
        </div>
        
        {/* 모바일 환경에서는 현재 페이지만 표시 */}
        <div className="flex sm:hidden items-center">
          <span className="px-2 text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
        </div>
        
        {/* 다음 페이지로 이동하는 버튼 */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0 sm:ml-0"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading || currentPage === totalPages}
        >
          <span className="sr-only">다음 페이지</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        
        {/* 마지막 페이지로 이동하는 버튼 */}
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => onPageChange(totalPages)}
          disabled={isLoading || currentPage === totalPages}
        >
          <span className="sr-only">마지막 페이지</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}