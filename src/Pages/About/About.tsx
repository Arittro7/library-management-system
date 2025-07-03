const About = () => {
  return (
    <div className="lg:w-7xl p-4 mx-auto flex flex-col items-center">
      <h1 className="text-3xl">It's a Course Assignment</h1>
      <p className="text-justify mt-4">
        Develop a minimal library management system using React, Redux Toolkit
        Query (RTK Query), and TypeScript. The system will allow users to view a
        list of books, perform CRUD operations, borrow books, and view a simple
        borrow summary—all without authentication, category filters, or payment
        integration. The main goal is to build a functional and clean
        client-side application that interacts with a RESTful API, demonstrating
        proper state management, UI design, and core functionality.
      </p>
    </div>
  );
};

export default About;
