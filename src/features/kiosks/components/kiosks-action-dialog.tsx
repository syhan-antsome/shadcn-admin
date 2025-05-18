'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SelectDropdown } from '@/components/select-dropdown'
import { Textarea } from '@/components/ui/textarea'
import { kioskTypes } from '../data/data'
import { Kiosk } from '../data/schema'
// 스토어 사용
import { useKiosksStore } from '../store/kiosks-store'

// 키오스크 폼 스키마 정의
const formSchema = z.object({
  kioskNm: z.string().min(1, { message: '키오스크 이름은 필수입니다.' }),
  kioskTp: z.string().min(1, { message: '키오스크 타입은 필수입니다.' }),
  position: z.string().min(1, { message: '설치 위치는 필수입니다.' }),
  info: z.string().optional(),
  status: z.string().default('ACTIVE'),
  isEdit: z.boolean(),
})

type KioskForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: Kiosk
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function KiosksActionDialog({ currentRow, open, onOpenChange }: Props) {
  const isEdit = !!currentRow
  const { addKiosk, updateKiosk } = useKiosksStore()

  const form = useForm<KioskForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          kioskNm: currentRow.kioskNm,
          kioskTp: currentRow.kioskTp,
          position: currentRow.position,
          info: currentRow.info || '',
          status: currentRow.status,
          isEdit,
        }
      : {
          kioskNm: '',
          kioskTp: 'STANDARD',
          position: '',
          info: '',
          status: 'ACTIVE',
          isEdit,
        },
  })

  const onSubmit = async (values: KioskForm) => {
    try {
      if (isEdit && currentRow) {
        // 수정 모드
        await updateKiosk({
          ...currentRow,
          kioskNm: values.kioskNm,
          kioskTp: values.kioskTp,
          position: values.position,
          info: values.info,
          status: values.status,
        })
        toast.success('키오스크가 성공적으로 수정되었습니다.')
      } else {
        // 추가 모드
        await addKiosk({
          kioskNm: values.kioskNm,
          kioskTp: values.kioskTp,
          position: values.position,
          info: values.info,
          status: values.status,
        })
        toast.success('키오스크가 성공적으로 추가되었습니다.')
      }

      form.reset()
      onOpenChange(false)
    } catch (error) {
      toast.error(
        `키오스크 ${isEdit ? '수정' : '추가'} 중 오류가 발생했습니다.`
      )
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>
            {isEdit ? '키오스크 수정' : '새 키오스크 추가'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? '키오스크 정보를 수정합니다. '
              : '새 키오스크를 추가합니다. '}
            완료되면 저장 버튼을 클릭하세요.
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='kiosk-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='kioskNm'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      키오스크 이름
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='키오스크 이름을 입력하세요'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='kioskTp'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      키오스크 유형
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='유형을 선택하세요'
                      className='col-span-4'
                      items={kioskTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='position'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      설치 위치
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='설치 위치를 입력하세요'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='info'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      설명
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='키오스크에 대한 추가 설명을 입력하세요'
                        className='col-span-4'
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              {isEdit && (
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                      <FormLabel className='col-span-2 text-right'>
                        상태
                      </FormLabel>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='상태를 선택하세요'
                        className='col-span-4'
                        items={[
                          { label: '활성', value: 'ACTIVE' },
                          { label: '비활성', value: 'INACTIVE' },
                          { label: '정비중', value: 'MAINTENANCE' },
                        ]}
                      />
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
              )}
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => onOpenChange(false)}
            className='mr-2'
          >
            취소
          </Button>
          <Button type='submit' form='kiosk-form'>
            {isEdit ? '수정하기' : '추가하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
