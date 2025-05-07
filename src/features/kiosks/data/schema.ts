import { z } from "zod"

// 키오스크 상태 enum
export const kioskStatusEnum = z.enum([
  "active", 
  "inactive", 
  "maintenance", 
  "offline"
])

// 키오스크 타입 enum
export const kioskTypeEnum = z.enum([
  "payment",
  "information",
  "order",
  "ticket",
  "check-in"
])

// 키오스크 스키마 정의
export const __kioskSchema = z.object({
  id: z.string(),
  name: z.string(),
  serialNumber: z.string(),
  location: z.string(),
  status: kioskStatusEnum,
  type: kioskTypeEnum,
  ipAddress: z.string().optional(),
  lastConnectionDate: z.date(),
  installationDate: z.date(),
  model: z.string(),
  manufacturer: z.string(),
  softwareVersion: z.string().optional(),
})

export const kioskSchema = z.object({
  kioskId: z.string(),
  kioskNm: z.string(),
  kioskTp: z.string(),
  status: kioskStatusEnum,
  modDt: z.string().nullable(),
  modUserId: z.string().nullable(),
  position: z.string(),
  regDt: z.string(),
  regUserId: z.string(),
})

// 키오스크 타입 추출
export type Kiosk = z.infer<typeof kioskSchema>

export const kioskListSchema = z.array(kioskSchema)

// 필터 스키마 정의
export const filterSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: kioskStatusEnum.optional(),
  type: kioskTypeEnum.optional(),
  location: z.string().optional(),
})

export type KioskFilter = z.infer<typeof filterSchema>

export type KiosksDialogType = 'create' | 'update' | 'delete' | null

// 정렬 및 필터링 매개변수용 타입 정의
export type KioskParams = {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: string;
  type?: string;
  location?: string;
  search?: string;
  startDate?: Date;
  endDate?: Date;
  keyword?: string;
  kioskTp?: string;
};

// 서버 응답 타입
export type KioskResponse = {
  data: Kiosk[];
  totalCount: number;
  pageCount: number;
};
