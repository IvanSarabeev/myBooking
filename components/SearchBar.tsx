"use client";

import { FC, useRef } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

type SearchBarProps = {
  query: string;
  placeholder?: string;
  inputClassName?: string;
  containerWrapper?: string;
};

const SearchBar: FC<SearchBarProps> = ({
  query,
  placeholder = "Search by title, author, or genre...",
  inputClassName,
  containerWrapper,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * Updates the search query parameter in the URL and resets the page number to 1.
   * If a search query is provided, it sets or updates the "query" parameter.
   * If the search query is empty, it removes the "query" parameter.
   * Navigates the user to the updated search URL.
   *
   * @param {string} searchQuery - The search term to be updated in the URL. An empty string removes the "query" parameter.
   * @returns {void} - Update the searchParams
   */
  const handleSearch = (searchQuery: string): void => {
    const params = new URLSearchParams(searchParams.toString());

    if (searchQuery) {
      params.set("query", searchQuery);
    } else {
      params.delete("query");
    }

    params.set("page", "1");
    router.push(`/search?${params.toString()}`);
  };

  /**
   * Event handler for key press events on an input field.
   *
   * This function listens for a specific key press (the "Enter" key) on an input field
   * and triggers the `handleSearch` function, passing the current value of the input field.
   *
   * @param {KeyboardEvent<HTMLInputElement>} event - The keyboard event triggered by the key press.
   * @returns {void} - Update the handleSearch function
   */
  // @ts-ignore
  const handleOnKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSearch(event.currentTarget.value);
    }
  };

  return (
    <div className={cn(containerWrapper)}>
      <Button
        size="icon"
        type="button"
        variant="outline"
        aria-label={"Search"}
        onClick={() => inputRef.current?.focus()}
        className="absolute size-fit left-2 top-1/2 -translate-y-1/2 rounded group bg-transparent border-none hover:bg-transparent"
      >
        <Image
          src="/icons/search-fill.svg"
          alt="search"
          height={28}
          width={28}
          decoding="async"
          loading="lazy"
          className="group-hover:scale-105 duration-300"
        />
      </Button>
      <Input
        id="book-search"
        ref={inputRef}
        type="search"
        defaultValue={query}
        placeholder={placeholder}
        aria-label="Search books"
        onKeyDown={handleOnKeyPress}
        className={inputClassName}
      />
    </div>
  );
};

export default SearchBar;
