import type { IBook } from '../types/book.types';

export const mockBooks: IBook[] = [
  {
    id: '1',
    title: 'Мастер и Маргарита',
    author: 'Михаил Булгаков',
    year: 1967,
    genre: 'Роман',
    isAvailable: false,
    description: 'Мистический роман о дьяволе, посетившем Москву в 1930-х годах.',
    publisher: 'Художественная литература',
    pages: 448
  },
  {
    id: '2',
    title: 'Война и мир',
    author: 'Лев Толстой',
    year: 1869,
    genre: 'Эпопея',
    isAvailable: true,
    description: 'Масштабное произведение о русском обществе в эпоху наполеоновских войн.',
    publisher: 'Эксмо',
    pages: 1360
  },
  {
    id: '3',
    title: 'Преступление и наказание',
    author: 'Фёдор Достоевский',
    year: 1866,
    genre: 'Роман',
    isAvailable: true,
    description: 'Психологический роман о студенте Раскольникове и его теории.',
    publisher: 'Азбука',
    pages: 608
  },
  {
    id: '4',
    title: 'Евгений Онегин',
    author: 'Александр Пушкин',
    year: 1833,
    genre: 'Роман в стихах',
    isAvailable: false,
    description: 'История о разочарованном дворянине и трагической любви.',
    publisher: 'Детская литература',
    pages: 320
  },
  {
    id: '5',
    title: '1984',
    author: 'Джордж Оруэлл',
    year: 1949,
    genre: 'Антиутопия',
    isAvailable: true,
    description: 'Роман о тоталитарном обществе и Большом Брате.',
    publisher: 'АСТ',
    pages: 320
  },
  {
    id: '6',
    title: 'Маленький принц',
    author: 'Антуан де Сент-Экзюпери',
    year: 1943,
    genre: 'Сказка',
    isAvailable: true,
    description: 'Философская сказка о дружбе, любви и ответственности.',
    publisher: 'Объединенное издательство',
    pages: 112
  }
];
