import type { DayOfWeek, OpeningStatus } from "./types";

const DAY_ABBR: Record<string, number> = {
  "월": 0, "화": 1, "수": 2, "목": 3, "금": 4, "토": 5, "일": 6,
};

const DAY_OF_WEEK_TO_INDEX: Record<DayOfWeek, number> = {
  "월요일": 0, "화요일": 1, "수요일": 2, "목요일": 3,
  "금요일": 4, "토요일": 5, "일요일": 6,
};

/**
 * 한국어 opening_hours 문자열을 파싱하여 특정 요일의 영업 여부를 판별.
 * 시간대(breaktime)는 판별하지 않고, 요일 단위 휴무만 체크.
 */
export function getOpeningStatus(
  openingHours: string[] | undefined,
  dayOfWeek: DayOfWeek,
): OpeningStatus {
  if (!openingHours || openingHours.length === 0) {
    return { isOpen: true, isClosed: false, statusText: "영업시간 미확인" };
  }

  const dayIndex = DAY_OF_WEEK_TO_INDEX[dayOfWeek];
  const dayChar = dayOfWeek[0]; // "월", "화", etc.

  for (const line of openingHours) {
    // Pattern: "X요일 휴무" or "X요일 정기휴무"
    const closedMatch = line.match(/([월화수목금토일])요일\s*(정기)?\s*휴무/);
    if (closedMatch && closedMatch[1] === dayChar) {
      return { isOpen: false, isClosed: true, statusText: line };
    }

    // Pattern: "연중무휴" or "24시간"
    if (line.includes("연중무휴") || line.includes("24시간")) {
      continue; // always open
    }

    // Pattern: "매일" — always open
    if (line.startsWith("매일")) {
      continue;
    }

    // Pattern: "월-토 ..." day range
    const rangeMatch = line.match(/([월화수목금토일])-([월화수목금토일])/);
    if (rangeMatch) {
      const start = DAY_ABBR[rangeMatch[1]];
      const end = DAY_ABBR[rangeMatch[2]];
      if (start !== undefined && end !== undefined) {
        // Check if dayIndex is within the range
        const inRange = start <= end
          ? dayIndex >= start && dayIndex <= end
          : dayIndex >= start || dayIndex <= end; // wraps (e.g., 토-월)
        if (!inRange) {
          return { isOpen: false, isClosed: true, statusText: `${line} (${dayOfWeek} 영업 안 함)` };
        }
      }
    }
  }

  // Extract time info for statusText
  const timeMatch = openingHours[0]?.match(/(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
  const statusText = timeMatch ? `${timeMatch[1]} - ${timeMatch[2]}` : openingHours[0] ?? "";

  return { isOpen: true, isClosed: false, statusText };
}
