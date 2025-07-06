import { useGetAllBorrowSummaryQuery } from "@/redux/api/bookApi";

interface IBorrowSummary {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export default function BorrowSummary() {
  const { data, error, isLoading } = useGetAllBorrowSummaryQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  
  if (error) {
    return <p className="text-center mt-10 text-red-500">Error loading borrow summary</p>;
  }
  const summaryList: IBorrowSummary[] = data?.date || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Borrow Summary</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full shadow-lg">
          <thead className="bg-base-200 text-base">
            <tr>
              <th>Book Title</th>
              <th>ISBN</th>
              <th className="text-center">Total Borrowed</th>
            </tr>
          </thead>
          <tbody>
            {summaryList.length > 0 ? (
              summaryList.map((item, index) => (
                <tr key={index} className="hover">
                  <td className="font-medium">{item.book.title}</td>
                  <td>{item.book.isbn}</td>
                  <td className="text-center font-bold text-xl">
                    {item.totalQuantity}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-8">
                  No books have been borrowed yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
