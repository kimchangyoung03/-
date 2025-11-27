# 빠른 설정 가이드 (5분)

## ✅ 1단계: Supabase에서 테이블 만들기

1. Supabase Dashboard → **SQL Editor** 클릭
2. 아래 코드 복사해서 붙여넣기
3. **Run** 버튼 클릭

```sql
CREATE TABLE experiments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT,
  age TEXT,
  gender TEXT,
  gift_budget TEXT,
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
  website_preference TEXT
);
```

## ✅ 2단계: API 키 복사

1. **Settings** → **API** 클릭
2. 두 개 복사:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon public** 키

## ✅ 3단계: 환경 변수 파일 만들기

프로젝트 폴더에 `.env` 파일 만들고 아래 내용 붙여넣기:

```
VITE_SUPABASE_URL=여기에_Project_URL_붙여넣기
VITE_SUPABASE_ANON_KEY=여기에_anon_public_키_붙여넣기
```

예시:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ✅ 4단계: 패키지 설치

```bash
npm install
```

## ✅ 5단계: 테스트

```bash
npm run dev
```

브라우저에서 실험 완료하면 데이터가 Supabase에 저장됩니다!

---

## 📥 CSV 다운로드 방법

1. Supabase Dashboard → **Table Editor**
2. `experiments` 테이블 선택
3. 우측 상단 **"..."** → **Export** → **CSV** 클릭

끝!

