# 📧 EmailAI - Expo проект с TypeScript

Полный Expo проект с поддержкой iOS, Android и Web, настроенный для работы со всеми платформами.

## ✅ Завершенные шаги

### 1️⃣ Создание проекта Expo с TypeScript

```bash
cd d:\Projects\Flutter\EmailAssistant
npx create-expo-app@latest EmailAI --template
```

**Результат:**
- ✅ Проект создан в папке `d:\Projects\Flutter\EmailAssistant\EmailAI`
- ✅ Установлены базовые зависимости (914 пакетов)
- ✅ TypeScript готов к использованию

### 2️⃣ Установка зависимостей

```bash
cd EmailAI

# Установка Expo Router для файловой навигации
npm install expo-router

# Установка зависимостей для web-поддержки
npm install react-dom react-native-web

# TypeScript (уже установлен)
npm install -D typescript
```

**Установленные пакеты:**
- `expo-router` - навигация на основе файловой системы
- `react-dom` - React для веб
- `react-native-web` - совместимость React Native для веб
- `typescript` - поддержка TypeScript
- `@expo/vector-icons` - иконки (уже включены в Expo)

### 3️⃣ Структура папок проекта

```
EmailAI/
├── app/
│   ├── _layout.tsx           # Root layout с навигацией
│   ├── (auth)/
│   │   ├── _layout.tsx       # Auth stack navigator
│   │   ├── index.tsx         # Login screen
│   │   └── signup.tsx        # Sign up screen
│   └── (app)/
│       ├── _layout.tsx       # App tabs navigator
│       ├── index.tsx         # Inbox screen
│       ├── compose.tsx       # Compose email screen
│       └── settings.tsx      # Settings screen
├── components/               # Переиспользуемые компоненты
├── hooks/                    # Custom React hooks
├── lib/                      # Утилиты и helper-функции
├── assets/                   # Изображения, иконки
├── app.json                  # Конфигурация Expo
├── tsconfig.json             # TypeScript конфигурация
└── package.json              # Зависимости
```

### 4️⃣ Конфигурация app.json для всех платформ

✅ **Web конфигурация:**
```json
"web": {
  "output": "single",
  "favicon": "./assets/images/favicon.png",
  "bundler": "metro"
}
```

✅ **iOS конфигурация:**
```json
"ios": {
  "supportsTablet": true
}
```

✅ **Android конфигурация:**
```json
"android": {
  "adaptiveIcon": {...},
  "edgeToEdgeEnabled": true,
  "predictiveBackGestureEnabled": false
}
```

### 5️⃣ Созданные экраны

#### 🔐 Authentication Flow (Group: `(auth)`)

**Login Screen** (`app/(auth)/index.tsx`)
- Экран входа с кнопкой Sign In
- Ссылка на регистрацию
- Навигация в приложение после входа

**Sign Up Screen** (`app/(auth)/signup.tsx`)
- Экран регистрации
- Кнопка возврата на Login

#### 📱 App Flow (Group: `(app)`)

**Inbox Screen** (`app/(app)/index.tsx`)
- Список писем с preview
- Аватарки отправителей
- Поддержка Touch/Click

**Compose Screen** (`app/(app)/compose.tsx`)
- Форма для написания письма
- Поля: To, Subject, Body
- Кнопка отправки

**Settings Screen** (`app/(app)/settings.tsx`)
- Профиль пользователя
- Параметры (Account, Email, Notifications и т.д.)
- Кнопка Sign Out

### 6️⃣ TypeScript конфигурация

**Обновлен `tsconfig.json`:**
- ✅ Строгий режим TypeScript (`"strict": true`)
- ✅ Path alias: `@/*` для удобного импорта
- ✅ Поддержка DOM типов для веб
- ✅ Source maps для отладки
- ✅ JSX как react-jsx

## 🚀 Как использовать проект

### Запуск на Web (браузер)
```bash
cd d:\Projects\Flutter\EmailAssistant\EmailAI
npm run web
# или
npx expo start --web
```

**После запуска:**
- Откроется http://localhost:8081
- Нажмите `w` в терминале или перейдите по ссылке
- Проект готов к разработке с hot reload

### Запуск на Android
```bash
npm run android
# или
npx expo start --android
```

**Требования:**
- Android Studio или Android SDK
- Android device/emulator

### Запуск на iOS
```bash
npm run ios
# или
npx expo start --ios
```

**Требования:**
- macOS
- Xcode

### Запуск на физическом устройстве
```bash
npx expo start
```
- Откройте Expo Go app
- Отсканируйте QR код в терминале

## 📊 Структура навигации

```
Root (_layout.tsx)
├── (auth) Stack Navigator
│   ├── index.tsx (Login)
│   └── signup.tsx (Sign Up)
└── (app) Tabs Navigator
    ├── index.tsx (Inbox)
    ├── compose.tsx (Compose)
    └── settings.tsx (Settings)
```

## 🔧 Следующие шаги

### 1. Добавить API интеграцию
```typescript
// lib/api.ts
export const fetchEmails = async () => {
  // API call to fetch emails
};
```

### 2. Создать custom hooks
```typescript
// hooks/useEmails.ts
export const useEmails = () => {
  // Custom hook for email management
};
```

### 3. Добавить компоненты
```typescript
// components/EmailCard.tsx
export const EmailCard = ({ email }) => {
  // Email card component
};
```

### 4. Добавить состояние (Redux, Zustand, Context API)
```bash
npm install zustand
# или
npm install redux @reduxjs/toolkit react-redux
```

### 5. Настроить окружение
```bash
npm install dotenv
# Создать .env файл с переменными
```

## 📝 Полезные команды

```bash
# Проверить зависимости
npm audit

# Обновить пакеты
npm update

# Чистая установка
rm -r node_modules package-lock.json
npm install

# Сборка для production
npx expo build:web

# Выгрузить на EAS
eas build --platform web
```

## ✨ Особенности проекта

✅ **Полная TypeScript поддержка** - все файлы написаны с типизацией
✅ **Файловая навигация** - благодаря Expo Router
✅ **Кроссплатформенность** - iOS, Android, Web
✅ **Modern Stack** - React 18+, Expo 50+
✅ **Hot Reload** - моментальные обновления при изменении кода
✅ **Группировка маршрутов** - структурированная навигация
✅ **Web-оптимизированная** - конфигурация для Production

## 🐛 Решение проблем

### Web не загружается
```bash
# Очистить кеш и переустановить
rm -r .expo node_modules
npm install
npx expo start --web --clear
```

### Ошибка TypeScript
```bash
# Переонициализировать tsconfig
npx expo tsconfig
```

### Проблемы с портом 8081
```bash
# Использовать другой порт
npx expo start --web --port 3000
```

## 📚 Документация

- [Expo Official Docs](https://docs.expo.dev)
- [Expo Router Guide](https://docs.expo.dev/routing/introduction/)
- [React Native Documentation](https://reactnative.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Проект создан:** 21 февраля 2026
**Версия Expo:** Latest (с React Compiler enabled)
**TypeScript:** Enabled с strict mode
