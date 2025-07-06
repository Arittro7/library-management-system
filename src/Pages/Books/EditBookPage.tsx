import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetBookByIdQuery, useUpdateBookMutation, useDeleteBookMutation } from '@/redux/api/bookApi';
import { useForm } from 'react-hook-form';
import type { SubmitHandler, FieldValues } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';


export default function EditBookPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: bookResponse, isLoading: isFetching } = useGetBookByIdQuery(id!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
  const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

  const form = useForm<FieldValues>();

  useEffect(() => {
    if (bookResponse?.data) {
      form.reset(bookResponse.data);
    }
  }, [bookResponse, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = { ...data };
    bookData.copies = Number(bookData.copies);

    if (!bookData.image) {
      delete bookData.image;
    }

    try {
      await updateBook({ id, ...bookData }).unwrap();
      toast.success('Book updated successfully!');
      navigate('/books');
    } catch (err) {
      console.log(err);
      toast.error('Failed to update book.');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to permanently delete this book?')) {
        try {
            await deleteBook(id!).unwrap();
            toast.success('Book deleted successfully!');
            navigate('/books');
        } catch (err) {
          console.log(err);
            toast.error('Failed to delete book.');
        }
    }
  }

  if (isFetching) {
    return <div className="text-center mt-10">Loading book details...</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Book</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Genre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-gray-200'>
                      <SelectItem value="FICTION">Fiction</SelectItem>
                      <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                      <SelectItem value="SCIENCE">Science</SelectItem>
                      <SelectItem value="HISTORY">History</SelectItem>
                      <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                      <SelectItem value="FANTASY">Fantasy</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="copies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Book Cover Image URL</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="https://example.com/image.jpg" />
                </FormControl>
              </FormItem>
            )}
          />


          {/* ❌ Delete Book */}
          <div className="flex justify-between items-center gap-4 pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Book'}
            </Button>
            <div className="flex gap-4">
                <Button
                variant="outline"
                type="button"
                onClick={() => navigate('/books')}
                >
                Cancel
                </Button>
                <Button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
