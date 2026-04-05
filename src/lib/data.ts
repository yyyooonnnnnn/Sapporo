import { Trip, Schedule, Place, Flight, Accommodation } from "./types";

export const trip: Trip = {
  id: "trip-001",
  title: "홋카이도 가족여행",
  destination: "홋카이도, 일본",
  start_date: "2025-08-01",
  end_date: "2025-08-04",
  notes: "3박 4일 홋카이도 가족여행. 신치토세 공항 → 오타루 → 후라노 → 노보리베츠(타키모토칸) → 신치토세 공항",
};

export const places: Place[] = [
  {
    id: "place-001",
    trip_id: "trip-001",
    name: "신치토세 공항 렌트카 카운터",
    address: "신치토세 공항, 홋카이도",
    lat: 42.7752,
    lng: 141.6923,
    category: "이동",
    notes: "렌트카 사전예약 필수 (알파드/노아 미니밴 5인). 국제운전면허증 필수. ETC카드 함께 렌트.",
  },
  {
    id: "place-002",
    trip_id: "trip-001",
    name: "오타루 운하 (小樽運河)",
    address: "Otaru, Hokkaido 047-0007",
    lat: 43.1977,
    lng: 140.9945,
    category: "관광",
    rating: 4.5,
    notes: "운하 산책 가스등·창고 거리 구경. 평탄한 길.",
    opening_hours: ["24시간 개방"],
  },
  {
    id: "place-003",
    trip_id: "trip-001",
    name: "오타루 운하 크루즈",
    address: "Otaru, Hokkaido 047-0007",
    lat: 43.1980,
    lng: 140.9940,
    category: "체험",
    notes: "유람선 탑승 약 40분. 영어 오디오 가이드. 당일 현장구매 가능 1,800엔/인.",
  },
  {
    id: "place-004",
    trip_id: "trip-001",
    name: "니조 시장 (二条市場)",
    address: "Minami 3 Jonishi, Chuo Ward, Sapporo, Hokkaido 060-0063",
    lat: 43.0589,
    lng: 141.3561,
    category: "식당",
    rating: 4.3,
    notes: "해산물 저녁, 성게·연어알·대게. 시장은 저녁 5시까지, 근처 식당 이용.",
    opening_hours: ["매일 07:00 - 18:00"],
  },
  {
    id: "place-005",
    trip_id: "trip-001",
    name: "팜 토미타 (ファーム富田)",
    address: "Nakafurano, Sorachi District, Hokkaido",
    lat: 43.3536,
    lng: 142.3820,
    category: "관광",
    rating: 4.7,
    notes: "라벤더 농원 산책. 7월 중~하순 절정. 라벤더 소프트아이스크림. 무료 입장, 넓은 꽃밭 천천히 산책.",
    opening_hours: ["매일 09:00 - 17:00"],
  },
  {
    id: "place-006",
    trip_id: "trip-001",
    name: "나카후라노 호쿠세이산 (中富良野北星山)",
    address: "Nakafurano, Sorachi District, Hokkaido",
    lat: 43.3609,
    lng: 142.3920,
    category: "관광",
    notes: "라벤더 언덕 전망. 리프트 탑승 700엔. 정상에서 다이세츠잔 조망. 리프트 타면 어르신 편하게 정상 이동 가능.",
  },
  {
    id: "place-007",
    trip_id: "trip-001",
    name: "시로가네 아오이케/청의 호수 (白金青い池)",
    address: "Shirogane, Biei-cho, Kamikawa District, Hokkaido",
    lat: 43.3875,
    lng: 142.6002,
    category: "관광",
    rating: 4.6,
    notes: "에메랄드빛 신비 호수. 고사목 포토스팟. 파란 소프트아이스크림.",
  },
  {
    id: "place-008",
    trip_id: "trip-001",
    name: "노보리베츠 지고쿠다니/지옥계곡 (登別地獄谷)",
    address: "Noboribetsu Onsencho, Noboribetsu, Hokkaido",
    lat: 42.4955,
    lng: 141.1520,
    category: "관광",
    rating: 4.5,
    notes: "유황 연기 화산 지형 산책. 정비된 산책로 30~40분 소요. 타키모토칸에서 도보 5분.",
    opening_hours: ["24시간 개방"],
  },
  {
    id: "place-009",
    trip_id: "trip-001",
    name: "제일 타키모토칸 (第一滝本館)",
    address: "55 Noboribetsu Onsencho, Noboribetsu, Hokkaido",
    lat: 42.4933,
    lng: 141.1540,
    category: "온천",
    rating: 4.4,
    notes: "프리미엄 본관 특별실 78㎡ 5인. 가족탕 온천. 객실 내 가이세키 요리.",
    website: "https://www.takimotokan.co.jp",
  },
];

export const schedules: Schedule[] = [
  // Day 1 - 신치토세 → 오타루 → 삿포로
  {
    id: "sch-001",
    trip_id: "trip-001",
    day_number: 1,
    order: 1,
    time: "09:20",
    title: "인천공항 출발",
    description: "이스타항공 ZE625. 인천공항 출발. 2시간 전 도착 권장.",
    category: "이동",
  },
  {
    id: "sch-002",
    trip_id: "trip-001",
    day_number: 1,
    order: 2,
    time: "11:50",
    title: "신치토세 공항 도착 & 렌트카 픽업",
    description: "공항 카운터 → 셔틀버스 이동. 알파드/노아 미니밴 5인. 국제운전면허증 필수, ETC카드 함께 렌트.",
    category: "이동",
    place_id: "place-001",
  },
  {
    id: "sch-003",
    trip_id: "trip-001",
    day_number: 1,
    order: 3,
    time: "13:00",
    title: "오타루 운하",
    description: "운하 산책, 가스등·창고 거리 구경. 평탄한 길. (공항→오타루 약 1시간 20분)",
    category: "관광",
    place_id: "place-002",
  },
  {
    id: "sch-004",
    trip_id: "trip-001",
    day_number: 1,
    order: 4,
    time: "15:00",
    title: "오타루 운하 크루즈",
    description: "유람선 탑승 (약 40분). 영어 오디오 가이드 제공. 당일 현장구매 가능 1,800엔/인.",
    category: "체험",
    place_id: "place-003",
  },
  {
    id: "sch-005",
    trip_id: "trip-001",
    day_number: 1,
    order: 5,
    time: "18:00",
    title: "삿포로 이동 후 저녁",
    description: "니조 시장 해산물 저녁. 성게·연어알·대게. 시장은 저녁 5시까지, 근처 식당 이용. (오타루→삿포로 약 40분)",
    category: "식당",
    place_id: "place-004",
  },
  {
    id: "sch-006",
    trip_id: "trip-001",
    day_number: 1,
    order: 6,
    time: "20:00",
    title: "호텔 체크인",
    description: "Sapporo Hotel by Granbell 체크인.",
    category: "숙소",
  },

  // Day 2 - 삿포로 → 후라노 → 청의 호수
  {
    id: "sch-007",
    trip_id: "trip-001",
    day_number: 2,
    order: 1,
    time: "10:00",
    title: "팜 토미타",
    description: "라벤더 농원 산책. 7월 중~하순 절정. 라벤더 소프트아이스크림. 무료 입장, 넓은 꽃밭 천천히 산책. (삿포로→후라노 약 2시간)",
    category: "관광",
    place_id: "place-005",
  },
  {
    id: "sch-008",
    trip_id: "trip-001",
    day_number: 2,
    order: 2,
    time: "12:00",
    title: "나카후라노 호쿠세이산",
    description: "라벤더 언덕 전망. 리프트 탑승 (700엔). 정상에서 다이세츠잔 조망. 리프트 타면 어르신 편하게 정상 이동 가능.",
    category: "관광",
    place_id: "place-006",
  },
  {
    id: "sch-009",
    trip_id: "trip-001",
    day_number: 2,
    order: 3,
    time: "15:00",
    title: "시로가네 아오이케 (청의 호수)",
    description: "에메랄드빛 신비 호수. 고사목 포토스팟. 파란 소프트아이스크림. (후라노→청의호수 약 40분)",
    category: "관광",
    place_id: "place-007",
  },
  {
    id: "sch-010",
    trip_id: "trip-001",
    day_number: 2,
    order: 4,
    time: "17:00",
    title: "후라노 숙소 체크인",
    description: "La Vista Furano Hills 체크인. 천연 온천 즐기기. (청의호수→후라노 약 40분 복귀)",
    category: "숙소",
  },

  // Day 3 - 후라노 → 삿포로 경유 → 노보리베츠
  {
    id: "sch-011",
    trip_id: "trip-001",
    day_number: 3,
    order: 1,
    time: "09:00",
    title: "후라노 출발, 삿포로 경유",
    description: "삿포로에서 점심 (해산물 또는 라멘). (후라노→삿포로 약 2시간, 삿포로→노보리베츠 약 1시간 10분)",
    category: "이동",
  },
  {
    id: "sch-012",
    trip_id: "trip-001",
    day_number: 3,
    order: 2,
    time: "14:00",
    title: "노보리베츠 지고쿠다니 (지옥계곡)",
    description: "유황 연기 화산 지형 산책. 정비된 산책로. 30~40분 소요. 타키모토칸에서 도보 5분 거리.",
    category: "관광",
    place_id: "place-008",
  },
  {
    id: "sch-013",
    trip_id: "trip-001",
    day_number: 3,
    order: 3,
    time: "15:00",
    title: "제일 타키모토칸 체크인",
    description: "프리미엄 본관 특별실 (78㎡, 5인). 가족탕 온천. 객실 내 가이세키 요리.",
    category: "온천",
    place_id: "place-009",
  },

  // Day 4 - 노보리베츠 → 신치토세 → 귀국
  {
    id: "sch-014",
    trip_id: "trip-001",
    day_number: 4,
    order: 1,
    time: "09:00",
    title: "타키모토칸 체크아웃",
    description: "아침 온천 마지막으로. 조식 후 체크아웃. 체크아웃 전 아침 온천 한 번 더!",
    category: "온천",
  },
  {
    id: "sch-015",
    trip_id: "trip-001",
    day_number: 4,
    order: 2,
    time: "11:00",
    title: "신치토세 공항",
    description: "렌트카 반납 (공항 근처 셔틀 이용). 기념품 쇼핑 후 여유롭게 귀국. (노보리베츠→공항 약 1시간 10분)",
    category: "이동",
  },
  {
    id: "sch-016",
    trip_id: "trip-001",
    day_number: 4,
    order: 3,
    time: "17:50",
    title: "신치토세 공항 출발",
    description: "이스타항공 ZE624. 귀국!",
    category: "이동",
  },
  {
    id: "sch-017",
    trip_id: "trip-001",
    day_number: 4,
    order: 4,
    time: "20:50",
    title: "인천공항 도착",
    description: "무사히 귀국! 수고하셨습니다 🎉",
    category: "이동",
  },
];

export const flights: Flight[] = [
  {
    id: "flight-001",
    trip_id: "trip-001",
    type: "departure",
    airline: "이스타항공",
    flight_number: "ZE625",
    departure_time: "2025-08-01T09:20:00",
    arrival_time: "2025-08-01T11:50:00",
    departure_airport: "인천국제공항",
    departure_airport_code: "ICN",
    arrival_airport: "신치토세공항",
    arrival_airport_code: "CTS",
    airline_url: "https://www.eastarjet.com",
  },
  {
    id: "flight-002",
    trip_id: "trip-001",
    type: "arrival",
    airline: "이스타항공",
    flight_number: "ZE624",
    departure_time: "2025-08-04T17:50:00",
    arrival_time: "2025-08-04T20:50:00",
    departure_airport: "신치토세공항",
    departure_airport_code: "CTS",
    arrival_airport: "인천국제공항",
    arrival_airport_code: "ICN",
    airline_url: "https://www.eastarjet.com",
  },
];

export const accommodations: Accommodation[] = [
  {
    id: "acc-001",
    trip_id: "trip-001",
    day_number: 1,
    name: "Sapporo Hotel by Granbell",
    address: "1 Chome-9 Kita 2 Jonishi, Chuo Ward, Sapporo",
    lat: 43.0627,
    lng: 141.3497,
    check_in: "2025-08-01T15:00:00",
    check_out: "2025-08-02T11:00:00",
  },
  {
    id: "acc-002",
    trip_id: "trip-001",
    day_number: 2,
    name: "La Vista Furano Hills Natural Hot Spring",
    address: "Nakamachi, Furano, Hokkaido",
    lat: 43.3420,
    lng: 142.3830,
    check_in: "2025-08-02T15:00:00",
    check_out: "2025-08-03T11:00:00",
    notes: "천연 온천 포함. 성수기 조기마감 주의, 사전예약 필수",
  },
  {
    id: "acc-003",
    trip_id: "trip-001",
    day_number: 3,
    name: "Noboribetsu Onsen Dai-ichi Takimotokan (第一滝本館)",
    address: "55 Noboribetsu Onsencho, Noboribetsu, Hokkaido",
    lat: 42.4933,
    lng: 141.1540,
    check_in: "2025-08-03T15:00:00",
    check_out: "2025-08-04T10:00:00",
    notes: "프리미엄 본관 특별실 (78㎡, 5인). 가족탕 온천. 저녁 가이세키 요리 + 조식 포함. 타투→가족탕 이용. 성수기 조기마감 주의, 지금 바로 예약!",
  },
];

export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getSchedulesByDay(dayNumber: number): Schedule[] {
  return schedules
    .filter((s) => s.day_number === dayNumber)
    .sort((a, b) => a.order - b.order);
}

export function getRestaurants(): Place[] {
  return places.filter((p) =>
    ["식당", "카페", "디저트"].includes(p.category)
  );
}

export function getDayDate(dayNumber: number): Date {
  const start = new Date(trip.start_date);
  const date = new Date(start);
  date.setDate(start.getDate() + dayNumber - 1);
  return date;
}

export function getAccommodationByDay(dayNumber: number): Accommodation | undefined {
  return accommodations.find((a) => a.day_number === dayNumber);
}
