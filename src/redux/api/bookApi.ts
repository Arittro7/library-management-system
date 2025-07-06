import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_BASE_URL

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({baseUrl}),

  tagTypes: ["Book", "Borrow"],
  endpoints:(builder) => ({
    // add book
    addBook : builder.mutation({
      query:(bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["Book"],
    }),

    // get all book 
    getAllBooks : builder.query({
      query: () => "/books",
      providesTags: ["Book"],
    }),

    // get book using Id
    getBookById : builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["Book"],
    }),

    //delete book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // Update book 
    updateBook: builder.mutation({
      query: ({ id, ...updatedData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["Book"],
    }),

    // Borrow book
    borrowBook: builder.mutation({
      query: (borrowData) => ({
        url: `/borrow`, 
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Book", "Borrow"],
    }),

    // get all borrow book
    getAllBorrowSummary: builder.query({
      query: () => "/borrow",
      providesTags: ["Borrow"],
    }),
  })
})

export const {
  useAddBookMutation,
  useGetAllBooksQuery,
  useGetBookByIdQuery,
  useDeleteBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation, 
  useGetAllBorrowSummaryQuery } = bookApi;