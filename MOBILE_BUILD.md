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
