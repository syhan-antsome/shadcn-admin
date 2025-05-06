import { useState, useEffect } from "react"
import { Kiosk } from "../data/schema"
import { getFilteredKiosks } from "../data/kiosks"
import { KiosksTable } from "./kiosks-table"
import { columns } from "./columns"
import { KiosksFilter } from "./kiosks-filter"
import { ReloadIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

export function KiosksPage() {
  const [data, setData] = useState<Kiosk[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  async function loadKiosks(
    startDate?: Date,
    endDate?: Date,
    status?: string,
    type?: string,
    location?: string
  ) {
    setLoading(true)
    try {
      const filteredData = await getFilteredKiosks(
        startDate,
        endDate,
        status,
        type,
        location
      )
      setData(filteredData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to load kiosks:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadKiosks()
  }, [])

  const handleFilterChange = (values: unknown) => {
    const { startDate, endDate, status, type, location } = values
    loadKiosks(startDate, endDate, status, type, location)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">키오스크 관리</h2>
          <p className="text-muted-foreground">
            시스템에 등록된 모든 키오스크 장비를 관리합니다.
          </p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          키오스크 추가
        </Button>
      </div>

      <div className="border rounded-lg p-4">
        <h3 className="text-lg font-medium mb-4">검색 필터</h3>
        <KiosksFilter onFilterChange={handleFilterChange} isLoading={loading} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-8">
          <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
          <p>데이터를 불러오는 중...</p>
        </div>
      ) : (
        <KiosksTable columns={columns} data={data} />
      )}
    </div>
  )
}