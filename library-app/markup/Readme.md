```
markup/
├── index.html              # Главная страница (список книг)
├── readers.html            # Страница со списком читателей
├── reader-profile.html     # Страница профиля читателя
├── css/
│   ├── style.css           # Общие стили для всех страниц
│   ├── books.css           # Стили для страницы книг
│   ├── readers.css         # Стили для страницы читателей
│   └── profile.css         # Стили для страницы профиля
└── assets/                 # (опционально) изображения, иконки
```

### предлагаемая структура проекта

```
src/
├── styles/
│   ├── index.css          # Глобальные стили (reset, переменные)
│   ├── layout.css         # Стили для Layout, Header, Footer
│   └── components.css     # Общие стили для компонентов
├── pages/
│   ├── BooksPage/
│   │   ├── BooksPage.tsx
│   │   └── BooksPage.module.css    # Стили только для этой страницы
│   ├── ReadersPage/
│   │   ├── ReadersPage.tsx
│   │   └── ReadersPage.module.css
│   └── ReaderProfilePage/
│       ├── ReaderProfilePage.tsx
│       └── ReaderProfilePage.module.css
├── components/
...
```

