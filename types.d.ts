/**
 * Represents a book entity with various attributes describing its properties and availability.
 */
interface Book {
  id: string;
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
  createdAt: Date | null;
  isLoanedBook?: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}

interface BookParams
  extends Pick<
    Book,
    | "title"
    | "author"
    | "genre"
    | "rating"
    | "total_copies"
    | "description"
    | "summary"
  > {
  coverUrl: string;
  coverColor: string;
  videoUrl: string;
}
