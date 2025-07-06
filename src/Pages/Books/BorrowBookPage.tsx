import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useBorrowBookMutation } from '@/redux/api/bookApi';
import { useForm } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import type { IBook } from '@/types';

// This page handles the process of borrowing a specific book.

export default function BorrowBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookResponse, isLoading: isFetching } = useGetBookByIdQuery(id!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const form = useForm<FieldValues>({
    defaultValues: {
      quantity: 1,
      dueDate: '', 
    }
  });
  const book: IBook | undefined = bookResponse?.data;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!book) {
      toast.error('Book data is not available.');
      return;
    }

    if (!data.quantity || !data.dueDate) {
        toast.error("Please fill in both quantity and due date.");
        return;
    }

    const quantity = Number(data.quantity);
    if (quantity > book.copies) {
      toast.error(`You cannot borrow more than the available ${book.copies} copies.`);
      return;
    }

    const borrowData = {
      book: book._id,
      quantity: quantity,
      dueDate: data.dueDate,
    };

    try {
      await borrowBook(borrowData).unwrap();
      toast.success('Book borrowed successfully!');
      navigate('/borrow-summary');
    } catch (err) {
      toast.error('Failed to borrow the book. It might be unavailable.');
      console.error('Borrow Error:', err);
    }
  };

  if (isFetching) {
    return <div className="text-center mt-10">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center mt-10 text-red-500">Could not find the requested book.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-3xl font-bold mb-2 text-center">Borrow Book</h1>
      <p className="text-lg text-center text-gray-600 mb-8">You are borrowing: <span className="font-semibold">{book.title}</span></p>
      
      <div className="bg-base-200 p-6 rounded-lg shadow-md mb-6">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p className="font-bold text-green-600"><strong>Copies Available:</strong> {book.copies}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity to Borrow</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max={book.copies} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" type="button" onClick={() => navigate('/books')}>
              Cancel
            </Button>
            <Button type="submit" disabled={isBorrowing || !book.available}>
              {isBorrowing ? 'Processing...' : 'Confirm Borrow'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
