# 서버 배포 및 데이터베이스 연동 가이드

## 아키텍처 개요

```
사용자 → 프론트엔드 (Vercel/Netlify) → 백엔드 API (Railway/Render) → 데이터베이스 (PostgreSQL/Supabase)
                                                                      ↓
                                                              CSV 다운로드 (관리자 페이지)
```

## 옵션 1: Supabase (가장 간단, 추천) ⭐

### 장점
- 무료 티어 제공 (월 500MB DB, 2GB 대역폭)
- 프론트엔드와 백엔드 모두 자동 처리
- 실시간 데이터베이스
- CSV 내보내기 기능 내장

### 비용
- 무료: 소규모 프로젝트
- Pro: $25/월 (더 많은 트래픽)

### 구현 단계

#### 1. Supabase 프로젝트 생성
1. https://supabase.com 접속 및 회원가입
2. "New Project" 클릭
3. 프로젝트 이름 입력, 데이터베이스 비밀번호 설정
4. Region 선택 (가장 가까운 지역)

#### 2. 데이터베이스 테이블 생성
Supabase Dashboard → SQL Editor에서 실행:

```sql
-- 실험 데이터 테이블
CREATE TABLE experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 초기 설문조사
  name TEXT,
  age TEXT,
  gender TEXT,
  gift_budget TEXT,
  
  -- 첫 번째 세션
  first_button TEXT,
  first_display_mode TEXT,
  first_range TEXT,
  first_duration NUMERIC,
  first_clicks INTEGER,
  first_max_scroll INTEGER,
  first_start_time TIMESTAMP,
  first_end_time TIMESTAMP,
  first_product_id TEXT,
  first_product_name TEXT,
  first_product_price NUMERIC,
  
  -- 두 번째 세션
  second_button TEXT,
  second_display_mode TEXT,
  second_range TEXT,
  second_duration NUMERIC,
  second_clicks INTEGER,
  second_max_scroll INTEGER,
  second_start_time TIMESTAMP,
  second_end_time TIMESTAMP,
  second_product_id TEXT,
  second_product_name TEXT,
  second_product_price NUMERIC,
  
  -- 사후 설문조사
  website_preference TEXT
);

-- 인덱스 추가 (검색 속도 향상)
CREATE INDEX idx_experiments_created_at ON experiments(created_at);
```

#### 3. Supabase API 키 확인
- Settings → API → `anon public` 키와 `service_role` 키 복사

#### 4. 프론트엔드 수정
`App.tsx`의 `downloadReport` 함수를 API 호출로 변경

---

## 옵션 2: Railway (중간 난이도)

### 장점
- 간단한 배포
- PostgreSQL 데이터베이스 포함
- 월 $5부터 시작

### 구현 단계

#### 1. 백엔드 서버 생성
Node.js + Express 서버 필요

#### 2. Railway에 배포
- GitHub 저장소 연결
- PostgreSQL 플러그인 추가
- 환경 변수 설정

---

## 옵션 3: AWS (고급, 확장성 좋음)

### 비용
- EC2: $5-20/월
- RDS: $15-30/월
- 총 $20-50/월

### 구현 단계
1. EC2 인스턴스 생성
2. RDS PostgreSQL 생성
3. Node.js 서버 배포
4. Nginx 리버스 프록시 설정

---

## 추천: Supabase 구현 코드

### 1. Supabase 클라이언트 설치
```bash
npm install @supabase/supabase-js
```

### 2. 환경 변수 설정
`.env` 파일 생성:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase 클라이언트 생성
`lib/supabase.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4. 데이터 저장 함수
`App.tsx` 수정:
```typescript
import { supabase } from './lib/supabase'

const saveExperimentData = async (data: any) => {
  const { error } = await supabase
    .from('experiments')
    .insert([data])
  
  if (error) {
    console.error('Error saving data:', error)
  }
}
```

### 5. CSV 다운로드 (Supabase Dashboard)
- Table Editor → Export → CSV 다운로드
- 또는 SQL 쿼리로:
```sql
COPY (SELECT * FROM experiments) TO '/tmp/experiments.csv' WITH CSV HEADER;
```

---

## 관리자 대시보드 (선택사항)

React로 간단한 관리자 페이지 생성:
- 로그인 기능
- 데이터 목록 조회
- CSV 다운로드 버튼
- 필터링 및 검색

---

## 보안 고려사항

1. **Row Level Security (RLS)** 활성화
   - Supabase에서 자동으로 데이터 보호
   
2. **API 키 보호**
   - `.env` 파일은 절대 Git에 커밋하지 않기
   - `VITE_` 접두사는 클라이언트에 노출됨 (공개해도 되는 키만 사용)

3. **Rate Limiting**
   - API 호출 제한 설정

---

## 예상 비용 비교

| 옵션 | 월 비용 | 난이도 | 추천도 |
|------|--------|--------|--------|
| Supabase (Free) | $0 | ⭐ 쉬움 | ⭐⭐⭐⭐⭐ |
| Supabase (Pro) | $25 | ⭐ 쉬움 | ⭐⭐⭐⭐ |
| Railway | $5-20 | ⭐⭐ 보통 | ⭐⭐⭐ |
| AWS | $20-50 | ⭐⭐⭐ 어려움 | ⭐⭐ |

---

## 다음 단계

1. Supabase 계정 생성 및 프로젝트 설정
2. 데이터베이스 테이블 생성
3. 프론트엔드 코드 수정 (API 연동)
4. Vercel에 프론트엔드 배포
5. 테스트 및 CSV 다운로드 확인

