# 홋카이도 가족 여행 웹앱 소프트웨어 요구사항 명세서 (SRS)

**문서 버전:** 1.0.0
**작성일:** 2025년 4월
**제품명:** Sapporo (삿포로 가족여행 가이드)
**타겟 대상:** 5인 가족 (부모님 60대, 자녀 3인 30대)

---

## 목차

1. [시스템 개요](#1-시스템-개요)
2. [기능 요구사항](#2-기능-요구사항)
3. [비기능 요구사항](#3-비기능-요구사항)
4. [데이터 모델](#4-데이터-모델)
5. [시스템 아키텍처](#5-시스템-아키텍처)
6. [페이지 구조](#6-페이지-구조)
7. [외부 API 연동](#7-외부-api-연동)
8. [보안 요구사항](#8-보안-요구사항)
9. [성능 요구사항](#9-성능-요구사항)
10. [테스트 요구사항](#10-테스트-요구사항)

---

## 1. 시스템 개요

### 1.1 제품 정의

**Sapporo**는 한국인 가족 5명(부모님 60대, 자녀 3인 30대)의 홋카이도 3박 4일 여행을 위한 통합 웹 애플리케이션입니다.

| 항목 | 내용 |
|------|------|
| 제품명 | Sapporo (삿포로 가족여행 가이드) |
| 여행 지역 | 홋카이도, 일본 (신치토세 → 오타루 → 후라노 → 노보리베츠) |
| 여행 기간 | 3박 4일 (2025년 8월 1일 ~ 4일) |
| 사용자 규모 | 5명 (가족 전용, 비공개) |
| 접근 방식 | 공유 URL 기반 (PIN 보호 옵션) |
| 배포 플랫폼 | Vercel |

### 1.2 목표

1. **부모님 사용성**: "오늘 뭐 하지?" 를 한눈에 확인할 수 있도록 오늘 날짜 자동 하이라이트
2. **정보 통합**: 흩어진 여행 정보(항공편, 숙소, 맛집, 일정)를 한곳에서 관리
3. **모바일 최적화**: 주로 스마트폰 사용을 고려한 반응형 웹앱 (큰 글씨 모드 포함)
4. **오프라인 지원**: 해외 인터넷 불안정성을 고려한 PWA 기반 오프라인 캐싱
5. **편의 기능**: Google Maps, YouTube 영상 자동 검색으로 부모님이 장소를 미리 파악할 수 있도록 지원

### 1.3 사용자 페르소나

#### 페르소나 A: 부모님 (60대) - 뷰어
- 주요 행동: 카카오톡, 유튜브 주로 사용
- 핵심 수요: "오늘 어디 가? 뭐 먹어?"
- UI 선호: 큰 글씨, 심플한 디자인, 명확한 카테고리
- 콘텐츠 선호: 유튜브 영상, 사진, 지도

#### 페르소나 B: 자녀들 (30대) - 관리자
- 주요 행동: 여행 준비 및 진행 중 정보 입력/수정/삭제
- 핵심 수요: 분산된 여행 정보 통합 관리, 장소 상세 정보 자동 수집
- 역할: 관리자 페이지에서 CRUD 작업 담당
- 콘텐츠: 플래이리스트, 추천사유, 장소 상세정보 입력

---

## 2. 기능 요구사항

### FR-001: 일정 대시보드 (메인 화면)

**설명:** 여행 기간(Day 1 ~ Day 4)별로 일정을 한눈에 확인할 수 있는 대시보드

**상세 기능:**
- Day 1~4를 탭 또는 카드 형태로 표시
- **현재 날짜(오늘)를 자동으로 하이라이트** - 부모님이 "오늘" 를 쉽게 찾을 수 있음
- 각 일정 항목 표시:
  - 시간 (HH:MM 형식)
  - 장소명
  - 간단 설명 (1~2줄)
  - 카테고리 아이콘 (식당, 관광, 이동, 쇼핑, 카페, 디저트, 체험, 온천, 숙소)
- 장소명 클릭 시 장소 상세 페이지로 이동

**관련 데이터:**
- Schedule 인터페이스의 day_number, time, title, description, category
- Trip 인터페이스의 start_date (오늘 자동 계산)

**사용자:** 부모님, 자녀들

---

### FR-002: 장소 상세 페이지

**설명:** 선택된 장소의 상세 정보를 지도, 영상, 이동 시간과 함께 제공

**상세 기능:**
- Google Maps 임베드 (위치 표시)
- 장소 기본 정보:
  - 이름
  - 주소
  - 전화번호 (클릭 시 전화 앱 연동)
  - 웹사이트 링크
  - 영업시간
  - 평점 및 리뷰 요약
- **관련 YouTube 영상**: 한글 기반 자동 검색 또는 수동 입력
  - 영상 링크 클릭 시 YouTube 또는 앱에서 열기
- **이동 시간 정보**:
  - 이전 일정으로부터의 예상 이동 시간 (자차 기준)
  - 다음 일정으로의 예상 이동 시간 (자차 기준)
- "길찾기" 버튼: Google Maps 앱으로 길안내 시작
- 카테고리별 추가 정보:
  - 식당/카페: 주요 메뉴, 사진, 가격대
  - 관광지: 설명, 입장료, 소요 시간
  - 온천: 특징, 부대시설, 온천 종류

**관련 데이터:**
- Place 인터페이스 (id, name, address, lat, lng, rating, notes, phone, website, opening_hours, photos, main_menu, key_reviews)
- Schedule 인터페이스의 youtube_urls

**사용자:** 부모님, 자녀들

---

### FR-003: 항공편 정보

**설명:** 출발 및 도착 항공편 정보를 카드 형태로 제공

**상세 기능:**
- 편명, 항공사, 출발/도착 시간, 공항, 터미널 표시
- **항공사 앱/웹 바로가기 링크**: 게이트 정보 조회, 체크인 상황 확인
- 공항 체크리스트:
  - 여권, 항공권, 항공사 앱 설치 확인
  - 국제운전면허증, 국제신용카드
  - 해외 와이파이/유심 준비
  - 환전 여부
  - 짐 사이즈 확인
- 예상 이동 시간: 출발지 → 공항, 공항 → 첫 숙소

**관련 데이터:**
- Flight 인터페이스 (flight_number, airline, departure_time, arrival_time, departure_airport, arrival_airport, terminal, airline_url, booking_reference)

**사용자:** 부모님, 자녀들

---

### FR-004: 맛집/카페 가이드

**설명:** 여행 일정에 포함된 모든 맛집과 카페를 지도 및 목록으로 제공

**상세 기능:**

#### 지도 뷰 (Map View)
- Google Maps 기반으로 모든 맛집/카페 마커 표시
- 마커 클릭 시 가게명, 평점, 사진 미리보기 표시
- 일정별/카테고리별 필터링 가능
- 동선 최적화 라인 표시 (선택사항)

#### 목록 뷰 (List View)
- 카드 형태로 맛집/카페 정보 표시:
  - 가게명 및 카테고리 아이콘
  - 사진 (3장까지)
  - 평점 (Google Places 기반, 0~5점)
  - 가격대 ($ ~ $$$$)
  - 주요 메뉴 (텍스트 및 사진)
  - 주요 리뷰 1~2개 발췌
  - **추천 사유** (자녀가 직접 작성한 한국어 설명)
  - 영업시간, 위치, 전화번호

#### 필터 및 정렬
- 카테고리 필터: 식당 / 카페 / 디저트 / 기타
- 일정별 필터: Day 1, 2, 3, 4
- 평점순 정렬 (높음 → 낮음)
- 가격대순 정렬 (저가 → 고가)

#### 뷰 전환
- 지도 뷰 ↔ 목록 뷰 토글 버튼 (상단)

**관련 데이터:**
- Place 인터페이스 (category = "식당", "카페", "디저트", rating, price_level, main_menu, photos, key_reviews, recommendation_reason)

**사용자:** 부모님, 자녀들

---

### FR-005: 숙소 정보

**설명:** 여행 기간 동안 묵게 될 숙소들의 정보를 제공

**상세 기능:**
- 숙소별 정보:
  - 이름, 주소, 체크인/체크아웃 시간
  - Google Maps 임베드 (위치 확인)
  - 전화번호, 웹사이트
  - 특별 시설 (온천, 수영장, 피트니스 등)
  - 예약 확인 링크
- 주변 편의시설 안내:
  - 편의점 거리
  - 약국 위치
  - 레스토랑/카페 근처 시설
  - 대중교통 접근성
- Day별 숙소 표시 (Day 1: 삿포로, Day 2: 후라노, Day 3: 노보리베츠)

**관련 데이터:**
- Accommodation 인터페이스 (name, address, lat, lng, check_in, check_out, notes, phone, website, nearby_facilities)

**사용자:** 부모님, 자녀들

---

### FR-006: 큰 글씨 모드 (Large Font Toggle)

**설명:** 부모님 사용성을 고려한 글씨 크기 조절 기능

**상세 기능:**
- 토글 버튼으로 기본 모드 ↔ 큰 글씨 모드 전환
- 큰 글씨 모드에서:
  - 본문: 16px (기본 14px) → 18px
  - 제목: 24px (기본 20px) → 28px
  - 탭/버튼 높이 증가 (클릭 쉽도록)
  - 아이콘 크기 증가
- LocalStorage에 사용자 선택 저장 (지속성)
- 모든 페이지에 적용

**사용자:** 부모님

---

### FR-007: 관리자 페이지 - 인증

**설명:** 관리자 권한 확인을 위한 간단한 PIN 기반 인증

**상세 기능:**
- PIN 입력 폼 (4~6자리 숫자)
- 잘못된 PIN 3회 입력 시 5분 잠금
- PIN 확인 후 세션 토큰 생성 (7일 유효)
- 로그아웃 기능

**보안:** PIN은 Supabase에 해시된 형태로 저장

**사용자:** 자녀들

---

### FR-008: 관리자 페이지 - 일정 CRUD

**설명:** 여행 일정을 생성, 읽기, 수정, 삭제하는 관리 인터페이스

**상세 기능:**

#### 생성 (Create)
- 폼 입력:
  - Day (1~4 선택)
  - 시간 (HH:MM)
  - 제목
  - 설명
  - 카테고리 (식당 / 관광 / 이동 / 쇼핑 / 카페 / 디저트 / 체험 / 온천 / 숙소)
  - 장소 선택 (드롭다운, 기존 Place 또는 새로 생성)
  - YouTube 링크 (여러 개 가능)
- 저장 시 Supabase에 저장

#### 읽기 (Read)
- Day별 일정 목록 표시
- 각 항목: 시간, 제목, 설명, 카테고리 표시

#### 수정 (Update)
- 항목 클릭 후 폼으로 수정
- 저장 시 Supabase에 업데이트

#### 삭제 (Delete)
- 항목별 삭제 버튼
- 삭제 전 확인 팝업

**관련 데이터:**
- Schedule 인터페이스 (day_number, order, time, title, description, category, place_id, youtube_urls)

**사용자:** 자녀들

---

### FR-009: 관리자 페이지 - 장소 CRUD

**설명:** 맛집, 카페, 관광지 등 장소 정보를 관리하는 인터페이스

**상세 기능:**

#### 생성 (Create)
- 폼 입력:
  - 이름
  - 카테고리 (식당 / 카페 / 관광 / 쇼핑 / 디저트 / 체험 / 온천 / 숙소 / 이동)
  - 주소
  - 위도/경도 (Google Maps에서 자동 입력 또는 수동)
  - 평점
  - 가격대
  - 메인 메뉴
  - 사진 URL (여러 개)
  - 주요 리뷰
  - **추천 사유** (한국어 텍스트)
  - 전화번호, 웹사이트
  - 영업시간

#### Google Places API 연동
- Google Place ID 입력 시 자동으로 데이터 채우기:
  - 평점, 리뷰, 사진, 전화번호, 웹사이트, 영업시간 자동 수집

#### 읽기 (Read)
- 전체 장소 목록 표시 (표 형식)
- 검색 기능 (이름, 카테고리 기반)
- 페이지네이션

#### 수정 (Update)
- 항목 클릭 후 폼으로 수정
- 이미지 재업로드 가능

#### 삭제 (Delete)
- 장소 삭제 전 해당 장소를 참조하는 일정 확인 후 알림

**관련 데이터:**
- Place 인터페이스 (모든 필드)

**사용자:** 자녀들

---

### FR-010: 관리자 페이지 - 항공편 관리

**설명:** 출발 및 도착 항공편 정보를 관리하는 인터페이스

**상세 기능:**

#### 생성/수정
- 폼 입력:
  - 편명 (예: ZE625)
  - 항공사 (예: 이스타항공)
  - 출발 시간 (날짜 + 시간)
  - 도착 시간 (날짜 + 시간)
  - 출발지 공항 (예: 인천국제공항)
  - 목적지 공항 (예: 신치토세공항)
  - 터미널
  - 항공사 웹사이트 링크
  - 예약 번호 (선택)
- 저장

#### 삭제
- 항공편 항목 삭제

**관련 데이터:**
- Flight 인터페이스 (flight_number, airline, departure_time, arrival_time, departure_airport, arrival_airport, terminal, airline_url, booking_reference)

**사용자:** 자녀들

---

### FR-011: 관리자 페이지 - 숙소 관리

**설명:** 여행 기간 숙소 정보를 관리하는 인터페이스

**상세 기능:**

#### 생성/수정
- 폼 입력:
  - 숙소명
  - 주소
  - 위도/경도
  - 체크인 시간
  - 체크아웃 시간
  - 웹사이트/예약 링크
  - 특별 시설 (온천, 수영장 등)
  - 주변 편의시설 목록
  - 특별 노트 (조식 포함 여부, 가족탕 등)

#### 삭제
- 숙소 항목 삭제

**관련 데이터:**
- Accommodation 인터페이스 (name, address, lat, lng, check_in, check_out, booking_url, notes, phone, nearby_facilities)

**사용자:** 자녀들

---

### FR-012: Google Maps Directions API 연동

**설명:** 일정 간 예상 이동 시간을 자동으로 계산 및 표시

**상세 기능:**
- 현재 위치 → 다음 위치 간 이동 시간 계산 (자차 기준)
- 장소 상세 페이지에 "이전 일정: X분", "다음 일정: Y분" 표시
- 교통 상황을 고려한 예상 도착 시간 (선택사항)
- 실패 시 예상 시간 표시 (예: "약 1시간")

**관련 API:**
- Google Maps Directions API

**사용자:** 부모님, 자녀들

---

### FR-013: YouTube 영상 자동 검색

**설명:** 장소와 관련된 한글 YouTube 영상을 자동으로 검색 및 제안

**상세 기능:**
- 관리자가 장소 생성 시 YouTube 링크 수동 입력 가능
- YouTube Data API v3를 통한 자동 검색 (선택사항):
  - 검색어: "[장소명] 홋카이도" 또는 "[장소명] 일본"
  - 한글 자막 또는 한국인 유튜버 채널 우선 순위
- 상위 5개 결과 제시 후 선택

**관련 API:**
- YouTube Data API v3

**사용자:** 자녀들

---

---

## 3. 비기능 요구사항

### NFR-001: 모바일 퍼스트 디자인

**설명:** 주로 스마트폰(iOS, Android)에서 사용되도록 최적화

**요구사항:**
- 기본 뷰포트: 375px (iPhone SE)부터 설계
- 터치 대상 최소 크기: 44x44px (Apple HIG)
- 반응형 레이아웃: 375px, 768px, 1024px 이상 3개 브레이크포인트
- 실제 모바일 기기에서 테스트 (iOS Safari, Chrome)

**검증 방법:**
- Chrome DevTools 모바일 모드 확인
- 실제 iPhone/Android에서 동작 확인
- Lighthouse Mobile 점수 85점 이상

---

### NFR-002: 오프라인 지원 (PWA)

**설명:** 해외 인터넷 불안정성을 고려하여 기본 일정은 오프라인에서도 조회 가능

**요구사항:**
- **next-pwa** 라이브러리 적용
- 서비스 워커 등록 및 캐시 전략:
  - 정적 파일 (HTML, CSS, JS): Cache First (30일)
  - API 응답 (일정, 장소): Stale-While-Revalidate (7일)
  - Google Maps, YouTube: 임베드 링크만 제공 (오프라인에서 로드 불가)
- 오프라인 상태 표시: 상단 배너 "오프라인 모드"
- 오프라인에서 수정 불가 (읽기 전용)
- 온라인 복귀 시 자동 동기화

**설치 프롬프트:**
- Android: "앱 설치" 배너 표시
- iOS: 매뉴얼 홈 화면 추가 안내

**검증 방법:**
- DevTools Network 탭에서 "Offline" 시뮬레이션
- Lighthouse PWA 체크리스트 기준 90점 이상

---

### NFR-003: 성능 및 로딩 시간

**설명:** 해외 네트워크 환경에서도 빠른 로딩을 보장

**요구사항:**
- First Contentful Paint (FCP): **1.5초 이내**
- Largest Contentful Paint (LCP): **2.5초 이내**
- Cumulative Layout Shift (CLS): **0.1 이하**
- 초기 JS 번들 크기: **200KB 이하** (gzip)
- 이미지 최적화:
  - WebP 포맷 제공 (JPEG 폴백)
  - Lazy loading (Intersection Observer)
  - 썸네일: 300x300px, 본문: 800x600px 최대

**기술:**
- Next.js Image Component 사용 (자동 최적화)
- Code splitting (동적 import)
- CSS 최소화 (Tailwind purge)
- Font 최적화 (system font 우선, 필요시 Preload)

**검증 방법:**
- Lighthouse Performance 점수 85점 이상
- Google PageSpeed Insights 모바일 점수 80점 이상
- Network Throttling (Fast 3G) 에서 재확인

---

### NFR-004: 보안 및 데이터 보호

**설명:** 가족 전용 데이터의 무단 접근 방지

**요구사항:**
- PIN 기반 관리자 인증 (FR-007)
- HTTPS만 사용 (Vercel 기본 제공)
- 개인정보 (이름, 주소, 연락처):
  - Supabase Row Level Security (RLS) 활성화
  - 비밀번호 해싱: bcrypt (10 라운드 이상)
- API 키 보호:
  - 환경 변수 (.env.local)에 저장
  - GitHub, Vercel에 secrets 등록
  - 클라이언트 측에서 API 키 노출 금지
- CORS: 신뢰할 수 있는 도메인만 허용

**특별 주의:**
- 여행 공유 URL은 예측 불가능한 ID 사용 (UUID v4)
- PIN은 Trip 별로 독립 관리

---

### NFR-005: 접근성 (Accessibility)

**설명:** 시각 및 청각 장애인을 포함한 모든 사용자가 사용 가능하도록 설계

**요구사항:**
- WCAG 2.1 Level AA 준수:
  - Semantic HTML (heading, nav, main, article 등)
  - ARIA 라벨 및 역할 정의
  - 색상 대비: 4.5:1 이상 (일반 텍스트)
  - 키보드 네비게이션 지원 (Tab 순서 논리적)
  - 포커스 표시 (outline, border-color 등)
- 이미지 alt 텍스트 필수
- 비디오 자막 (YouTube 자막 활용)
- 모바일 VoiceOver / TalkBack 테스트

**검증 방법:**
- axe DevTools 확장 프로그램 검사
- Lighthouse Accessibility 점수 90점 이상

---

### NFR-006: 브라우저 호환성

**설명:** 주요 최신 브라우저에서 호환성 보장

**지원 범위:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Samsung Internet 14+

**폴리필:**
- `@babel/polyfill` (필요 시)
- `intersection-observer` (IE11 대응, 선택사항)

**테스트:**
- BrowserStack 또는 실제 기기에서 테스트

---

### NFR-007: 다국어 지원 (v2 이상 로드맵)

**설명:** 현재 v1은 한국어만 지원, v2에서 영어/일본어 추가 예정

**v1 범위:**
- 모든 UI 텍스트는 한국어로 고정
- 추후 국제화 (i18n) 기반 구조 설계

---

### NFR-008: 유지보수성 및 코드 품질

**설명:** 장기 유지보수를 위한 코드 표준 준수

**요구사항:**
- TypeScript: 타입 안정성 (strict mode)
- ESLint + Prettier: 코드 스타일 일관성
- 컴포넌트 분리:
  - 최대 200 라인 제한 (복잡한 로직은 분리)
  - 단일 책임 원칙 (Single Responsibility)
- 주석: 복잡한 로직에만 (코드는 자명해야 함)
- 테스트 커버리지: 핵심 로직 70% 이상

**도구:**
- ESLint: airbnb 또는 next.js recommended config
- Prettier: 자동 포맷팅
- TypeScript strict mode

---

---

## 4. 데이터 모델

### 4.1 데이터베이스 스키마 (Supabase PostgreSQL)

#### 1. `trips` 테이블

```typescript
export interface Trip {
  id: string;              // UUID, Primary Key
  title: string;           // "홋카이도 가족여행"
  destination: string;     // "홋카이도, 일본"
  start_date: string;      // "2025-08-01" (ISO 8601)
  end_date: string;        // "2025-08-04" (ISO 8601)
  cover_image?: string;    // 커버 이미지 URL (선택)
  notes?: string;          // 여행 설명
  created_at: timestamp;   // 자동 생성
  updated_at: timestamp;   // 자동 업데이트
}
```

**데이터 예시:**
```
{
  "id": "trip-001",
  "title": "홋카이도 가족여행",
  "destination": "홋카이도, 일본",
  "start_date": "2025-08-01",
  "end_date": "2025-08-04",
  "notes": "3박 4일 홋카이도 가족여행..."
}
```

---

#### 2. `schedules` 테이블

```typescript
export interface Schedule {
  id: string;              // UUID, Primary Key
  trip_id: string;         // FK -> trips.id
  day_number: number;      // 1~4
  order: number;           // Day 내 순서 (1, 2, 3...)
  time: string;            // "09:20" (HH:MM)
  title: string;           // "인천공항 출발"
  description: string;     // 상세 설명
  category: string;        // "식당" | "카페" | "관광" | "쇼핑" | "이동" | "디저트" | "체험" | "온천" | "숙소"
  place_id?: string;       // FK -> places.id (선택)
  youtube_urls?: string[]; // YouTube 링크 배열 (선택)
  created_at: timestamp;
  updated_at: timestamp;
}
```

**데이터 예시:**
```
{
  "id": "sch-001",
  "trip_id": "trip-001",
  "day_number": 1,
  "order": 1,
  "time": "09:20",
  "title": "인천공항 출발",
  "description": "이스타항공 ZE625...",
  "category": "이동",
  "place_id": null,
  "youtube_urls": []
}
```

---

#### 3. `places` 테이블

```typescript
export interface Place {
  id: string;                // UUID, Primary Key
  trip_id: string;           // FK -> trips.id
  name: string;              // "오타루 운하"
  address: string;           // 장소 주소
  lat: number;               // 위도
  lng: number;               // 경도
  google_place_id?: string;  // Google Places ID (자동 수집 용)
  category: string;          // "식당" | "카페" | "관광" | ... | "이동"
  rating?: number;           // 0~5 (Google Places)
  price_level?: number;      // 1~4 ($, $$, $$$, $$$$)
  main_menu?: string[];      // ["라벤더 소프트아이스크림"]
  photos?: string[];         // URL 배열
  key_reviews?: string[];    // 주요 리뷰 텍스트
  recommendation_reason?: string; // 추천 사유 (한국어)
  notes?: string;            // 추가 정보
  phone?: string;            // 전화번호
  website?: string;          // 웹사이트 URL
  opening_hours?: string[];  // ["09:00 - 17:00"]
  created_at: timestamp;
  updated_at: timestamp;
}
```

**데이터 예시:**
```
{
  "id": "place-005",
  "trip_id": "trip-001",
  "name": "팜 토미타",
  "address": "Nakafurano, Sorachi District, Hokkaido",
  "lat": 43.3536,
  "lng": 142.3820,
  "category": "관광",
  "rating": 4.7,
  "main_menu": ["라벤더 소프트아이스크림"],
  "recommendation_reason": "7월 중순~하순 라벤더 절정, 가족이 여유롭게 산책할 수 있는 최고의 명소"
}
```

---

#### 4. `flights` 테이블

```typescript
export interface Flight {
  id: string;                    // UUID, Primary Key
  trip_id: string;               // FK -> trips.id
  type: "departure" | "arrival"; // 출발 또는 도착
  airline: string;               // "이스타항공"
  flight_number: string;         // "ZE625"
  departure_time: string;        // "2025-08-01T09:20:00" (ISO 8601)
  arrival_time: string;          // "2025-08-01T11:50:00"
  departure_airport: string;     // "인천국제공항"
  departure_airport_code: string;// "ICN"
  arrival_airport: string;       // "신치토세공항"
  arrival_airport_code: string;  // "CTS"
  terminal?: string;             // "T1", "T2"
  airline_url?: string;          // "https://www.eastarjet.com"
  booking_reference?: string;    // 예약 번호
  created_at: timestamp;
  updated_at: timestamp;
}
```

**데이터 예시:**
```
{
  "id": "flight-001",
  "trip_id": "trip-001",
  "type": "departure",
  "airline": "이스타항공",
  "flight_number": "ZE625",
  "departure_time": "2025-08-01T09:20:00",
  "arrival_time": "2025-08-01T11:50:00",
  "departure_airport": "인천국제공항",
  "departure_airport_code": "ICN",
  "arrival_airport": "신치토세공항",
  "arrival_airport_code": "CTS",
  "airline_url": "https://www.eastarjet.com"
}
```

---

#### 5. `accommodations` 테이블

```typescript
export interface Accommodation {
  id: string;           // UUID, Primary Key
  trip_id: string;      // FK -> trips.id
  day_number: number;   // 1~4 (Day 별 숙소)
  name: string;         // "Sapporo Hotel by Granbell"
  address: string;      // 주소
  lat: number;          // 위도
  lng: number;          // 경도
  check_in: string;     // "2025-08-01 15:00"
  check_out: string;    // "2025-08-02 11:00"
  booking_url?: string; // 예약 확인 URL
  notes?: string;       // "온천 포함, 조식 제공"
  phone?: string;       // 전화번호
  nearby_facilities?: string[]; // ["편의점 5분", "약국 3분"]
  created_at: timestamp;
  updated_at: timestamp;
}
```

**데이터 예시:**
```
{
  "id": "acc-001",
  "trip_id": "trip-001",
  "day_number": 1,
  "name": "Sapporo Hotel by Granbell",
  "address": "1 Chome-9 Kita 2 Jonishi, Chuo Ward, Sapporo",
  "lat": 43.0627,
  "lng": 141.3497,
  "check_in": "2025-08-01 15:00",
  "check_out": "2025-08-02 11:00"
}
```

---

#### 6. `trip_settings` 테이블 (선택사항, v1.1 이상)

```typescript
export interface TripSettings {
  id: string;           // UUID
  trip_id: string;      // FK -> trips.id
  pin_code_hash: string;// bcrypt 해시 (관리자 인증)
  large_font_enabled: boolean; // 큰 글씨 모드 기본값
  created_at: timestamp;
  updated_at: timestamp;
}
```

---

### 4.2 관계도 (ERD)

```
┌─────────────┐
│   trips     │
│  (PK: id)   │
└──────┬──────┘
       │
       ├─────────────────────┬────────────────────┬────────────────────┐
       │                     │                    │                    │
       ▼                     ▼                    ▼                    ▼
┌─────────────┐      ┌─────────────┐    ┌──────────────┐    ┌──────────────┐
│ schedules   │      │   places    │    │   flights    │    │accommodations│
│  (FK trip)  │      │  (FK trip)  │    │  (FK trip)   │    │  (FK trip)   │
└─────────────┘      └─────────────┘    └──────────────┘    └──────────────┘
       │
       │ place_id (선택적)
       └───────────────┐
                       │
                 ┌─────▼──────┐
                 │  places    │
                 │            │
                 └────────────┘
```

---

### 4.3 데이터 제약 조건

| 테이블 | 필드 | 제약 조건 | 설명 |
|--------|------|---------|------|
| trips | id | NOT NULL, PRIMARY KEY | UUID 자동 생성 |
| trips | title | NOT NULL, max 100 | 여행 제목 필수 |
| trips | start_date | NOT NULL | 여행 시작일 필수 |
| trips | end_date | NOT NULL | start_date <= end_date |
| schedules | trip_id | NOT NULL, FK | 반드시 Trip 참조 |
| schedules | day_number | NOT NULL, 1-4 | Day 범위 제한 |
| schedules | time | NOT NULL, REGEX HH:MM | 시간 형식 검증 |
| places | trip_id | NOT NULL, FK | 반드시 Trip 참조 |
| places | lat | -90 ~ 90 | 위도 범위 |
| places | lng | -180 ~ 180 | 경도 범위 |
| accommodations | check_in | NOT NULL | 체크인 시간 필수 |
| accommodations | check_out | NOT NULL | check_in <= check_out |

---

---

## 5. 시스템 아키텍처

### 5.1 전체 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                    사용자 브라우저                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Next.js App Router (Client Components)         │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ 대시보드    │ │ 장소상세   │ │ 관리자     │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘       │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ 맛집가이드  │ │ 항공편     │ │ 숙소       │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘       │   │
│  │                                                       │   │
│  │  State Management: Zustand (또는 Context API)         │   │
│  │  Style: Tailwind CSS + shadcn/ui                     │   │
│  │  Offline: Service Worker (next-pwa)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└────────────────────────┬─────────────────────────────────────┘
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│               Vercel (Next.js 배포)                          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        Next.js 15 (App Router)                        │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ /          │ │ /day/[n]   │ │ /place/[id]│       │   │
│  │  │ (대시보드)  │ │            │ │            │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘       │   │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐       │   │
│  │  │ /admin     │ │ /api/      │ │ /restaurants│     │   │
│  │  │ (관리자)    │ │ (REST API) │ │            │       │   │
│  │  └────────────┘ └────────────┘ └────────────┘       │   │
│  │                                                       │   │
│  │  API Routes:                                         │   │
│  │  - /api/schedules (GET, POST, PUT, DELETE)           │   │
│  │  - /api/places (GET, POST, PUT, DELETE)              │   │
│  │  - /api/flights (GET, POST, PUT, DELETE)             │   │
│  │  - /api/accommodations (GET, POST, PUT, DELETE)      │   │
│  │  - /api/auth/verify-pin (POST)                       │   │
│  └──────────────────────────────────────────────────────┘   │
└────────┬──────────────────────────────────────────────┬──────┘
         │                                              │
         ▼                                              ▼
┌──────────────────────┐                    ┌──────────────────────┐
│   Supabase (DB)      │                    │  Google APIs         │
│                      │                    │  ┌────────────────┐  │
│  PostgreSQL Tables:  │                    │  │ Maps API       │  │
│  ├─ trips           │                    │  │ Places API     │  │
│  ├─ schedules       │                    │  │ Directions API │  │
│  ├─ places          │                    │  │ YouTube API    │  │
│  ├─ flights         │                    │  └────────────────┘  │
│  ├─ accommodations  │                    │                      │
│  └─ trip_settings   │                    └──────────────────────┘
│                      │
│  Row Level Security: │
│  - PIN 기반 접근     │
│  - 여행별 데이터 격리│
└──────────────────────┘
```

---

### 5.2 기술 스택

| 영역 | 기술 | 버전 | 용도 |
|------|------|------|------|
| **프레임워크** | Next.js | 15 | SSR/SSG, API Routes |
| **언어** | TypeScript | 5.x | 타입 안정성 |
| **스타일링** | Tailwind CSS | 3.x | 반응형 빠른 구현 |
| **UI 컴포넌트** | shadcn/ui | 최신 | 접근성, 커스터마이징 |
| **상태 관리** | Zustand 또는 Context API | - | 간단한 상태 관리 |
| **데이터베이스** | Supabase (PostgreSQL) | - | 무료 티어, 실시간 |
| **인증** | JWT (Supabase) | - | PIN 기반 토큰 |
| **지도** | Google Maps JavaScript API | v3 | 임베드, 마커 |
| **장소 정보** | Google Places API | - | 평점, 리뷰, 사진 |
| **이동 시간** | Google Directions API | - | 자차 기준 시간 |
| **영상** | YouTube Data API | v3 | 한글 영상 검색 |
| **PWA** | next-pwa | 최신 | 오프라인 캐싱 |
| **배포** | Vercel | - | Next.js 최적화 |
| **테스트** | Vitest + React Testing Library | 최신 | 단위/통합 테스트 |
| **코드 품질** | ESLint + Prettier | 최신 | 스타일 일관성 |

---

### 5.3 아키텍처 패턴

#### 1. Client Components vs Server Components

- **Server Components (RSC)**:
  - Page 라우터 상위 단계 (초기 레이아웃)
  - 데이터 페칭 (Supabase 쿼리)
  - 정적 콘텐츠

- **Client Components**:
  - 대시보드 (Day 탭 전환)
  - 장소 상세 페이지 (상호작용)
  - 관리자 폼 (입력, 수정)
  - Google Maps 임베드

#### 2. API 라우트 (Next.js API Routes)

```
/api/schedules
  GET    → 모든 일정 조회 (trip_id 기반)
  POST   → 일정 생성 (관리자만, PIN 인증)
  PUT    → 일정 수정
  DELETE → 일정 삭제

/api/places
  GET    → 모든 장소 조회
  POST   → 장소 생성 (Google Places API 연동)
  PUT    → 장소 수정
  DELETE → 장소 삭제

/api/auth/verify-pin
  POST   → PIN 인증 후 JWT 토큰 반환

/api/youtube/search
  POST   → YouTube 영상 검색
```

#### 3. 폴더 구조

```
sapporo/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root 레이아웃
│   │   ├── page.tsx              # / (대시보드)
│   │   ├── day/[n]/
│   │   │   └── page.tsx          # /day/[n]
│   │   ├── place/[id]/
│   │   │   └── page.tsx          # /place/[id]
│   │   ├── restaurants/
│   │   │   └── page.tsx          # /restaurants (맛집/카페)
│   │   ├── flights/
│   │   │   └── page.tsx          # /flights
│   │   ├── accommodation/
│   │   │   └── page.tsx          # /accommodation
│   │   ├── admin/
│   │   │   ├── layout.tsx        # 관리자 레이아웃
│   │   │   ├── page.tsx          # /admin (로그인)
│   │   │   ├── schedules/
│   │   │   │   └── page.tsx      # /admin/schedules
│   │   │   ├── places/
│   │   │   │   └── page.tsx      # /admin/places
│   │   │   ├── flights/
│   │   │   │   └── page.tsx      # /admin/flights
│   │   │   └── accommodation/
│   │   │       └── page.tsx      # /admin/accommodation
│   │   └── api/
│   │       ├── schedules/
│   │       ├── places/
│   │       ├── flights/
│   │       ├── accommodations/
│   │       └── auth/
│   │           └── verify-pin.ts
│   ├── lib/
│   │   ├── data.ts               # 초기 데이터 (현재)
│   │   ├── types.ts              # TypeScript 인터페이스
│   │   ├── supabase.ts           # Supabase 클라이언트
│   │   ├── utils.ts              # 유틸 함수
│   │   ├── google-maps.ts        # Google Maps 헬퍼
│   │   └── youtube.ts            # YouTube API 헬퍼
│   └── components/
│       ├── DayTabs.tsx           # Day 탭 컴포넌트
│       ├── ScheduleCard.tsx      # 일정 카드
│       ├── PlaceDetail.tsx       # 장소 상세
│       ├── MapView.tsx           # Google Maps 뷰
│       ├── RestaurantList.tsx    # 맛집 목록
│       ├── AdminForm.tsx         # 관리자 폼 (기본)
│       ├── LargeFontToggle.tsx   # 큰 글씨 토글
│       └── Navigation.tsx        # 하단 네비게이션
├── public/
│   ├── manifest.json             # PWA 매니페스트
│   ├── sw.js                     # Service Worker (next-pwa)
│   └── icons/
│       ├── apple-touch-icon.png
│       └── favicon-192x192.png
├── .env.local                    # 환경 변수 (로컬)
├── next.config.js                # Next.js 설정
├── tsconfig.json                 # TypeScript 설정
├── tailwind.config.js            # Tailwind 설정
└── package.json
```

---

### 5.4 상태 관리 전략

#### Zustand (권장) 또는 Context API

**전역 상태:**
```typescript
// stores/travelStore.ts
import { create } from 'zustand';

interface TravelStore {
  tripId: string;
  largeFontEnabled: boolean;
  toggleLargeFont: () => void;
  currentDay: number;
  setCurrentDay: (day: number) => void;
}

export const useTravelStore = create<TravelStore>((set) => ({
  tripId: 'trip-001',
  largeFontEnabled: false,
  toggleLargeFont: () =>
    set((state) => ({ largeFontEnabled: !state.largeFontEnabled })),
  currentDay: 1,
  setCurrentDay: (day) => set({ currentDay: day }),
}));
```

**로컬 상태:**
- React useState 사용 (폼 입력, UI 상태)
- React.memo로 리렌더링 최소화

---

---

## 6. 페이지 구조

### 6.1 라우트 맵

| 경로 | 이름 | 권한 | 설명 |
|------|------|------|------|
| `/` | 대시보드 | 공개 | Day 1~4 탭, 오늘 자동 하이라이트 |
| `/day/[n]` | 일정 상세 | 공개 | 특정 Day의 시간순 일정 리스트 |
| `/place/[id]` | 장소 상세 | 공개 | 지도, 유튜브, 이동 시간 |
| `/restaurants` | 맛집/카페 | 공개 | 지도뷰 + 목록뷰, 필터링 |
| `/flights` | 항공편 | 공개 | 출발/도착 항공편 정보 |
| `/accommodation` | 숙소 | 공개 | 숙소 정보 및 체크인/아웃 |
| `/admin` | 관리자 로그인 | 공개 | PIN 입력 폼 |
| `/admin/schedules` | 일정 관리 | 관리자 | 일정 CRUD |
| `/admin/places` | 장소 관리 | 관리자 | 장소/맛집 CRUD |
| `/admin/flights` | 항공편 관리 | 관리자 | 항공편 CRUD |
| `/admin/accommodation` | 숙소 관리 | 관리자 | 숙소 CRUD |

---

### 6.2 페이지별 상세 설명

#### 1. `/` (대시보드)

**컴포넌트:**
- `DayTabs`: 4개 Day 탭
- `ScheduleCard`: 각 일정 항목 카드
- `LargeFontToggle`: 큰 글씨 토글 버튼

**데이터 흐름:**
```
1. 현재 날짜 계산 (trip.start_date 기반)
2. 현재 Day 자동 하이라이트
3. 각 Day의 schedules 조회 (Supabase)
4. ScheduleCard 배열 렌더링
```

**마크업 (예):**
```
┌─────────────────────────────────────┐
│ 큰글씨 토글 | 뒤로가기                  │ (헤더)
├─────────────────────────────────────┤
│ Day 1  [Day 2] Day 3  Day 4          │ (탭)
├─────────────────────────────────────┤
│ ┌───────────────────────────────┐   │
│ │ 09:20 인천공항 출발            │ 🚈 │
│ │ 이스타항공 ZE625                │   │
│ └───────────────────────────────┘   │
│ ┌───────────────────────────────┐   │
│ │ 11:50 신치토세 공항 도착        │ 🚗 │
│ │ 렌트카 픽업                      │   │
│ └───────────────────────────────┘   │
│ ┌───────────────────────────────┐   │
│ │ 13:00 오타루 운하              │ 🎞️  │
│ │ 운하 산책, 가스등·창고 거리      │   │
│ └───────────────────────────────┘   │
└─────────────────────────────────────┘
     하단 네비: 대시보드 / 맛집 / 항공편 / 숙소 / 관리자
```

---

#### 2. `/day/[n]` (일정 상세)

**컴포넌트:**
- `DayHeader`: Day N, 날짜 표시
- `ScheduleTimeline`: 시간 순서대로 일정 표시

**데이터:**
```
GET /api/schedules?trip_id=trip-001&day_number=1
Response:
[
  { id: "sch-001", time: "09:20", title: "인천공항 출발", ... },
  { id: "sch-002", time: "11:50", title: "신치토세 공항 도착", ... },
  ...
]
```

---

#### 3. `/place/[id]` (장소 상세)

**컴포넌트:**
- `MapEmbed`: Google Maps 임베드
- `PlaceInfo`: 기본 정보 (주소, 전화, 영업시간)
- `YouTubeVideos`: YouTube 영상 리스트 (iframe)
- `TravelTimes`: 이동 시간 정보

**데이터:**
```
GET /api/places/[id]
Response:
{
  id: "place-002",
  name: "오타루 운하",
  lat: 43.1977,
  lng: 140.9945,
  rating: 4.5,
  notes: "운하 산책 가스등·창고 거리...",
  ...
}

GET /api/maps/directions?from=...&to=...
Response:
{
  duration: "1 hour 20 min",
  distance: "84 km"
}
```

---

#### 4. `/restaurants` (맛집/카페)

**컴포넌트:**
- `MapView`: Google Maps + 마커 (Marker Clustering)
- `RestaurantList`: 카드 목록
- `FilterBar`: 카테고리, Day, 평점 필터

**마크업:**
```
┌─────────────────────────────────────┐
│ 맛집/카페 가이드                      │ (헤더)
├─────────────────────────────────────┤
│ [지도뷰] [목록뷰]                     │ (뷰 토글)
├─────────────────────────────────────┤
│ 필터: 식당 ▼ | Day 1 ▼ | 평점 4+ ▼  │
├─────────────────────────────────────┤
│ 지도 또는 목록 렌더링                  │
└─────────────────────────────────────┘
```

**지도뷰 데이터:**
```
GET /api/places?category=restaurant,cafe,dessert
Response: Place[] with lat, lng for markers
```

---

#### 5. `/flights` (항공편)

**컴포넌트:**
- `FlightCard`: 출발/도착 카드
- `AirlineLink`: 항공사 링크
- `AirportChecklist`: 체크리스트

**마크업:**
```
┌─────────────────────────────────────┐
│ 항공편 정보                            │ (헤더)
├─────────────────────────────────────┤
│ 📅 2025년 8월 1일 (금)                │
│ ┌───────────────────────────────┐   │
│ │ 📤 출발                         │   │
│ │ 이스타항공 ZE625                │   │
│ │ 인천 → 신치토세                 │   │
│ │ 09:20 ~ 11:50 (KST)            │   │
│ │ [항공사 앱 바로가기]             │   │
│ └───────────────────────────────┘   │
│ ┌───────────────────────────────┐   │
│ │ 📥 도착                         │   │
│ │ 이스타항공 ZE624                │   │
│ │ 신치토세 → 인천                 │   │
│ │ 17:50 ~ 20:50 (KST)            │   │
│ │ [항공사 앱 바로가기]             │   │
│ └───────────────────────────────┘   │
│ ✓ 체크리스트:                        │
│   □ 여권, 항공권 준비                │
│   □ 국제운전면허증                  │
│   □ 환전                           │
└─────────────────────────────────────┘
```

---

#### 6. `/accommodation` (숙소)

**컴포넌트:**
- `AccommodationCard`: 숙소별 카드
- `MapEmbed`: 위치 지도
- `CheckInInfo`: 체크인/아웃 정보

**마크업:**
```
┌─────────────────────────────────────┐
│ 숙소 정보                              │ (헤더)
├─────────────────────────────────────┤
│ [Day 1] Sapporo Hotel by Granbell   │
│ 주소: 1 Chome-9 Kita 2 Jonishi...  │
│ 📅 체크인: 2025-08-01 15:00         │
│ 📅 체크아웃: 2025-08-02 11:00       │
│ 지도 표시                             │
│ [예약 확인]                           │
├─────────────────────────────────────┤
│ [Day 2] La Vista Furano Hills       │
│ ...                                  │
├─────────────────────────────────────┤
│ [Day 3] Noboribetsu Takimotokan     │
│ ...                                  │
└─────────────────────────────────────┘
```

---

#### 7. `/admin` (로그인)

**컴포넌트:**
- `PINInput`: 4~6자리 PIN 입력
- `ErrorMessage`: 오류 메시지

**흐름:**
```
1. PIN 입력
2. POST /api/auth/verify-pin
3. 성공 → JWT 토큰 생성 + httpOnly 쿠키 저장
4. /admin/schedules로 리다이렉트
```

---

#### 8. `/admin/schedules` (일정 관리)

**컴포넌트:**
- `ScheduleTable`: 일정 목록 (Day별 그룹)
- `ScheduleForm`: 폼 (생성/수정)
- `DeleteButton`: 삭제 버튼

**CRUD 페이지 구조:**
```
┌────────────────────────────────────┐
│ 일정 관리 | [로그아웃]              │ (헤더)
├────────────────────────────────────┤
│ [+ 새 일정 추가]                     │
├────────────────────────────────────┤
│ Day 1                              │
│ ┌──────────────────────────────┐   │
│ │ 09:20 | 인천공항 출발 | [수정][삭제]│
│ └──────────────────────────────┘   │
│ Day 2                              │
│ ...                                │
└────────────────────────────────────┘

[+ 새 일정 추가] 클릭 시:
┌────────────────────────────────────┐
│ 새 일정 추가                          │
├────────────────────────────────────┤
│ Day: [1] ▼                         │
│ 시간: [09:20]                      │
│ 제목: [________________]            │
│ 설명: [________________]            │
│ 카테고리: [식당] ▼                    │
│ 장소: [오타루 운하] ▼ (선택)          │
│ YouTube: [URL 1] [URL 2]           │
│           [+ 추가]                   │
│ [저장] [취소]                        │
└────────────────────────────────────┘
```

---

#### 9. `/admin/places` (장소 관리)

**컴포넌트:**
- `PlaceTable`: 장소 목록
- `PlaceForm`: 생성/수정 폼
- `GooglePlacesIntegration`: Google Places API 자동 채우기

**폼:**
```
필수:
- 이름
- 카테고리
- 주소
- 위도/경도

선택:
- Google Place ID [Google에서 검색] → 자동 채우기
  (평점, 리뷰, 사진, 영업시간 자동 수집)
- 평점, 가격대
- 주요 메뉴 (여러 개)
- 사진 (여러 개)
- 주요 리뷰 (여러 개)
- 추천 사유 (한국어)
- 전화번호, 웹사이트
- 영업시간
```

---

#### 10. `/admin/flights` & `/admin/accommodation`

**파일 관리 페이지와 유사한 구조**
- 테이블 목록 + 생성/수정/삭제 폼
- 항공편: 편명, 항공사, 시간, 공항 코드
- 숙소: 이름, 주소, 체크인/아웃, 예약 링크

---

---

## 7. 외부 API 연동

### 7.1 Google Maps JavaScript API

**목적:** 위치 지도 표시, 마커, 임베드

**설정:**
```javascript
// lib/google-maps.ts
import { Loader } from '@googlemaps/js-api-loader';

export const loader = new Loader({
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  version: 'weekly',
  libraries: ['places', 'marker', 'geocoding'],
});

export async function loadGoogleMaps() {
  const google = await loader.load();
  return google;
}
```

**사용 예시:**
```typescript
// components/PlaceMap.tsx
import { useEffect, useRef } from 'react';
import { loadGoogleMaps } from '@/lib/google-maps';

export function PlaceMap({ lat, lng, title }: PlaceMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadGoogleMaps().then((google) => {
      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        center: { lat, lng },
      });
      new google.maps.Marker({
        position: { lat, lng },
        map,
        title,
      });
    });
  }, [lat, lng, title]);

  return <div ref={mapRef} style={{ height: '400px' }} />;
}
```

**API 호출 한도:**
- 지도 로드: 월 $200 무료 크레딧 (약 25,000회/월)
- 충분한 무료 범위

**환경 변수:**
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIza...
GOOGLE_MAPS_API_KEY=AIza... (서버용)
```

---

### 7.2 Google Places API

**목적:** 맛집/카페의 평점, 리뷰, 사진 자동 수집

**설정:**
```typescript
// lib/google-places.ts
import { Client } from '@googlemaps/google-maps-services-js';

const client = new Client({
  key: process.env.GOOGLE_MAPS_API_KEY,
});

export async function getPlaceDetails(placeId: string) {
  const response = await client.placeDetails({
    params: {
      place_id: placeId,
      fields: ['name', 'rating', 'reviews', 'photos', 'opening_hours', 'website', 'formatted_phone_number'],
      language: 'ko',
    },
  });
  return response.data.result;
}
```

**관리자 페이지 플로우:**
```
1. 관리자가 장소 폼에서 Google Place ID 입력
2. [Google에서 검색] 버튼 클릭
3. getPlaceDetails() 호출
4. 응답: rating, reviews, photos, opening_hours 자동 채우기
5. 저장
```

---

### 7.3 Google Directions API

**목적:** 이동 시간 계산 (자차 기준)

**설정:**
```typescript
// lib/google-directions.ts
export async function getDirections(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number }
) {
  const response = await client.directions({
    params: {
      origin: `${origin.lat},${origin.lng}`,
      destination: `${destination.lat},${destination.lng}`,
      mode: 'driving', // 자차
      language: 'ko',
      departure_time: 'now',
    },
  });

  const route = response.data.routes[0];
  const duration = route.legs[0].duration.text; // "1시간 20분"
  return duration;
}
```

**호출:**
```typescript
// components/PlaceDetail.tsx
const prevSchedule = /* 이전 일정 */;
const currentPlace = /* 현재 장소 */;
const nextSchedule = /* 다음 일정 */;

const prevTravelTime = await getDirections(
  { lat: prevPlace.lat, lng: prevPlace.lng },
  { lat: currentPlace.lat, lng: currentPlace.lng }
);
```

---

### 7.4 YouTube Data API v3

**목적:** 장소 관련 한글 YouTube 영상 자동 검색

**설정:**
```typescript
// lib/youtube.ts
export async function searchYouTube(query: string) {
  const response = await fetch('https://www.googleapis.com/youtube/v3/search', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    searchParams: {
      key: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY,
      q: query, // "[장소명] 홋카이도"
      part: 'snippet',
      maxResults: 5,
      regionCode: 'KR',
      relevanceLanguage: 'ko',
      type: 'video',
    },
  });

  return response.json();
}
```

**호출:**
```typescript
// /admin/places/new
const videoResults = await searchYouTube(`${placeName} 홋카이도`);
// videoResults.items[0] = { title, videoId, thumbnail, ... }
```

**API 한도:**
- 일 10,000 쿼터 (충분함)

---

### 7.5 Supabase (PostgreSQL)

**목적:** 데이터 저장소, 실시간 업데이트, Row Level Security

**클라이언트 설정:**
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**API 호출 예시:**
```typescript
// 일정 조회
export async function getSchedules(tripId: string, dayNumber?: number) {
  let query = supabase
    .from('schedules')
    .select('*')
    .eq('trip_id', tripId)
    .order('day_number')
    .order('order');

  if (dayNumber) {
    query = query.eq('day_number', dayNumber);
  }

  const { data, error } = await query;
  return { data, error };
}

// 장소 생성
export async function createPlace(place: Omit<Place, 'id'>) {
  const { data, error } = await supabase
    .from('places')
    .insert([place])
    .select();

  return { data, error };
}

// 일정 수정
export async function updateSchedule(id: string, updates: Partial<Schedule>) {
  const { data, error } = await supabase
    .from('schedules')
    .update(updates)
    .eq('id', id)
    .select();

  return { data, error };
}

// 일정 삭제
export async function deleteSchedule(id: string) {
  const { error } = await supabase
    .from('schedules')
    .delete()
    .eq('id', id);

  return { error };
}
```

**환경 변수:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbG... (공개 가능)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG... (비공개, 서버용)
```

---

---

## 8. 보안 요구사항

### 8.1 인증 (Authentication)

#### PIN 기반 인증
- PIN 저장: bcrypt 해시 (라운드 10 이상)
- 저장소: Supabase `trip_settings.pin_code_hash`
- 로그인 흐름:
  ```
  1. 사용자가 /admin에서 PIN 입력
  2. POST /api/auth/verify-pin { pin: "1234" }
  3. 서버: bcrypt.compare(pin, hash) 검증
  4. 성공 → JWT 토큰 생성 (7일 유효)
  5. httpOnly 쿠키에 저장 (XSS 방지)
  6. /admin/schedules로 리다이렉트
  ```

#### 보안 대책
- 잘못된 PIN 3회 → 5분 잠금 (Brute-force 방지)
- 토큰 만료: 7일 (자동 로그아웃)
- 로그아웃: 쿠키 삭제

**코드 예시:**
```typescript
// /api/auth/verify-pin.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { pin } = await request.json();

  // Supabase에서 PIN 해시 조회
  const { data, error } = await supabase
    .from('trip_settings')
    .select('pin_code_hash, failed_attempts, locked_until')
    .single();

  // 잠금 체크
  if (data.locked_until && new Date() < new Date(data.locked_until)) {
    return Response.json({ error: 'Locked for 5 minutes' }, { status: 429 });
  }

  // PIN 검증
  const isValid = await bcrypt.compare(pin, data.pin_code_hash);

  if (!isValid) {
    // 실패 횟수 증가
    const failed_attempts = (data.failed_attempts || 0) + 1;
    const locked_until = failed_attempts >= 3 ? new Date(Date.now() + 5 * 60 * 1000) : null;

    await supabase
      .from('trip_settings')
      .update({ failed_attempts, locked_until })
      .eq('trip_id', 'trip-001');

    return Response.json({ error: 'Invalid PIN' }, { status: 401 });
  }

  // JWT 토큰 생성
  const token = jwt.sign(
    { tripId: 'trip-001', role: 'admin' },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // 쿠키에 저장
  const response = Response.json({ success: true });
  response.headers.set(
    'Set-Cookie',
    `auth_token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
  );

  return response;
}
```

---

### 8.2 데이터 보호

#### HTTPS
- Vercel 배포 → 자동 HTTPS (모든 요청)
- HTTP → HTTPS 자동 리다이렉트

#### 환경 변수
- API 키는 `.env.local` (로컬) 또는 Vercel Secrets (프로덕션)에 저장
- 클라이언트에 노출되는 키는 `NEXT_PUBLIC_` 프리픽스 (Maps, YouTube 등)
- 서버 전용 키는 노출 금지 (Supabase Service Role, JWT Secret 등)

#### Row Level Security (RLS)
- Supabase RLS 정책 활성화
- 각 row에 `trip_id` 포함
- 정책:
  ```sql
  CREATE POLICY "Allow public read access" ON schedules
  FOR SELECT USING (true);

  CREATE POLICY "Allow admin update/delete" ON schedules
  FOR UPDATE, DELETE USING (
    auth.uid() = (
      SELECT user_id FROM trip_settings WHERE trip_id = schedules.trip_id
    )
  );
  ```

#### CORS
- Next.js API Routes는 기본적으로 CORS 안전
- 외부 API 호출은 서버에서만 (클라이언트 노출 금지)

---

### 8.3 클라이언트 보안

#### XSS (Cross-Site Scripting) 방지
- React는 자동으로 escaping 수행
- `dangerouslySetInnerHTML` 절대 사용 금지
- 사용자 입력은 항상 검증

**예시 - 잘못된 방법:**
```typescript
// 절대 하지 말것!
<div dangerouslySetInnerHTML={{ __html: userInput }} />
```

**올바른 방법:**
```typescript
// 좋은 방법
<div>{userInput}</div>  // React가 자동으로 escaping
```

#### CSRF (Cross-Site Request Forgery) 방지
- Next.js API Routes는 SameSite=Strict 쿠키 사용
- 추가 CSRF 토큰 불필요 (Next.js에서 처리)

#### 민감한 정보 보호
- 여행 공유 URL: UUID v4 기반 (예측 불가)
- 비밀번호/PIN: 클라이언트에 저장하지 않음

---

### 8.4 네트워크 보안

#### Content Security Policy (CSP)
```typescript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' maps.googleapis.com youtube.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'",
        },
      ],
    },
  ],
};
```

#### 타제로도메인 요청
- Google Maps, YouTube, Supabase: 신뢰할 수 있는 도메인만 허용

---

---

## 9. 성능 요구사항

### 9.1 로딩 성능

**Core Web Vitals 목표:**

| 지표 | 목표 | 설명 |
|------|------|------|
| **FCP** (First Contentful Paint) | < 1.5초 | 첫 콘텐츠 표시 시간 |
| **LCP** (Largest Contentful Paint) | < 2.5초 | 가장 큰 콘텐츠 표시 시간 |
| **CLS** (Cumulative Layout Shift) | < 0.1 | 레이아웃 이동 최소화 |
| **TTFB** (Time To First Byte) | < 600ms | 서버 응답 시간 |

**검증 방법:**
- Lighthouse (DevTools)
- Google PageSpeed Insights
- Chrome User Experience Report

---

### 9.2 번들 크기 최적화

**목표:**
- 초기 JS: 200KB 이하 (gzip)
- CSS: 50KB 이하 (gzip)
- 이미지: 페이지당 합계 1MB 이하

**최적화 전략:**

#### 1. Code Splitting
```typescript
// components/AdminDashboard.tsx
const ScheduleForm = dynamic(
  () => import('./ScheduleForm'),
  { loading: () => <Skeleton /> }
);
```

#### 2. Tree Shaking
```typescript
// ❌ 나쁜 예: 전체 라이브러리 import
import _ from 'lodash';

// ✅ 좋은 예: 필요한 함수만 import
import { debounce } from 'lodash-es';
```

#### 3. CSS 최적화 (Tailwind)
```javascript
// tailwind.config.js
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: { /* ... */ },
};
```

#### 4. 폰트 최적화
```typescript
// app/layout.tsx
// ❌ 좋지 않음: 외부 폰트 링크
// <link href="https://fonts.googleapis.com/..." rel="stylesheet" />

// ✅ 좋음: 시스템 폰트 우선
const defaultFont = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
```

---

### 9.3 이미지 최적화

#### Next.js Image Component
```typescript
import Image from 'next/image';

export function PlacePhoto({ photo }: { photo: string }) {
  return (
    <Image
      src={photo}
      alt="Place"
      width={800}
      height={600}
      priority={false}  // Lazy loading
      quality={75}      // 품질 (85는 기본)
    />
  );
}
```

#### 이미지 크기 전략
- 썸네일: 300x300px (WebP)
- 본문: 800x600px (WebP)
- 히어로: 1200x400px (WebP, 선택적)

#### 포맷 제공
```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <img src="image.jpg" alt="..." />
</picture>
```

---

### 9.4 캐싱 전략

#### HTTP 캐싱 (Vercel)
```typescript
// /api/places
export const revalidate = 3600; // 1시간 캐시

export async function GET(request: Request) {
  // ...
}
```

#### Service Worker 캐싱 (PWA)
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  dynamicStartUrl: '/',
  reloadOnOnline: true,
  swcMinify: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'CacheFirst',
      options: { cacheName: 'google-fonts', expiration: { maxEntries: 20 } },
    },
    {
      urlPattern: /^https:\/\/api\.example\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: { cacheName: 'api-cache', expiration: { maxAgeSeconds: 86400 } },
    },
  ],
});

module.exports = withPWA(nextConfig);
```

---

### 9.5 런타임 성능

#### React 성능 최적화
```typescript
// 1. React.memo 사용 (Props 변경 시에만 리렌더)
const ScheduleCard = React.memo(({ schedule }: Props) => (
  <div>{schedule.title}</div>
));

// 2. useCallback으로 함수 메모이제이션
const handleAdd = useCallback((item) => {
  // ...
}, [dependencies]);

// 3. useMemo로 계산 결과 캐싱
const filteredSchedules = useMemo(
  () => schedules.filter(s => s.day === currentDay),
  [schedules, currentDay]
);
```

#### 이벤트 핸들러 최적화
```typescript
// ❌ 나쁜 예: 매번 새로운 함수 생성
<button onClick={() => handleClick(id)}>Delete</button>

// ✅ 좋은 예: useCallback 사용
const handleDelete = useCallback((id: string) => {
  // ...
}, []);

<button onClick={() => handleDelete(id)}>Delete</button>
```

#### 렌더링 최적화
```typescript
// ❌ 나쁜 예: 긴 리스트 풀 렌더
<ul>
  {schedules.map(s => <ScheduleItem key={s.id} schedule={s} />)}
</ul>

// ✅ 좋은 예: 가상화 (react-window)
import { FixedSizeList } from 'react-window';

<FixedSizeList height={600} itemCount={schedules.length} itemSize={80}>
  {({ index, style }) => (
    <ScheduleItem style={style} schedule={schedules[index]} />
  )}
</FixedSizeList>
```

---

---

## 10. 테스트 요구사항

### 10.1 테스트 전략

#### 테스트 피라미드
```
        △
       /|\
      / | \
     /  |  \  E2E 테스트 (10%)
    /   |   \
   /    |    \
  /     |     \ 통합 테스트 (30%)
 /      |      \
/_______|_______\
|       |       | 단위 테스트 (60%)
```

---

### 10.2 단위 테스트 (Unit Tests)

**도구:** Vitest + React Testing Library

**범위:** 비즈니스 로직, 유틸 함수, React 컴포넌트

**예시:**

#### 1. 유틸 함수 테스트
```typescript
// lib/utils.test.ts
import { describe, it, expect } from 'vitest';
import { calculateDayNumber, formatTime } from './utils';

describe('calculateDayNumber', () => {
  it('should calculate correct day from start_date', () => {
    const startDate = new Date('2025-08-01');
    const targetDate = new Date('2025-08-02');
    expect(calculateDayNumber(startDate, targetDate)).toBe(2);
  });
});

describe('formatTime', () => {
  it('should format time as HH:MM', () => {
    expect(formatTime('0920')).toBe('09:20');
    expect(formatTime('1750')).toBe('17:50');
  });
});
```

#### 2. 컴포넌트 테스트
```typescript
// components/DayTabs.test.tsx
import { render, screen } from '@testing-library/react';
import { DayTabs } from './DayTabs';

describe('DayTabs', () => {
  it('should render 4 day tabs', () => {
    render(<DayTabs currentDay={1} onDayChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /day 1/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /day 4/i })).toBeInTheDocument();
  });

  it('should highlight current day', () => {
    const { rerender } = render(<DayTabs currentDay={1} onDayChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /day 1/i })).toHaveClass('active');

    rerender(<DayTabs currentDay={2} onDayChange={() => {}} />);
    expect(screen.getByRole('tab', { name: /day 2/i })).toHaveClass('active');
  });
});
```

#### 3. API 호출 테스트
```typescript
// lib/api.test.ts
import { vi, describe, it, expect } from 'vitest';
import { getSchedules } from './api';

describe('getSchedules', () => {
  it('should fetch schedules by trip_id', async () => {
    const mockData = [
      { id: 'sch-001', title: '인천공항 출발' },
      { id: 'sch-002', title: '신치토세 공항 도착' },
    ];

    vi.mock('@/lib/supabase', () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              order: () => ({
                data: mockData,
                error: null,
              }),
            }),
          }),
        }),
      },
    }));

    const { data, error } = await getSchedules('trip-001');
    expect(data).toEqual(mockData);
    expect(error).toBeNull();
  });
});
```

---

### 10.3 통합 테스트 (Integration Tests)

**범위:** 여러 컴포넌트 간 상호작용, 페이지 플로우

**예시:**

```typescript
// __tests__/admin-flow.test.ts
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AdminSchedulesPage } from '@/app/admin/schedules/page';

describe('Admin Schedules Flow', () => {
  it('should add a new schedule', async () => {
    const { getByRole, getByLabelText } = render(<AdminSchedulesPage />);

    // [+ 새 일정 추가] 클릭
    fireEvent.click(getByRole('button', { name: /새 일정 추가/i }));

    // 폼 입력
    fireEvent.change(getByLabelText('Day'), { target: { value: '1' } });
    fireEvent.change(getByLabelText('시간'), { target: { value: '09:20' } });
    fireEvent.change(getByLabelText('제목'), { target: { value: '인천공항 출발' } });

    // 저장 클릭
    fireEvent.click(getByRole('button', { name: /저장/i }));

    // 새로운 일정이 목록에 추가됨을 확인
    await waitFor(() => {
      expect(screen.getByText('인천공항 출발')).toBeInTheDocument();
    });
  });
});
```

---

### 10.4 E2E 테스트 (End-to-End Tests)

**도구:** Playwright 또는 Cypress

**범위:** 전체 사용자 시나리오 (로그인, 데이터 조회, 관리)

**예시:**

```typescript
// e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Journey', () => {
  test('should view schedule dashboard and navigate to details', async ({ page }) => {
    // 1. 메인 페이지 접속
    await page.goto('https://sapporo.vercel.app/');

    // 2. Day 1 탭 확인
    await expect(page.getByRole('tab', { name: /day 1/i })).toBeVisible();

    // 3. 첫 번째 일정 클릭 (운하 운하)
    await page.getByText('오타루 운하').click();

    // 4. 장소 상세 페이지에서 지도 확인
    await expect(page.locator('[role="region"]')).toContainText('오타루 운하');

    // 5. YouTube 영상 확인
    const youtubeEmbed = page.locator('iframe[src*="youtube"]');
    await expect(youtubeEmbed).toBeVisible();
  });

  test('admin should be able to add a schedule', async ({ page }) => {
    // 1. 관리자 로그인
    await page.goto('https://sapporo.vercel.app/admin');
    await page.fill('[name="pin"]', '1234');
    await page.click('button:has-text("로그인")');

    // 2. 일정 관리 페이지로 이동
    await expect(page).toHaveURL('**/admin/schedules');

    // 3. 새 일정 추가
    await page.click('button:has-text("새 일정 추가")');
    await page.fill('[name="title"]', '신 일정');
    await page.fill('[name="time"]', '14:00');
    await page.click('button:has-text("저장")');

    // 4. 새로운 일정이 목록에 추가됨
    await expect(page.getByText('신 일정')).toBeVisible();
  });
});
```

---

### 10.5 테스트 커버리지 목표

| 구역 | 목표 |
|------|------|
| 전체 라인 커버리지 | 70% 이상 |
| 핵심 비즈니스 로직 | 90% 이상 |
| 컴포넌트 | 60% 이상 |
| API 라우트 | 80% 이상 |

---

### 10.6 테스트 실행

```bash
# 단위 테스트 실행
npm run test:unit

# 통합 테스트 실행
npm run test:integration

# E2E 테스트 실행
npm run test:e2e

# 커버리지 리포트 생성
npm run test:coverage
```

---

### 10.7 회귀 테스트 (Regression Testing)

**자동화:**
- GitHub Actions에서 PR 생성 시 자동 실행
- main 브랜치 푸시 시 자동 배포 전 테스트

```yaml
# .github/workflows/test.yml
name: Test

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run test:e2e
      - uses: codecov/codecov-action@v3
```

---

## 부록: 검증 체크리스트

### 기능 검증

- [ ] 대시보드: 오늘 Day 자동 하이라이트
- [ ] 장소 상세: Google Maps 임베드 확인
- [ ] 장소 상세: YouTube 영상 표시
- [ ] 장소 상세: 이동 시간 계산 (자차)
- [ ] 맛집 가이드: 지도뷰 마커 표시
- [ ] 맛집 가이드: 목록뷰 필터링
- [ ] 항공편: 출발/도착 정보 표시
- [ ] 숙소: 체크인/아웃 정보 표시
- [ ] 관리자: PIN 인증 동작
- [ ] 관리자: 일정 CRUD 동작
- [ ] 관리자: 장소 CRUD + Google Places API 연동
- [ ] 큰 글씨 모드: LocalStorage 저장 및 지속성

### 성능 검증

- [ ] Lighthouse Performance 점수 85+ (모바일)
- [ ] PageSpeed Insights 80+ (모바일)
- [ ] FCP < 1.5초 (Fast 3G)
- [ ] LCP < 2.5초 (Fast 3G)
- [ ] CLS < 0.1
- [ ] JS 번들 크기 < 200KB (gzip)

### 보안 검증

- [ ] HTTPS 활성화
- [ ] PIN 인증 해싱 (bcrypt)
- [ ] httpOnly 쿠키 사용
- [ ] CORS 설정 확인
- [ ] 환경 변수 비공개 처리
- [ ] XSS 방지 (React escaping)
- [ ] SQL Injection 방지 (Supabase 쿼리 안전)

### 접근성 검증

- [ ] axe DevTools 점수 95+
- [ ] Lighthouse Accessibility 90+
- [ ] 키보드 네비게이션 동작
- [ ] 색상 대비 4.5:1 이상

### PWA 검증

- [ ] Lighthouse PWA 체크리스트 90+
- [ ] Service Worker 등록 확인
- [ ] 오프라인 모드 동작
- [ ] 모바일 설치 프롬프트 (Android)
- [ ] iOS 홈 화면 추가 매뉴얼 안내

### 브라우저 호환성 검증

- [ ] Chrome/Edge 90+
- [ ] Firefox 88+
- [ ] Safari 14+
- [ ] Samsung Internet 14+

---

## 최종 승인 체크리스트

- [ ] 모든 요구사항 구현 완료
- [ ] 코드 리뷰 완료
- [ ] 단위/통합/E2E 테스트 통과
- [ ] 성능 지표 달성
- [ ] 보안 검증 완료
- [ ] 접근성 검증 완료
- [ ] 모바일 실기기 테스트 완료
- [ ] Vercel 배포 및 URL 공유
- [ ] 사용자 교육 완료

---

**문서 정보**
- 버전: 1.0.0
- 최종 수정: 2025년 4월
- 승인자: [미정]
- 다음 검토: 2025년 8월 (여행 후)
