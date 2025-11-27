# Vercel 배포 가이드 (5분 완성)

## 1단계: GitHub에 코드 푸시 (이미 완료됨)
✅ 이미 `https://github.com/kimchangyoung03/-.git`에 푸시되어 있습니다.

## 2단계: Vercel 계정 만들기
1. https://vercel.com 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택
4. GitHub 계정으로 로그인

## 3단계: 프로젝트 배포
1. Vercel Dashboard에서 **Add New Project** 클릭
2. **Import Git Repository**에서 저장소 선택
   - `kimchangyoung03/-` 선택
3. **Import** 클릭

## 4단계: 프로젝트 설정
1. **Project Name**: 원하는 이름 입력 (예: `hfe-experiment`)
2. **Framework Preset**: **Vite** 선택 (자동 감지될 수 있음)
3. **Root Directory**: `./HFE` 선택 (중요!)
4. **Build Command**: `npm run build` (자동 입력됨)
5. **Output Directory**: `dist` (자동 입력됨)

## 5단계: 환경 변수 설정 (중요!)
1. **Environment Variables** 섹션 클릭
2. 다음 두 개 추가:

   **변수 1:**
   - Name: `VITE_SUPABASE_URL`
   - Value: `https://frnyacjaatyfuotuqzmc.supabase.co`
   - Environment: Production, Preview, Development 모두 체크

   **변수 2:**
   - Name: `VITE_SUPABASE_ANON_KEY`
   - Value: `여기에_실제_anon_key_붙여넣기` (`.env` 파일에 있는 값)
   - Environment: Production, Preview, Development 모두 체크

3. **Save** 클릭

## 6단계: 배포 시작
1. **Deploy** 버튼 클릭
2. 1-2분 대기
3. 배포 완료!

## 7단계: 배포 확인
1. 배포 완료 후 **Visit** 버튼 클릭
2. 또는 제공된 URL로 접속 (예: `https://your-project.vercel.app`)
3. 웹사이트가 정상 작동하는지 확인

## 완료! 🎉
이제 다른 사람들이 URL로 접속해서 실험을 할 수 있습니다!

---

## 문제 해결

### 배포 실패 시
- 환경 변수가 제대로 설정되었는지 확인
- Root Directory가 `./HFE`로 설정되었는지 확인
- Build 로그 확인 (에러 메시지 확인)

### 환경 변수 업데이트
- Settings → Environment Variables에서 수정 가능
- 수정 후 **Redeploy** 필요

