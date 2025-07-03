# Supabase 설정 가이드

## 1. Supabase 프로젝트 생성

1. [Supabase](https://supabase.com)에 접속하여 계정 생성/로그인
2. "New Project" 클릭
3. 프로젝트 이름: `solve-diary-2`
4. 데이터베이스 비밀번호 설정 (기억해두세요)
5. 지역 선택 (가까운 지역 선택)
6. "Create new project" 클릭

## 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Development Configuration
VITE_APP_ENV=development
```

### 환경 변수 값 찾는 방법:

1. Supabase 대시보드에서 프로젝트 선택
2. Settings > API 메뉴로 이동
3. Project URL과 anon public key 복사
4. `.env` 파일에 붙여넣기

## 3. 데이터베이스 스키마 생성

1. Supabase 대시보드에서 SQL Editor로 이동
2. `supabase/schema.sql` 파일의 내용을 복사
3. SQL Editor에 붙여넣고 실행

또는 터미널에서 Supabase CLI 사용:

```bash
# Supabase CLI 설치 (선택사항)
npm install -g supabase

# 로그인
supabase login

# 프로젝트 연결
supabase link --project-ref your-project-ref

# 스키마 적용
supabase db push
```

## 4. 인증 설정

### OAuth 제공자 설정 (Google, GitHub)

#### Google OAuth:
1. [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트 생성
2. OAuth 2.0 클라이언트 ID 생성
3. Supabase 대시보드 > Authentication > Providers > Google
4. Client ID와 Client Secret 입력
5. Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

#### GitHub OAuth:
1. [GitHub Developer Settings](https://github.com/settings/developers)에서 OAuth App 생성
2. Supabase 대시보드 > Authentication > Providers > GitHub
3. Client ID와 Client Secret 입력
4. Redirect URL: `https://your-project.supabase.co/auth/v1/callback`

## 5. Row Level Security (RLS) 확인

스키마에서 RLS 정책이 자동으로 생성되었는지 확인:

1. Supabase 대시보드 > Authentication > Policies
2. 각 테이블에 대해 RLS가 활성화되어 있는지 확인
3. 필요한 정책들이 생성되어 있는지 확인

## 6. 테스트

개발 서버를 실행하여 설정이 올바른지 확인:

```bash
npm run dev
```

브라우저에서 `http://localhost:8080`에 접속하여 에러가 없는지 확인

## 7. 문제 해결

### 환경 변수 에러
- `.env` 파일이 프로젝트 루트에 있는지 확인
- 환경 변수 이름이 정확한지 확인
- 개발 서버 재시작

### 데이터베이스 연결 에러
- Supabase URL과 API 키가 올바른지 확인
- 네트워크 연결 확인
- Supabase 프로젝트 상태 확인

### 인증 에러
- OAuth 설정이 올바른지 확인
- Redirect URL이 정확한지 확인
- 브라우저 콘솔에서 에러 메시지 확인

## 8. 다음 단계

설정이 완료되면 다음 작업을 진행하세요:

1. 인증 시스템 구축
2. WriteStory 페이지 실제 저장 기능
3. Dashboard 실제 데이터 연동 