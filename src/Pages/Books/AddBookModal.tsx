import { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { useAddBookMutation } from "@/redux/api/bookApi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

export function AddBookModal() {
  const [open, setOpen] = useState(false);
  const [addBook, { isLoading }] = useAddBookMutation();

  const form = useForm<FieldValues>({
    defaultValues: {
      title: "",
      author: "",
      genre: "FICTION",
      isbn: "",
      description: "",
      copies: 1,
      image: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const bookData = { ...data };
    bookData.copies = Number(bookData.copies);

    if (!bookData.image) {
      delete bookData.image;
    }

    try {
      await addBook(bookData).unwrap();
      toast.success("Book added successfully!");
      form.reset();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to add book. Please try again.");
      console.error("Submission Error:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] bg-white">
        <DialogHeader>
          <DialogTitle>Add a New Book</DialogTitle>
          <DialogDescription>
            Fill in the details below to add a new book to the collection.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="author" render={({ field }) => (
                <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )}/>
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="genre" render={({ field }) => (
                  <FormItem>
                      <FormLabel>Genre</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select Genre" /></SelectTrigger></FormControl>
                          <SelectContent className="bg-gray-200">
                              <SelectItem value="FICTION">Fiction</SelectItem>
                              <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                              <SelectItem value="SCIENCE">Science</SelectItem>
                              <SelectItem value="HISTORY">History</SelectItem>
                              <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                              <SelectItem value="FANTASY">Fantasy</SelectItem>
                          </SelectContent>
                      </Select>
                  </FormItem>
              )}/>
              <FormField control={form.control} name="isbn" render={({ field }) => (
                  <FormItem><FormLabel>ISBN</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )}/>
            </div>
            <FormField control={form.control} name="copies" render={({ field }) => (
                <FormItem><FormLabel>Copies</FormLabel><FormControl><Input type="number" {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
            )}/>
            <FormField control={form.control} name="image" render={({ field }) => (
                <FormItem>
                    <FormLabel>Book Cover Image URL</FormLabel>
                    <FormControl><Input {...field} placeholder="https://example.com/image.jpg" /></FormControl>
                </FormItem>
            )}/>
            <DialogFooter>
              <DialogClose asChild><Button variant="outline" type="button">Cancel</Button></DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Add Book"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}