import { ColumnDef } from "@tanstack/react-table"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Kiosk } from "../data/schema"
import { Badge } from "@/components/ui/badge"

export const columns: ColumnDef<Kiosk>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          키오스크 이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "location",
    header: "위치",
  },
  {
    accessorKey: "status",
    header: "상태",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const getStatusBadge = (status: string) => {
        switch (status) {
          case "active":
            return (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                활성
              </Badge>
            )
          case "inactive":
            return (
              <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200">
                비활성
              </Badge>
            )
          case "maintenance":
            return (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                유지보수
              </Badge>
            )
          case "offline":
            return (
              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                오프라인
              </Badge>
            )
          default:
            return <Badge variant="outline">{status}</Badge>
        }
      }

      return getStatusBadge(status)
    },
  },
  {
    accessorKey: "type",
    header: "유형",
    cell: ({ row }) => {
      const type = row.getValue("type") as string

      const getTypeLabel = (type: string) => {
        switch (type) {
          case "payment": return "결제"
          case "information": return "정보"
          case "order": return "주문"
          case "ticket": return "발권"
          case "check-in": return "체크인"
          default: return type
        }
      }

      return getTypeLabel(type)
    },
  },
  {
    accessorKey: "installationDate",
    header: "설치일",
    cell: ({ row }) => {
      const date = row.getValue("installationDate") as Date
      return format(date, "yyyy-MM-dd", { locale: ko })
    },
  },
  {
    accessorKey: "lastConnectionDate",
    header: "마지막 연결",
    cell: ({ row }) => {
      const date = row.getValue("lastConnectionDate") as Date
      return format(date, "yyyy-MM-dd HH:mm:ss", { locale: ko })
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const kiosk = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">메뉴 열기</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>작업</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(kiosk.id)}
            >
              ID 복사
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>상세 정보 보기</DropdownMenuItem>
            <DropdownMenuItem>정보 수정</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">삭제</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]