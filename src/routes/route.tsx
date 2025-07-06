import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Books from "../Pages/Books/Books";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import AddBook from "../Pages/Books/AddBook";
import BorrowSummary from "../Pages/Books/BorrowSummary";
import EditBookPage from "@/Pages/Books/EditBookPage";
import BorrowBookPage from "@/Pages/Books/BorrowBookPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/books",
        element: <Books></Books>,
      },
      {
        path: "/add-books",
        element: <AddBook></AddBook>,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary></BorrowSummary>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/edit-book",
        element: <EditBookPage></EditBookPage>,
      },
      {
        path: "/edit-book/:id",
        element: <EditBookPage></EditBookPage>,
      },
      {
        path: "/borrow/:id",
        element: <BorrowBookPage></BorrowBookPage>,
      },
    ],
  },
]);

export default router;
