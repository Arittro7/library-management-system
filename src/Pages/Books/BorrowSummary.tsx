
// import { useGetAllBorrowSummaryQuery } from "@/redux/api/bookApi";


// export function BorrowSummary() {
//   const { data, error, isLoading } = useGetAllBorrowSummaryQuery(undefined);
//   console.log("data is ", data);
  

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading borrow summary</p>;

 
//   return (
//     <div className="min-h-[calc(108vh-200px)]">
//       <h2 className="text-2xl font-bold text-center justify-center mt-10 mb-4">Borrow Summary</h2>
//       <hr />
//       <table className="max-w-7xl mt-10 mx-auto border border-gray-300">
//         <thead>
//           <tr className="">
//             <th className="border px-4 py-2">Book Title</th>
//             <th className="border px-4 py-2">ISBN</th>
//             <th className="border px-4 py-2">Total Quantity Borrowed</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.data.map((item: any, index: number) => (
//             <tr key={index} className="text-center">
//               <td className="border px-4 py-2">{item.book.title}</td>
//               <td className="border px-4 py-2">{item.book.isbn}</td>
//               <td className="border px-4 py-2">{item.totalQuantity}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
