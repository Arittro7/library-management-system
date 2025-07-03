import { createBrowserRouter } from "react-router";
import Root from "../Layout/Root";
import Books from "../Pages/Books/Books";
import Blog from "../Pages/Blog/Blog";
import About from "../Pages/About/About";
import Home from "../Pages/Home/Home";
import AddBook from "../Pages/Books/AddBook";
import BorrowSummary from "../Pages/Books/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/books',
        element: <Books></Books>
      },
      {
        path: '/add-books',
        element: <AddBook></AddBook>
      },
      {
        path: '/borrow-books',
        element: <BorrowSummary></BorrowSummary>
      },
      {
        path: '/blog',
        element: <Blog></Blog>
      },
      {
        path: '/about',
        element: <About></About>
      }
    ]
  }
])

export default router