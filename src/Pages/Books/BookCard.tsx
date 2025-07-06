import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useDeleteBookMutation } from "@/redux/api/bookApi";
import { Link } from "react-router";
import type { IBook } from "@/types";


interface BookCardProps {
  book: IBook;
}

export default function BookCard({ book }: BookCardProps) {
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(id).unwrap();
        toast.success("Book deleted successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete book.");
      }
    }
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="px-10 pt-10">
        <img 
          src={book.image || 'https://placehold.co/400x225/EEE/31343C?text=No+Image'} 
          alt={`Cover of ${book.title}`} 
          className="rounded-xl h-56 object-cover w-full" 
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{book.title}</h2>
        <p className="text-sm text-gray-500">by {book.author}</p>
        <div className="flex gap-2 my-2">
            <div className="badge badge-outline">{book.genre}</div>
            {book.available ? (
                <div className="badge badge-success">Available ({book.copies})</div>
            ) : (
                <div className="badge badge-error">Unavailable</div>
            )}
        </div>
        <div className="card-actions mt-4">
            <Button variant="outline" size="sm" asChild>
                <Link to={`/edit-book/${book._id}`}>Edit</Link>
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => handleDelete(book._id!)}
                disabled={isDeleting}
            >
                {isDeleting ? '...' : 'Delete'}
            </Button>
            <Button variant="outline" size="sm" asChild>
                <Link to={`/borrow/${book._id}`}>Borrow</Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
