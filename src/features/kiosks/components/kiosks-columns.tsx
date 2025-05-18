import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Kiosk } from '../data/schema'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Kiosk>[] = [
  {
    accessorKey: 'kioskId',
    header: 'ID',
    cell: ({ row }) => (
      <div className='font-medium'>{row.getValue('kioskId')}</div>
    ),
  },
  {
    accessorKey: 'kioskNm',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          키오스크 이름
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      )
    },
  },
  {
    accessorKey: 'position',
    header: '위치',
  },
  {
    accessorKey: 'status',
    header: '상태',
    cell: ({ row }) => {
      const status = row.getValue('status') as string

      const getStatusBadge = (status: string) => {
        switch (status) {
          case 'active':
            return (
              <Badge
                variant='outline'
                className='border-green-200 bg-green-100 text-green-800'
              >
                활성
              </Badge>
            )
          case 'inactive':
            return (
              <Badge
                variant='outline'
                className='border-slate-200 bg-slate-100 text-slate-800'
              >
                비활성
              </Badge>
            )
          case 'maintenance':
            return (
              <Badge
                variant='outline'
                className='border-amber-200 bg-amber-100 text-amber-800'
              >
                유지보수
              </Badge>
            )
          case 'offline':
            return (
              <Badge
                variant='outline'
                className='border-red-200 bg-red-100 text-red-800'
              >
                오프라인
              </Badge>
            )
          default:
            return <Badge variant='outline'>{status}</Badge>
        }
      }

      return getStatusBadge(status)
    },
  },
  {
    accessorKey: 'kioskTp',
    header: '유형',
    cell: ({ row }) => {
      const type = row.getValue('kioskTp') as string

      const getTypeLabel = (type: string) => {
        switch (type) {
          case 'LPR':
            return 'LPR'
          case 'UNMAN':
            return '무인장비'
          default:
            return type
        }
      }

      return getTypeLabel(type)
    },
  },
  {
    accessorKey: 'regDt',
    header: '설치일',
  },
  {
    accessorKey: 'lastConnectionDate',
    header: '마지막 연결',
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />
  },
]
