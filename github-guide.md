# 새 프로젝트를 GitHub에 저장하는 방법

## 1단계: GitHub에서 새 저장소 생성
1. https://github.com/new 접속
2. Repository name 입력 (예: `my-new-project`)
3. Public 또는 Private 선택
4. "Add a README file" 체크하지 않기 (로컬에 코드가 있으므로)
5. "Create repository" 클릭

## 2단계: 로컬 프로젝트에서 Git 초기화

### 새 프로젝트 폴더에서:
```bash
# 1. Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋
git commit -m "Initial commit"

# 4. 원격 저장소 추가 (GitHub에서 생성한 저장소 URL 사용)
git remote add origin https://github.com/yourusername/your-repo-name.git

# 5. 푸시
git push -u origin main
```

## 3단계: 이후 변경사항 저장

```bash
# 변경된 파일 추가
git add .

# 커밋
git commit -m "커밋 메시지"

# 푸시
git push
```

## 주의사항
- `.gitignore` 파일을 만들어서 불필요한 파일(예: node_modules, .env)은 제외하세요
- 커밋 메시지는 명확하게 작성하세요
- 중요한 정보(API 키, 비밀번호 등)는 절대 커밋하지 마세요


