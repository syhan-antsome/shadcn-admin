import { useState, useEffect } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { KiosksTablePagination } from './kiosks-table-pagination'
import { DataTableToolbar } from './data-table-toolbar'

interface KiosksTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  pageCount?: number
  currentPage?: number
  onPageChange?: (page: number) => void
  onSortChange?: (sortBy: string, sortOrder: 'asc' | 'desc') => void
}

export function KiosksTable<TData, TValue>({
  columns,
  data,
  isLoading = false,
  pageCount,
  currentPage,
  onPageChange,
  onSortChange,
}: KiosksTableProps<TData, TValue>) {
  // 로컬 정렬 상태 (UI 표시용)
  const [sorting, setSorting] = useState<SortingState>([])

  // 정렬 상태가 변경될 때마다 부모 컴포넌트에 알림
  useEffect(() => {
    if (sorting.length > 0) {
      const {id, desc} = sorting[0]
      onSortChange?.(id, desc ? 'desc' : 'asc')
    }
  }, [sorting, onSortChange])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // 서버에서 페이지네이션 처리
    manualSorting: true, // 서버에서 정렬 처리
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(), // 로컬에서 보여주기 위한 모델
    pageCount: pageCount, // 서버에서 페이지 수를 가져옴
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1, // 0-based index
        pageSize: 10, // 페이지당 데이터 수
      },
    }
  })


  // eslint-disable-next-line no-console
  console.log('KiosksTable', { data, isLoading, pageCount, currentPage })
  return (
    <div className='space-y-4'>
      <DataTableToolbar table={table} />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // 로딩 중일 때 스켈레톤 UI 표시
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {Array.from({ length: columns.length }).map((_, cellIndex) => (
                    <TableCell key={`loading-cell-${cellIndex}`}>
                      <Skeleton className='h-6 w-full' />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              // 데이터가 있을 때 테이블 행 표시
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // 데이터가 없을 때 메시지 표시
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  데이터가 없습니다.2
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <KiosksTablePagination 
        currentPage={currentPage}
        totalPages={pageCount}
        onPageChange={onPageChange}
        isLoading={isLoading}
      />
    </div>
  )
}
