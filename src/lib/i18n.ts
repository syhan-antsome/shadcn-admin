import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// 번역 리소스
const resources = {
  en: {
    translation: {
      // 일반적인 헤더 텍스트
      'app.title': 'Admin Dashboard',
      
      // 페이지 제목
      'page.dashboard': 'Dashboard',
      'page.users': 'Users Management',
      'page.tasks': 'Tasks',
      'page.apps': 'Applications',
      'page.chats': 'Chats',
      'page.helpcenter': 'Help Center',
      'page.settings': 'Settings',
      
      // 메뉴 항목
      'menu.dashboard': 'Dashboard',
      'menu.users': 'Users',
      'menu.tasks': 'Tasks',
      'menu.apps': 'Apps',
      'menu.chats': 'Chats',
      'menu.helpcenter': 'Help Center',
      'menu.settings': 'Settings',

      // 설정 페이지 관련 번역 추가
      'settings.name': 'Name',
      'settings.name.placeholder': 'Your name',
      'settings.name.description': 'This is the name that will be displayed on your profile and in emails.',
      'settings.dob': 'Date of birth',
      'settings.dob.placeholder': 'Pick a date',
      'settings.dob.description': 'Your date of birth is used to calculate your age.',
      'settings.language': 'Language',
      'settings.language.select': 'Select language',
      'settings.language.search': 'Search language...',
      'settings.language.notFound': 'No language found.',
      'settings.language.description': 'This is the language that will be used in the dashboard.',
      'settings.language.changed': 'Language changed successfully.',
      'settings.update': 'Update account'

    }
  },
  ko: {
    translation: {
      // 일반적인 헤더 텍스트
      'app.title': '관리자 대시보드',
      
      // 페이지 제목
      'page.dashboard': '대시보드',
      'page.users': '사용자 관리',
      'page.tasks': '작업',
      'page.apps': '애플리케이션',
      'page.chats': '채팅',
      'page.helpcenter': '도움말 센터',
      'page.settings': '설정',
      
      // 메뉴 항목
      'menu.dashboard': '대시보드',
      'menu.users': '사용자',
      'menu.tasks': '작업',
      'menu.apps': '앱',
      'menu.chats': '채팅',
      'menu.helpcenter': '도움말',
      'menu.settings': '설정',

      // 설정 페이지 관련 번역 추가
      'settings.name': '이름',
      'settings.name.placeholder': '이름을 입력하세요',
      'settings.name.description': '프로필과 이메일에 표시될 이름입니다.',
      'settings.dob': '생년월일',
      'settings.dob.placeholder': '날짜 선택',
      'settings.dob.description': '나이 계산에 사용됩니다.',
      'settings.language': '언어',
      'settings.language.select': '언어 선택',
      'settings.language.search': '언어 검색...',
      'settings.language.notFound': '언어를 찾을 수 없습니다.',
      'settings.language.description': '대시보드에서 사용할 언어입니다.',
      'settings.language.changed': '언어가 성공적으로 변경되었습니다.',
      'settings.update': '계정 업데이트'

    }
  },
  ja: {
    translation: {
      // 일반적인 헤더 텍스트
      'app.title': '管理者ダッシュボード',
      
      // 페이지 제목
      'page.dashboard': 'ダッシュボード',
      'page.users': 'ユーザー管理',
      'page.tasks': 'タスク',
      'page.apps': 'アプリケーション',
      'page.chats': 'チャット',
      'page.helpcenter': 'ヘルプセンター',
      'page.settings': '設定',
      
      // 메뉴 항목
      'menu.dashboard': 'ダッシュボード',
      'menu.users': 'ユーザー',
      'menu.tasks': 'タスク',
      'menu.apps': 'アプリ',
      'menu.chats': 'チャット',
      'menu.helpcenter': 'ヘルプ',
      'menu.settings': '設定',

      // 설정 페이지 관련 번역 추가
      'settings.name': '名前',
      'settings.name.placeholder': '名前を入力してください',
      'settings.name.description': 'プロフィールやメールで表示される名前です。',
      'settings.dob': '生年月日',
      'settings.dob.placeholder': '日付を選択',
      'settings.dob.description': '年齢計算に使用されます。',
      'settings.language': '言語',
      'settings.language.select': '言語を選択',
      'settings.language.search': '言語を検索...',
      'settings.language.notFound': '言語が見つかりません。',
      'settings.language.description': 'ダッシュボードで使用される言語です。',
      'settings.language.changed': '言語が正常に変更されました。',
      'settings.update': 'アカウント更新'
    }
  }
}

i18n
  .use(LanguageDetector) // 브라우저 언어 감지
  .use(initReactI18next) // react-i18next 초기화
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // XSS 공격 방지 (React에서는 필요 없음)
    },
    detection: {
      order: ['localStorage', 'cookie', 'navigator'],
      caches: ['localStorage', 'cookie']
    }
  })

export default i18n