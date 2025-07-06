
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm, type SubmitHandler, type FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { useUpdateBookMutation } from "@/redux/api/bookApi";

interface UpdateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultValues: any;
}

export function UpdateBookModal({ isOpen, onClose, defaultValues }: UpdateBookModalProps) {
  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      image: "",
      genre: "",
      isbn: "",
      copies: 0,
      available: true,
      description: "",
    },
  });

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await updateBook({ id: defaultValues._id, updatedData: data }).unwrap();
      toast.success("Book updated successfully!");
      onClose(); 
    } catch (error) {
      toast.error("Failed to update book");
      console.error("Update error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <FormField control={form.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />

            {/* Author */}
            <FormField control={form.control} name="author" render={({ field }) => (
              <FormItem><FormLabel>Author</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />

            {/* Image */}
            <FormField control={form.control} name="image" render={({ field }) => (
              <FormItem><FormLabel>Image</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />

            {/* Genre */}
            <FormField control={form.control} name="genre" render={({ field }) => (
              <FormItem>
                <FormLabel>Genre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select Genre" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FICTION">FICTION</SelectItem>
                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                    <SelectItem value="FANTASY">FANTASY</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            {/* ISBN */}
            <FormField control={form.control} name="isbn" render={({ field }) => (
              <FormItem><FormLabel>ISBN</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />

            {/* Copies */}
            <FormField control={form.control} name="copies" render={({ field }) => (
              <FormItem>
                <FormLabel>Copies</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )} />

            {/* Available */}
            <FormField control={form.control} name="available" render={({ field }) => (
              <FormItem>
                <FormLabel>Available</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(value === "true")}
                  defaultValue={field.value ? "true" : "false"}
                >
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">True</SelectItem>
                    <SelectItem value="false">False</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )} />

            {/* Description */}
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl></FormItem>
            )} />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

 