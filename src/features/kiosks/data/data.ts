import { UserStatus } from './schema'

export const callTypes = new Map<UserStatus, string>([
  ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
  ['inactive', 'bg-neutral-300/40 border-neutral-300'],
  ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
  [
    'suspended',
    'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10',
  ],
])

export const kioskTypes = [
  { label: '표준형', value: 'STANDARD' },
  { label: '실외형', value: 'OUTDOOR' },
  { label: '벽부착형', value: 'WALL_MOUNT' },
  { label: '테이블형', value: 'TABLE' },
  { label: '드라이브스루', value: 'DRIVE_THRU' },
] as const
