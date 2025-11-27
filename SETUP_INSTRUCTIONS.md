# 서버 배포 및 데이터베이스 설정 가이드

## 빠른 시작 (Supabase 사용)

### 1단계: Supabase 프로젝트 생성
1. https://supabase.com 접속 및 회원가입
2. "New Project" 클릭
3. 프로젝트 이름 입력 (예: `hfe-experiment`)
4. 데이터베이스 비밀번호 설정 (기억해두세요!)
5. Region 선택 (가장 가까운 지역)
6. "Create new project" 클릭 (2-3분 소요)

### 2단계: 데이터베이스 테이블 생성
1. Supabase Dashboard → SQL Editor 클릭
2. 아래 SQL 코드를 복사하여 실행:

```sql
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

CREATE INDEX idx_experiments_created_at ON experiments(created_at);
```

3. "Run" 버튼 클릭

### 3단계: API 키 확인
1. Settings → API 클릭
2. 다음 값들을 복사:
   - **Project URL** (예: `https://xxxxx.supabase.co`)
   - **anon public** 키

### 4단계: 환경 변수 설정
1. 프로젝트 루트에 `.env` 파일 생성
2. 다음 내용 추가:

```
VITE_SUPABASE_URL=여기에_Project_URL_붙여넣기
VITE_SUPABASE_ANON_KEY=여기에_anon_public_키_붙여넣기
```

예시:
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 5단계: 패키지 설치
```bash
npm install
```

### 6단계: 로컬 테스트
```bash
npm run dev
```

브라우저에서 실험을 완료하면 데이터가 Supabase에 저장됩니다.

### 7단계: Vercel에 배포 (프론트엔드)

1. https://vercel.com 접속 및 GitHub 계정으로 로그인
2. "Add New Project" 클릭
3. GitHub 저장소 선택
4. Environment Variables 추가:
   - `VITE_SUPABASE_URL` = Supabase Project URL
   - `VITE_SUPABASE_ANON_KEY` = Supabase anon key
5. "Deploy" 클릭
6. 배포 완료 후 URL 확인 (예: `https://your-project.vercel.app`)

## CSV 데이터 다운로드 방법

### 방법 1: Supabase Dashboard (가장 간단)
1. Supabase Dashboard → Table Editor
2. `experiments` 테이블 선택
3. 우측 상단 "..." 메뉴 → "Export" → "CSV" 클릭

### 방법 2: SQL 쿼리
SQL Editor에서 실행:
```sql
-- 모든 데이터 조회
SELECT * FROM experiments;

-- 특정 기간 데이터 조회
SELECT * FROM experiments 
WHERE created_at >= '2025-01-01' 
ORDER BY created_at DESC;
```

그 후 "Download results" 버튼 클릭

### 방법 3: 관리자 대시보드 만들기 (선택사항)
React로 간단한 관리자 페이지를 만들어서:
- 데이터 목록 조회
- 필터링 및 검색
- CSV 다운로드 버튼

## 비용 예상

### Supabase
- **무료 티어**: 월 500MB DB, 2GB 대역폭 (소규모 프로젝트 충분)
- **Pro**: $25/월 (더 많은 트래픽 필요 시)

### Vercel
- **무료 티어**: 충분 (개인 프로젝트)
- **Pro**: $20/월 (팀 프로젝트)

**총 예상 비용: $0-45/월**

## 문제 해결

### 데이터가 저장되지 않을 때
1. 브라우저 콘솔 확인 (F12 → Console)
2. `.env` 파일이 올바른지 확인
3. Supabase 테이블이 생성되었는지 확인
4. Row Level Security (RLS) 비활성화 확인:
   - Settings → API → Disable RLS (개발 중에만)

### 배포 후 데이터가 저장되지 않을 때
1. Vercel 환경 변수가 올바르게 설정되었는지 확인
2. Vercel에서 "Redeploy" 실행

## 보안 주의사항

1. **`.env` 파일은 절대 Git에 커밋하지 마세요!**
   - `.gitignore`에 `.env` 추가 확인

2. **RLS (Row Level Security) 설정**
   - 프로덕션에서는 RLS를 활성화하고 적절한 정책 설정

3. **API 키 보호**
   - `VITE_` 접두사는 클라이언트에 노출됨 (공개해도 되는 키만 사용)
   - 민감한 정보는 서버 사이드에서만 사용

## 다음 단계

1. ✅ Supabase 프로젝트 생성
2. ✅ 데이터베이스 테이블 생성
3. ✅ 환경 변수 설정
4. ✅ 로컬 테스트
5. ✅ Vercel 배포
6. ✅ CSV 다운로드 테스트

완료되면 사용자들이 URL로 접속하여 실험을 진행하고, 모든 데이터가 자동으로 데이터베이스에 저장됩니다!

