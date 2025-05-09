import { CalendarIcon, ReloadIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { kioskStatusEnum, kioskTypeEnum, KioskParams } from "../data/schema"

interface KiosksFilterProps {
  onFilterChange: (values: Partial<KioskParams>) => void
  isLoading: boolean
  currentFilter: KioskParams
}

const filterFormSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
})

type FilterValues = z.infer<typeof filterFormSchema>

export function KiosksFilter({ onFilterChange, isLoading, currentFilter }: KiosksFilterProps) {
  const form = useForm<FilterValues>({
    resolver: zodResolver(filterFormSchema),
    // 초기값 설정
    defaultValues: {
      startDate: currentFilter.startDate,
      endDate: currentFilter.endDate,
      status: currentFilter.status,
      type: currentFilter.type,
      location: currentFilter.location || "",
    },
  })

  function onSubmit(data: FilterValues) {
    // 필터링 값이 변경될 때마다 부모 컴포넌트에 알림
    onFilterChange(data)
  }

  function handleReset() {
    form.reset()
    onFilterChange({
      startDate: undefined,
      endDate: undefined,
      status: undefined,
      type: undefined,
      location: "",
      page: 1, // 페이지 초기화
    })
  }

  const statusOptions = kioskStatusEnum.options
  const typeOptions = kioskTypeEnum.options

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-2">
        <div className="flex flex-wrap gap-4 items-center">
          {/* 시작일 필드 */}
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 border-r pr-4 my-1">
                <FormLabel className="text-sm font-medium whitespace-nowrap">
                  설치 시작일
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd", { locale: ko })
                        ) : (
                          <span>시작일 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || (form.getValues("endDate") ? date > form.getValues("endDate")! : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* 종료일 필드 */}
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 border-r pr-4 my-1">
                <FormLabel className="text-sm font-medium whitespace-nowrap">
                  종료일
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[140px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "yyyy-MM-dd", { locale: ko })
                        ) : (
                          <span>종료일 선택</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => 
                        date > new Date() || (form.getValues("startDate") ? date < form.getValues("startDate")! : false)
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          {/* 상태 필드 */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 border-r pr-4 my-1">
                <FormLabel className="text-sm font-medium whitespace-nowrap">
                  상태
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="모든 상태" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">모든 상태</SelectItem>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "active" && "활성"}
                        {status === "inactive" && "비활성"}
                        {status === "maintenance" && "유지보수"}
                        {status === "offline" && "오프라인"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* 유형 필드 */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 border-r pr-4 my-1">
                <FormLabel className="text-sm font-medium whitespace-nowrap">
                  유형
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="모든 유형" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="all">모든 유형</SelectItem>
                    {typeOptions.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "payment" && "결제"}
                        {type === "information" && "정보"}
                        {type === "order" && "주문"}
                        {type === "ticket" && "발권"}
                        {type === "check-in" && "체크인"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          {/* 위치 필드 */}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 my-1">
                <FormLabel className="text-sm font-medium whitespace-nowrap">
                  위치
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="위치 검색"
                    className="w-[180px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* 버튼 영역 */}
          <div className="flex gap-2 ml-auto my-1">
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={handleReset}
              className="h-9"
            >
              초기화
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="h-9"
            >
              {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
              <MagnifyingGlassIcon className="mr-2 h-4 w-4" />
              검색
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}