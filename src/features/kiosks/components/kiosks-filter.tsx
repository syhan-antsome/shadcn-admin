import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons"
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>설치 시작일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full sm:w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
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
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>설치 종료일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full sm:w-[200px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
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
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>상태</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-[200px]">
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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>유형</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full sm:w-[200px]">
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
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>위치</FormLabel>
                <FormControl>
                  <Input
                    placeholder="위치 검색"
                    className="w-full sm:w-[200px]"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            초기화
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            필터 적용
          </Button>
        </div>
      </form>
    </Form>
  )
}