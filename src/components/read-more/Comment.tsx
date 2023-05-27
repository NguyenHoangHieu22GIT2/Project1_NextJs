import { Button } from "../UI/Button";
import { SystemUI } from "../UI/SystemUI";

export function Comment() {
  return (
    <section>
      <SystemUI>
        <h1 className="text-4xl col-span-12 font-bold">Ratings:</h1>
        <div className="col-span-12 flex gap-5">
          <button className="flex gap-2 items-center px-5 py-2 shadow-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ee4d2d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ee4d2d"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>1 Star</span>
          </button>
          <button className="flex gap-2 items-center px-5 py-2 shadow-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ee4d2d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ee4d2d"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>2 Star</span>
          </button>
          <button className="flex gap-2 items-center px-5 py-2 shadow-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ee4d2d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ee4d2d"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>3 Star</span>
          </button>
          <button className="flex gap-2 items-center px-5 py-2 shadow-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ee4d2d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ee4d2d"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>4 Star</span>
          </button>
          <button className="flex gap-2 items-center px-5 py-2 shadow-xl ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ee4d2d"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ee4d2d"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <span>5 Star</span>
          </button>
        </div>
        <form className="col-span-12 ">
          <div className="flex gap-2">
            <input
              type="text"
              className="w-full px-2 py-2 border-2 border-slate-900 rounded-lg"
              placeholder="What do you think about the product ?"
            />
            <Button>Comment</Button>
          </div>
          <div className="[&>*]:block">
            <div className="">
              <input type="radio" id="1star" name="star" value="1" />
              <label htmlFor="1star">1 Star</label>
            </div>
            <div>
              <input type="radio" id="2star" name="star" value="2" />
              <label htmlFor="2star">2 Star</label>
            </div>
            <div>
              <input type="radio" id="3star" name="star" value="3" />
              <label htmlFor="3star">3 Star</label>
            </div>
            <div>
              <input type="radio" id="4star" name="star" value="4" />
              <label htmlFor="4star">4 Star</label>
            </div>
            <div>
              <input type="radio" id="5star" name="star" value="5" />
              <label htmlFor="5star">5 Star</label>
            </div>
          </div>
        </form>
        <div>
          <ul>
            <li>
              <div></div>
              <div></div>
            </li>
          </ul>
        </div>
      </SystemUI>
    </section>
  );
}
