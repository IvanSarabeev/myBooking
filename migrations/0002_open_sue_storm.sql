ALTER TABLE "books" ALTER COLUMN "title" SET DATA TYPE varchar;--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "author" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "genre" SET DATA TYPE varchar(150);--> statement-breakpoint
ALTER TABLE "books" ALTER COLUMN "summary" SET DATA TYPE text;