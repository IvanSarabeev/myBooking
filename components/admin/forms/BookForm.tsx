"use client";

import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/FileUpload";

interface BookFormProps extends Partial<Book> {
  type?: "create" | "update";
}

type BookFormValues = z.infer<typeof bookSchema>;

const defaultValues: BookFormValues = {
  title: "",
  author: "",
  genre: "",
  rating: 1,
  totalCopies: 1,
  description: "",
  coverUrl: "",
  coverColor: "",
  videoUrl: "",
  summary: "",
};

const BookForm: FC<BookFormProps> = ({ type, ...book }) => {
  const router = useRouter();

  const form = useForm<BookFormValues>({
    shouldFocusError: true,
    resolver: zodResolver(bookSchema),
    defaultValues,
  });

  const isUpdated = type === "update";

  const onSubmit = async (values: BookFormValues) => {
    console.log("Handle on submit");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Title
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter the book title"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Author
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter the author name"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Genre
              </FormLabel>
              <FormControl>
                <Input
                  required
                  placeholder="Enter the genere of the book"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Rating
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={5}
                  placeholder="Enter the book rating"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalCopies"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Total number of books
              </FormLabel>
              <FormControl>
                <Input
                  required
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="Enter the total number of books"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Image
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  type="image"
                  accept="image/*"
                  placeholder="Upload a book cover"
                  folder="books/covers"
                  variant="light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="coverColor"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Primary Color
              </FormLabel>
              <FormControl>{/*  Color Picker */}</FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter the book description"
                  rows={10}
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Trailer
              </FormLabel>
              <FormControl>
                <FileUpload
                  onFileChange={field.onChange}
                  type="video"
                  accept="video/*"
                  placeholder="Upload a book trailer"
                  folder="books/videos"
                  variant="light"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1">
              <FormLabel className="text-base font-normal text-dark-500">
                Book Summary
              </FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="Write a brief summary of the book"
                  className="book-form_input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="book-form_btn bg-primary-admin text-white"
        >
          {isUpdated ? "Update Book" : "Add Book to Library"}
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
