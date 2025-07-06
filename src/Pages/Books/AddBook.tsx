import bnrImg from '../../assets/addBook.jpg'
import { AddBookModal } from './AddBookModal'
const AddBook = () => {
  return (
    <div className="min-h-[calc(108vh-200px)]">
      <header>
        <div
          className="w-full bg-center bg-cover h-screen"
          style={{
            backgroundImage:
              `url('${bnrImg}')`,
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
            <div className="text-center">
              <h1 className="text-3xl space-y-4 p-4 font-semibold text-white lg:text-4xl">
                Add book on the Database
              </h1>
              
              <div className="mt-12">
                <AddBookModal/>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AddBook;