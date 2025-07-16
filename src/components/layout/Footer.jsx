import { TextComponent } from "./common";

const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="flex flex-row ">
        <div className="ml-16 basis-3/5">
          <div className="ml-24">
            <TextComponent text="Follow us on" title fontSize="35px"/>
            <TextComponent text="subscribe to our mailing list" title/>
            <form className="flex mt-5">
              <input type="email"
                placeholder="Email Address"
                className="border-b border-black focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="border border-black px-5 py-2 ml-5 uppercase text-sm hover:bg-black hover:text-white "
              >
                Sign Up
              </button>
            </form>
          </div>

          <div className="grid grid-cols-3 gap-0 mt-10">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3FfxOT6emfZzgN8uPDhdFN_QXLDIyEmLfuQ&s"
              alt=""
              className="w-[200px]  h-[200px]  object-cover "
            />
            <img src="https://giasuhanoigioi.edu.vn/wp-content/uploads/2019/08/cach-hoc-gioi-van-3.jpg"
              alt=""
              className="w-[200px] h-[200px]  object-cover "
            />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwCuQmHvQ0osCwNfvYL3nuZSbnRqKGW3LnJw&s" alt=""
              className="w-[200px] h-[200px] object-cover "
            />
            
            <div className="col-start-2 row-start-2 flex justify-center mt-4">
              <button className="bg-yellow-600 text-white px-5 py-2 hover:bg-yellow-400 text-sm">
                Load More
              </button>
            </div>
          </div>

        </div>
        <div className="basis-2/5 flex flex-row items-center">
          <div className="mr-20">
            <p>
              <span className="text-2xl font-medium font-serif mb-3">Shop</span>
            </p>
            <p>
              <span className="text-2xl font-medium font-serif mb-3">About</span>
            </p>
            <p>
              <span className="text-2xl font-medium font-serif mb-3">Contact</span>
            </p>
            <p>
              <span className="text-2xl font-medium font-serif mb-3">Lookbook</span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-2xl font-medium font-serif mb-3">Shipping & Returns</span>
            </p>
            <p>
              <span className="text-2xl font-medium font-serif mb-3">Paying Methods</span>
            </p>
          </div>
        </div>
      </div>

    </footer>
  )

};

export default Footer;  