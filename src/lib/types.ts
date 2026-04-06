export interface Trip {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  cover_image?: string;
  notes?: string;
}

export interface Schedule {
  id: string;
  trip_id: string;
  day_number: number;
  order: number;
  time: string;
  title: string;
  description: string;
  category: "식당" | "카페" | "관광" | "쇼핑" | "이동" | "디저트" | "체험" | "온천" | "숙소";
  place_id?: string;
  youtube_urls?: string[];
}

export interface Place {
  id: string;
  trip_id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  google_place_id?: string;
  category: "식당" | "카페" | "관광" | "쇼핑" | "디저트" | "체험" | "온천" | "숙소" | "이동";
  rating?: number;
  price_level?: number;
  main_menu?: string[];
  photos?: string[];
  location_tags?: string[];
  key_reviews?: string[];
  recommendation_reason?: string;
  notes?: string;
  phone?: string;
  website?: string;
  opening_hours?: string[];
  reference_links?: { label: string; url: string; type: "youtube" | "blog" | "naver" }[];
}

export interface Flight {
  id: string;
  trip_id: string;
  type: "departure" | "arrival";
  airline: string;
  flight_number: string;
  departure_time: string;
  arrival_time: string;
  departure_airport: string;
  departure_airport_code: string;
  arrival_airport: string;
  arrival_airport_code: string;
  terminal?: string;
  airline_url?: string;
  booking_reference?: string;
}

export interface Accommodation {
  id: string;
  trip_id: string;
  day_number: number;
  name: string;
  address: string;
  lat: number;
  lng: number;
  check_in: string;
  check_out: string;
  booking_url?: string;
  notes?: string;
  phone?: string;
  nearby_facilities?: string[];
}

export type DayOfWeek = "월요일" | "화요일" | "수요일" | "목요일" | "금요일" | "토요일" | "일요일";

export interface OpeningStatus {
  isOpen: boolean;
  isClosed: boolean;
  statusText: string;
}

export interface ScheduleDay {
  day: number;
  label: string;
  date: string;
  dayOfWeek: DayOfWeek;
  locations: string[];
}
