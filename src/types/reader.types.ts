export interface IReader {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    registrationDate: Date;
    activeBooks: IActiveBook[];
    booksHistory: IBookHistory[];
}

export interface IActiveBook {
    bookId: string;
    title: string;
    author: string;
    issuedDate: Date;
}

export interface IBookHistory {
    bookId: string;
    takenAt: Date;
    title: string;
    author: string;
    issuedDate: Date;
    returnedAt?: Date;
}

