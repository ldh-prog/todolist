# TodoList (`kr.ulsan.ldh.todolist`)

Next.js App Router + Supabase Auth/PostgreSQL/RLS + Vercel 배포용 할 일 목록 앱입니다.

로그인한 사용자만 자신의 `todos` / `shopping_items` 행을 조회·추가·수정·삭제할 수 있습니다.

## 앱을 켜기 전에 할 일 (필수)

anon 키만으로는 테이블을 만들 수 없습니다. Supabase Dashboard에서 아래 두 가지를 먼저 적용하세요.

1. **SQL Editor**에서 `supabase/schema.sql` 전체를 실행합니다. 이미 예전 todos만 있다면 `supabase/todo_reminders.sql`과 `supabase/shopping_items.sql`을 이어서 실행하세요.
2. **Authentication > Providers > Email**에서 로컬 테스트가 쉽도록 Confirm email을 끄거나, 켠 채로 인증 메일을 사용합니다.
3. **Authentication > URL Configuration**
   - Site URL: `http://localhost:3000`
   - Redirect URLs: `http://localhost:3000/auth/callback`


## 기술 스택

- Frontend: Next.js 16 (App Router), React 19, Tailwind CSS 4, Lucide Icons
- Backend/DB: Supabase (PostgreSQL, Authentication, Row Level Security)
- Deployment: Vercel
- Design: ui-ux-pro-max (Flat Design, teal `#0D9488` + CTA orange `#F97316`, Plus Jakarta Sans)

## 1. 프로젝트 초기화 및 패키지 설치

이미 이 저장소에 구성이 들어 있다면 의존성만 설치하면 됩니다.

```bash
npm install
```

처음부터 다시 만들 때의 기준 명령은 다음과 같습니다.

```bash
npx create-next-app@latest kr-ulsan-ldh-todolist --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --turbopack --yes
cd kr-ulsan-ldh-todolist
npm install @supabase/supabase-js @supabase/ssr lucide-react
npm install -D vitest
```

## 2. 환경 변수와 Supabase SSR 클라이언트

`.env.example`을 복사해 `.env.local`을 만듭니다.

```bash
cp .env.example .env.local
```

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

관련 파일:

- `src/lib/supabase/client.ts` — 브라우저 클라이언트
- `src/lib/supabase/server.ts` — Server Component / Server Action 클라이언트
- `src/lib/supabase/proxy.ts` — 세션 갱신
- `src/proxy.ts` — Next.js 16 인증 게이트 (구 `middleware.ts`)

## 3. 데이터베이스와 RLS

1. [Supabase Dashboard](https://supabase.com/dashboard) > SQL Editor
2. `supabase/schema.sql` 전체 실행. 이미 예전 todos만 있다면 `supabase/todo_reminders.sql`과 `supabase/shopping_items.sql`을 실행
3. Authentication > Providers에서 Email이 켜져 있는지 확인
4. 로컬 개발이 편하도록 Authentication > Providers > Email에서 **Confirm email**을 끄거나, 켠 채로 인증 메일을 사용

로컬 Site URL / Redirect URL:

- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/auth/callback`

## 4. 로컬 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다. 비로그인 사용자는 `/login`으로 이동합니다.

할 일에 기한과 알림 시각을 넣으면, **앱이 열려 있는 동안** 인앱 배너와(권한을 허용한 경우) 브라우저 알림으로 알려 줍니다. 브라우저를 완전히 종료하면 울리지 않습니다. 기존 `todos` 테이블에는 `supabase/todo_reminders.sql`을 실행해야 컬럼이 생깁니다.

```bash
npm test
npm run lint
npm run build
```

## 5. Vercel 배포

프로덕션 도메인: [https://todolist-coral-rho-45.vercel.app](https://todolist-coral-rho-45.vercel.app)

### 환경 변수

Vercel 프로젝트 **Settings → Environment Variables**에 아래 3개를 Production / Preview / Development 모두에 저장합니다.

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | `.env.local`과 동일한 Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `.env.local`과 동일한 anon key |
| `NEXT_PUBLIC_SITE_URL` | `https://todolist-coral-rho-45.vercel.app` |

저장 후 **Deployments → 최신 배포 → Redeploy** 하거나, GitHub `main`에 새 커밋이 있으면 자동 배포됩니다.

`NEXT_PUBLIC_*`는 빌드 타임에 주입됩니다. 변수를 나중에 넣었다면 반드시 다시 배포해야 합니다.

### Git 연결

대시보드에 `No Production Deployment`가 보이면 GitHub 저장소 `ldh-prog/todolist`가 아직 연결되지 않았거나 첫 배포가 실패한 상태입니다.

1. Vercel 프로젝트 → Settings → Git → Connect Git Repository
2. `ldh-prog/todolist` 선택
3. Production Branch: `main`
4. Deploy

### Supabase URL

Authentication → URL Configuration:

- Site URL: `https://todolist-coral-rho-45.vercel.app`
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://todolist-coral-rho-45.vercel.app/auth/callback`


## 주요 경로

| 경로 | 역할 |
|------|------|
| `/login` | 이메일/비밀번호 로그인 |
| `/signup` | 회원가입 |
| `/` | 할 일 목록 (기한/알림, 서버 페칭 + 클라이언트 상태) |
| `/shopping` | 장보기 목록 (수량, 분류, 담음 체크) |
| `/auth/callback` | 이메일 인증 코드 교환 |

## 보안 메모

- `anon` 키는 브라우저에 노출되는 공개 키입니다. 실제 보호는 **RLS**가 담당합니다.
- `user_id`는 클라이언트가 아니라 서버 세션의 `auth.uid()`로 기록합니다.
- Service Role Key는 프론트엔드와 `.env.local`의 `NEXT_PUBLIC_*`에 넣지 마세요.

## 문서

- [docs/CHANGELOG.md](docs/CHANGELOG.md)
- [docs/notes/shopping.md](docs/notes/shopping.md)
- [docs/notes/todo-reminders.md](docs/notes/todo-reminders.md)
- [docs/notes/todolist-implementation.md](docs/notes/todolist-implementation.md)
- [docs/notes/vercel-deploy.md](docs/notes/vercel-deploy.md)
- [design-system/ldh-todolist/MASTER.md](design-system/ldh-todolist/MASTER.md)

