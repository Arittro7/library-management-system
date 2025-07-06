import { useGetAllBooksQuery } from "@/redux/api/bookApi";
import { AddBookModal } from "./AddBookModal";
import BookCard from "./BookCard";

export default function AllBooks() {
  const { data, isError, isLoading } = useGetAllBooksQuery(undefined);

  if (isLoading) {
    return (
      <p className="text-center mt-10 text-lg font-semibold">Loading...</p>
    );
  }

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Something went wrong!</p>
    );
  }

  const books = data?.data || [];

  return (
    <div className="min-h-[calc(108vh-200px)]">
      <div className="max-w-7xl mx-auto  text-end justify-end mt-5 ">
        {" "}
        <AddBookModal />{" "}
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6 p-4">
        {books.map((book: any) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
