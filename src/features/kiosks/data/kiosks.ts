import { Kiosk } from "./schema"
import { api } from "@/lib/api"

// 더미 데이터 생성 - 서버 데이터가 없을 때 폴백으로 사용
export const kiosks: Kiosk[] = [
  {
    id: "KS-001",
    name: "메인 로비 키오스크",
    serialNumber: "SN-12345678",
    location: "1층 로비",
    status: "active",
    type: "information",
    ipAddress: "192.168.1.101",
    lastConnectionDate: new Date("2025-04-30T09:32:14"),
    installationDate: new Date("2024-01-15"),
    model: "InfoTouch Pro X1",
    manufacturer: "TechKiosk Inc.",
    softwareVersion: "v3.2.1",
  },
  {
    id: "KS-002",
    name: "식당 주문 키오스크",
    serialNumber: "SN-87654321",
    location: "2층 식당",
    status: "active",
    type: "order",
    ipAddress: "192.168.1.102",
    lastConnectionDate: new Date("2025-04-30T10:15:22"),
    installationDate: new Date("2024-02-03"),
    model: "OrderMaster 3000",
    manufacturer: "FoodTech Systems",
    softwareVersion: "v2.1.5",
  },
  {
    id: "KS-003",
    name: "주차장 결제 키오스크",
    serialNumber: "SN-45678912",
    location: "지하 1층 주차장",
    status: "maintenance",
    type: "payment",
    ipAddress: "192.168.1.103",
    lastConnectionDate: new Date("2025-04-28T14:45:10"),
    installationDate: new Date("2023-11-20"),
    model: "PayPoint G2",
    manufacturer: "CashTech Solutions",
    softwareVersion: "v1.9.3",
  },
  {
    id: "KS-004",
    name: "영화관 발권 키오스크",
    serialNumber: "SN-78912345",
    location: "3층 영화관 입구",
    status: "active",
    type: "ticket",
    ipAddress: "192.168.1.104",
    lastConnectionDate: new Date("2025-04-30T08:22:30"),
    installationDate: new Date("2024-03-12"),
    model: "TicketPrint X5",
    manufacturer: "CinemaTech",
    softwareVersion: "v4.0.2",
  },
  {
    id: "KS-005",
    name: "호텔 체크인 키오스크",
    serialNumber: "SN-23456789",
    location: "호텔 로비",
    status: "offline",
    type: "check-in",
    ipAddress: "192.168.1.105",
    lastConnectionDate: new Date("2025-04-25T16:10:45"),
    installationDate: new Date("2023-12-08"),
    model: "CheckIn Express",
    manufacturer: "HotelTech Solutions",
    softwareVersion: "v2.3.7",
  },
  {
    id: "KS-006",
    name: "사무실 출입 키오스크",
    serialNumber: "SN-34567891",
    location: "사무실 입구",
    status: "active",
    type: "information",
    ipAddress: "192.168.1.106",
    lastConnectionDate: new Date("2025-04-30T07:55:18"),
    installationDate: new Date("2024-01-25"),
    model: "SecurePoint ID",
    manufacturer: "SecurityTech",
    softwareVersion: "v3.1.2",
  },
  {
    id: "KS-007",
    name: "매장 셀프 결제 키오스크",
    serialNumber: "SN-56789123",
    location: "4층 백화점",
    status: "inactive",
    type: "payment",
    ipAddress: "192.168.1.107",
    lastConnectionDate: new Date("2025-04-15T11:30:42"),
    installationDate: new Date("2023-09-30"),
    model: "RetailPay 2000",
    manufacturer: "ShopTech Systems",
    softwareVersion: "v2.5.8",
  },
  {
    id: "KS-008",
    name: "도서관 검색 키오스크",
    serialNumber: "SN-67891234",
    location: "도서관 중앙홀",
    status: "active",
    type: "information",
    ipAddress: "192.168.1.108",
    lastConnectionDate: new Date("2025-04-30T13:22:05"),
    installationDate: new Date("2024-02-18"),
    model: "InfoSearch Pro",
    manufacturer: "LibraryTech",
    softwareVersion: "v1.8.4",
  },
  {
    id: "KS-009",
    name: "병원 접수 키오스크",
    serialNumber: "SN-89123456",
    location: "병원 1층 로비",
    status: "active",
    type: "check-in",
    ipAddress: "192.168.1.109",
    lastConnectionDate: new Date("2025-04-30T08:45:12"),
    installationDate: new Date("2023-10-15"),
    model: "MediCheck Express",
    manufacturer: "HealthTech Solutions",
    softwareVersion: "v3.4.1",
  },
  {
    id: "KS-010",
    name: "공항 체크인 키오스크",
    serialNumber: "SN-91234567",
    location: "공항 출국장",
    status: "maintenance",
    type: "check-in",
    ipAddress: "192.168.1.110",
    lastConnectionDate: new Date("2025-04-27T09:10:33"),
    installationDate: new Date("2023-08-22"),
    model: "AirportExpress X3",
    manufacturer: "TravelTech Systems",
    softwareVersion: "v4.1.2",
  },
]

// 서버 API 호출 함수
export async function getKiosks(): Promise<Kiosk[]> {
  try {
    // 실제 API 호출로 변경
    const response = await api.get<Kiosk[]>("/api/kiosks")
    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching kiosks:", error)
    // API 호출 실패 시 로컬 더미 데이터 반환
    return kiosks
  }
}

// 필터링된 키오스크 데이터 가져오기
export async function getFilteredKiosks(
  startDate?: Date, 
  endDate?: Date, 
  status?: string, 
  type?: string,
  location?: string
): Promise<Kiosk[]> {
  try {
    // URL에 쿼리 파라미터 추가
    const params = new URLSearchParams()
    if (startDate) params.append("startDate", startDate.toISOString())
    if (endDate) params.append("endDate", endDate.toISOString())
    if (status) params.append("status", status)
    if (type) params.append("type", type)
    if (location) params.append("location", location)

    // 파라미터가 있으면 쿼리 스트링 추가
    const queryString = params.toString() ? `?${params.toString()}` : ""
    
    // API 호출
    const response = await api.get<Kiosk[]>(`/api/kiosks/filter${queryString}`)
    return response
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching filtered kiosks:", error)
    
    // API 호출 실패 시 로컬에서 필터링
    return kiosks.filter(kiosk => {
      // 날짜 필터링
      if (startDate && kiosk.installationDate < startDate) return false
      if (endDate && kiosk.installationDate > endDate) return false
      
      // 상태 필터링
      if (status && kiosk.status !== status) return false
      
      // 유형 필터링
      if (type && kiosk.type !== type) return false
      
      // 위치 필터링
      if (location && !kiosk.location.includes(location)) return false
      
      return true
    })
  }
}