import { createFileRoute } from '@tanstack/react-router'
import Kiosks from '@/features/kiosks'

export const Route = createFileRoute('/_authenticated/kiosks/')({
  component: Kiosks,
})
