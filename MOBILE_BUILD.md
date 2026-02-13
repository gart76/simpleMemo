# 모바일 앱 빌드 가이드 (Capacitor)

이 가이드는 **SimpleMemo** 애플리케이션을 안드로이드(Android)와 아이폰(iOS) 앱으로 빌드하는 방법을 설명합니다.

## 사전 준비사항 (Prerequisites)

1.  **Node.js** & **npm** 설치 필수.
2.  **Android Studio** (안드로이드 빌드용).
3.  **Xcode** (iOS 빌드용, macOS 필수).
4.  **CocoaPods** (iOS 의존성 관리): 터미널에 `sudo gem install cocoapods` 입력하여 설치.

---

## 1. 웹 자산 준비 (Prepare Web Assets)

모바일 앱으로 빌드하기 전에, 항상 최신 웹 코드를 먼저 빌드해야 합니다.

```bash
# React/Vite 프로젝트 빌드 (dist 폴더 생성)
npm run build

# 웹 빌드 결과물을 네이티브(Android/iOS) 폴더로 동기화
npx cap sync
```

---

## 2. 안드로이드 빌드 (Android Build)

1.  **Android Studio 실행**:
    ```bash
    npx cap open android
    ```

2.  **Gradle 동기화 대기**: Android Studio가 열리면 하단 상태바의 로딩이 끝날 때까지 기다립니다.

3.  **에뮬레이터/기기에서 실행**:
    - 상단 툴바에서 실행할 기기(Pixel 등)를 선택합니다.
    - **Run (초록색 재생 버튼)**을 클릭합니다.

4.  **배포용 APK 파일 생성**:
    - 상단 메뉴의 **Build > Build Bundle(s) / APK(s) > Build APK(s)**를 클릭합니다.
    - 생성된 APK 파일은 `android/app/build/outputs/apk/debug/` 폴더에 위치합니다.

---

## 3. iOS 빌드 (iOS Build) - Mac 전용

1.  **Xcode 실행**:
    ```bash
    npx cap open ios
    ```

2.  **개발자 팀 선택 (Signing)**:
    - 왼쪽 프로젝트 탐색기에서 가장 위에 있는 **App**을 클릭합니다.
    - **Signing & Capabilities** 탭으로 이동합니다.
    - **Team** 섹션에서 본인의 Apple ID 계정을 선택합니다 (실기기 테스트 시 필수).

3.  **시뮬레이터에서 실행**:
    - 상단 툴바에서 시뮬레이터(예: iPhone 15)를 선택합니다.
    - **Run (재생 버튼)**을 클릭합니다.

4.  **앱스토어 배포용 아카이브**:
    - 타겟 기기를 **Any iOS Device (arm64)**로 선택합니다.
    - 상단 메뉴의 **Product > Archive**를 클릭합니다.
    - 이후 나타나는 창에서 **Distribute App**을 눌러 App Store Connect로 업로드합니다.

---

## 문제 해결 (Troubleshooting)

- **"Could not determine executable to run" 에러**:
    - 반드시 프로젝트 폴더(`fast-memo`) 안에서 명령어를 실행했는지 확인하세요.
- **CocoaPods 관련 에러 (iOS)**:
    - `cd ios/App && pod install && cd ../..` 명령어로 의존성을 다시 설치해보세요.
- **Gradle 관련 에러 (Android)**:
    - Android Studio 메뉴에서 **File > Invalidate Caches / Restart**를 실행하여 캐시를 초기화해보세요.

---

## 4. 코드 수정 후 반영하기 (How to Update)

웹 코드(`src/` 폴더 내 파일들)를 수정한 뒤, 안드로이드 앱에도 반영하려면 **반드시** 아래 과정을 거쳐야 합니다.

1.  **웹 빌드 다시 하기**:
    ```bash
    npm run build
    ```
    (이 명령어가 실행되면 `dist` 폴더가 최신 내용으로 바뀝니다.)

2.  **네이티브와 동기화 하기**:
    ```bash
    npx cap sync
    ```
    (최신 `dist` 폴더 내용을 `android/` 폴더 안으로 복사해줍니다.)

3.  **Android Studio에서 다시 실행**:
    - Android Studio 상단의 **Run (재생 버튼)**을 다시 눌러주세요.
    - 또는 이미 실행 중이라면 **Apply Changes (번개 모양 아이콘)**를 누르면 더 빠르게 반영됩니다.

> **꿀팁 🍯**: 한 방에 하려면 이 명령어를 쓰세요!
> `npm run build && npx cap sync`

---

## 5. Live Reload (개발용)

앱을 매번 빌드하지 않고, 코드를 저장하면 즉시 에뮬레이터/기기에 반영되게 할 수 있습니다.

1.  **개발 서버 실행**:
    ```bash
    npm run dev
    ```
    (터미널을 끄지 말고 계속 켜두세요!)

2.  **설정 동기화**:
    `capacitor.config.ts`에 `server` 설정이 있는지 확인하고 동기화합니다.
    ```bash
    npx cap sync
    ```

3.  **앱 실행**:
    Android Studio에서 앱을 실행하면, 이제부터는 웹 코드가 바뀌면 즉시 앱 화면도 바뀝니다.

> **⚠️ 주의: 배포 시 필독!**
> 앱 스토어에 배포할 때는 `capacitor.config.ts` 파일에서 **`server` 항목을 반드시 지우거나 주석 처리**해야 합니다.
> 안 그러면 사용자들이 앱을 켰을 때 흰 화면만 보게 됩니다! (개발자 컴퓨터를 못 찾으니까요)
