/**
 * Represents a book entity with various attributes describing its properties and availability.
 */
interface Book {
  id: string | number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  videoUrl: string;
  summary: string;
  createdAt?: Date | null;
  isLoanedBook?: boolean;
}

interface BookParams
  extends Pick<
    Book,
    | "title"
    | "author"
    | "genre"
    | "rating"
    | "totalCopies"
    | "description"
    | "summary"
  > {
  coverUrl: string;
  coverColor: string;
  videoUrl: string;
}

interface BorrowBookParams {
  bookId: string;
  userId: string;
}

/**
 * Represents the status of a borrowed book in a library or similar borrowing system.
 *
 * The `BorrowBookStatus` interface is used to define the current borrowing state of a book.
 * It can have one of the following statuses:
 * - "BORROWED": Indicates that the book is currently borrowed by a user.
 * - "PENDING": Indicates that a request to borrow the book has been made but is awaiting approval or processing.
 * - "RETURNED": Indicates that the book has been returned to its original location or library.
 */
interface BorrowBookStatus {
  status: "BORROWED" | "PENDING" | "RETURNED";
}

interface BorrowBook {
  id: string;
  userId: string;
  bookId: string;
  status: BorrowBookStatus["status"];
  borrowDate: Date | string;
  dueDate: Date | string;
  returnDate: string | null;
  createdAt: Date | null;
}

interface BorrowedBooks
  extends Pick<
    BorrowBook,
    "id" | "borrowDate" | "dueDate" | "returnDate" | "status"
  > {
  books: Pick<Book, "id" | "title" | "genre" | "coverUrl" | "coverColor">;
}

/**
 * Represents the status of a user.
 *
 * This interface defines the allowed states for a user's status, which can be one of the following:
 * - "APPROVED": The user's status has been approved.
 * - "PENDING": The user's status is pending and requires further action or review.
 * - "REJECTED": The user's status has been rejected.
 */
interface UserStatus {
  status: "APPROVED" | "PENDING" | "REJECTED";
}

/**
 * Represents a user within the system.
 *
 * @interface User
 * @property {string} id - The unique identifier for the user.
 * @property {string} fullName - The full name of the user.
 * @property {typeof UserStatus} [status] - The current status of the user. This is optional.
 * @property {Date} createdAt - The date and time when the user was created.
 * @property {Date} lastActivityDate - The date and time of the user's last activity.
 */
interface User {
  id: string;
  fullName: string;
  status?: typeof UserStatus;
  createdAt: Date;
  lastActivityDate: Date;
}

/**
 * Interface representing user credentials for authentication purposes.
 *
 * This interface is typically used to encapsulate the user's email and password fields
 * for login or authentication mechanisms. It provides a standardized structure
 * for handling user credential data within an application.
 */
interface UserCredentials {
  email: string;
  password: string;
}

/**
 * This interface extends certain properties from the `User` type and the `UserCredentials` interface.
 *
 * It is used to store user-specific information for authentication purposes, including
 * - University identification details
 * - User identity details inherited from other types
 */
interface UserAuthCredentials extends Pick<User, "fullName">, UserCredentials {
  universityId: number;
  universityCard: string;
}

type FilterOptions = "all" | "author" | "title" | "genre" | "rating";
