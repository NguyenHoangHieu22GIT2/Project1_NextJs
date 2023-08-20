import { FormEvent, PropsWithChildren, useEffect, useState } from "react";
import { SystemUI } from "../UI/SystemUI";
import Image from "next/image";
import { Button } from "../UI/Button";
import { ApolloError, gql, useMutation, useQuery } from "@apollo/client";
import { LoadingSpinner } from "../UI/Loading";
import { Product } from "@/types/Product";
import { useAppDispatch, useAppSelector } from "@/store";
import { Star } from "../UI/SVG/Star";
import { lightNotificationActions } from "@/store/lightNotification";
import { socket } from "@/pages/_app";
import { moneyFormatterVn } from "@/utils/moneyFormatterVn";
import { Minus } from "../UI/SVG/Minus";
import { Plus } from "../UI/SVG/Plus";
import { BackgroundContainer } from "../UI/BackgroundContainer";
import { Option } from "@/types/Option";

type props = {
  product: Product;
  csrfToken: string;
};

const MUTATION_ADD_TO_CART = gql`
  mutation addToCart($input: AddToCartInput!) {
    addToCart(addToCartInput: $input) {
      title
    }
  }
`;

const QUERY_ALL_PRODUCTS_COUNT_ONE_USER = gql`
  query findCountProducts($input: ProductFindOptions!) {
    countProducts(productFindOptions: $input)
  }
`;

export const ReadMore: React.FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => {
    return state.auth;
  });
  let totalStars = 0;
  let ratingsLength = 0;
  props.product.ratings.map((rating) => {
    totalStars += +rating.stars;
    ratingsLength++;
  });
  if (totalStars > 0 && ratingsLength > 0)
    totalStars = totalStars / ratingsLength;

  const [imageTargeted, setImageTargeted] = useState<number>(0);
  const [product, setProduct] = useState<Product>();
  const [chosenOption, setChosenOption] = useState<Option>(
    props.product.options[0]
  );
  const [quantity, setQuantity] = useState(0);
  const [addToCartFn, { loading, data, error }] =
    useMutation(MUTATION_ADD_TO_CART);
  useEffect(() => {
    setProduct(props.product);
  }, [props.product]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!auth.token) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "Something gone wrong, have you logged In?",
        })
      );
    } else if (
      quantity > 0 &&
      product &&
      product.userId.toString() !== auth.userId.toString()
    ) {
      try {
        const result = await addToCartFn({
          variables: {
            input: { productId: product._id, quantity },
          },
          context: {
            headers: {
              authorization: `bearer ${auth.token}`,
            },
          },
        });
        if (result.data) {
          console.log("Light Notification changed");
          dispatch(
            lightNotificationActions.createNotification({
              status: "success",
              title: "Added successfully",
            })
          );
        }
      } catch (error) {
        if (error instanceof ApolloError)
          dispatch(
            lightNotificationActions.createNotification({
              status: "error",
              title: error.message,
            })
          );
      }
    } else {
      dispatch(
        lightNotificationActions.createNotification({
          status: "warning",
          title: "You can not add to your cart your own products",
        })
      );
    }
  }
  function joinRoom() {
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    }
    socket.emit("joinRoomLite", {
      users: [props.product.userId, auth.userId],
      joinerId: auth.userId,
    });
  }
  let pageContent = <LoadingSpinner />;
  if (product) {
    pageContent = (
      <BackgroundContainer className="gap-5">
        <div className="w-full aspect-square relative sm:col-span-6 col-span-12">
          <Image
            sizes="80vw"
            width={10000}
            height={10000}
            className="col-span-12 object-cover aspect-square"
            src={
              process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
              product.images[imageTargeted]
            }
            alt={product.title}
          />
          <div className="flex mt-5 flex-wrap gap-3">
            {product.images.map((image, index) => {
              if (index != imageTargeted) {
                return (
                  <Image
                    key={index}
                    className="cursor-pointer object-cover aspect-square"
                    onClick={() => {
                      setImageTargeted(index);
                    }}
                    src={
                      process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                      product.images[index]
                    }
                    alt={product.title}
                    width={100}
                    height={100}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 lex flex-col justify-between">
          <h1 className=" font-bold text-xl sm:text-2xl">{product.title}</h1>
          <div className="flex gap-2">
            <div>
              <h6 className="text-[#ee4d2d] inline-block relative before:content-[''] before:w-full before:h-[1px] before:bg-[#ee4d2d] before:absolute before:bottom-0 before:left-0">
                {totalStars}
              </h6>
              <Star isFilled={totalStars >= 1 ? true : false} />
              <Star isFilled={totalStars >= 2 ? true : false} />
              <Star isFilled={totalStars >= 3 ? true : false} />
              <Star isFilled={totalStars >= 4 ? true : false} />
              <Star isFilled={totalStars >= 5 ? true : false} />
            </div>
            <span className="text-gray-500/80">|</span>
            <div>
              <span className="relative before:content-[''] before:w-full before:h-[1px] before:bg-[#000] before:absolute before:bottom-0 before:left-0">
                {props.product.ratings.length}
              </span>
              &nbsp;
              <span>Ratings</span>
            </div>
            <span className="text-gray-500/80">|</span>
            <div>
              <span>{props.product.hasSold.quantity || 0}</span>
              &nbsp;
              <span>Buys</span>
            </div>
          </div>
          <div className=" bg-gray-100 mt-5 flex flex-row items-center gap-2 px-5 py-2 text-xl">
            {product.discount > 0 ? (
              <>
                <p className="relative text-[#6b737f] before:content-[''] before:w-10 before:h-[2px] before:bg-[#6b737f] before:absolute before:bottom-1/2 before:left-0">
                  <span className="text-sm">$</span>
                  {product.price}
                </p>
                <p className="text-3xl text-[#ee4d2d]">
                  <span className="text-sm">$</span>
                  {product.price - (product.price * +product.discount) / 100}
                </p>
                <p className="bg-[#ee4d2d] text-white px-4 py-2">
                  {+product.discount}% off
                </p>
              </>
            ) : (
              <p className="text-3xl text-[#ee4d2d]">
                {/* <span className="text-sm">$</span> */}
                {chosenOption?.price | product.price}
              </p>
            )}
          </div>
          <div className="flex gap-10 my-5 items-center">
            <h1>Options</h1>
            <div>
              <ul className="flex gap-5 text-sm">
                {props.product.options.map((option) => {
                  return (
                    <li>
                      <button
                        onClick={() => setChosenOption(option)}
                        className="border-2 px-5 py-2"
                      >
                        {option.optionName}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <p className="col-span-12 text-gray-700">{product.description}</p>
          <form onSubmit={submit} className="py-5 ">
            <label
              htmlFor="quantity"
              className="font-semibold block my-5 capitalize"
            >
              quantity
            </label>
            <div className="flex">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (quantity > 0) setQuantity(quantity - 1);
                }}
                className="border rounded-tl-lg rounded-bl-lg p-2"
              >
                <Minus />
              </button>
              <input
                onChange={(e) => {
                  if (+e.target.value <= product.stock)
                    setQuantity(+e.target.value);
                }}
                value={quantity}
                type="number"
                className="outline-none border   w-24 text-center     p-2 "
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (quantity < product.stock) setQuantity(quantity + 1);
                }}
                className="border  rounded-tr-lg rounded-br-lg p-2"
              >
                <Plus />
              </button>
            </div>
            <div className="my-5 text-gray-400 italic">
              {product.stock} in stock
            </div>
            <Button classNames="col-span-12 block my-5 !text-sm whitespace-nowrap">
              Add To Cart
            </Button>
          </form>
        </div>
        <div className="col-span-12 shadow-2xl items-center px-5 py-2 flex w-full justify-between">
          <div className="flex items-center gap-5">
            <Image
              src={
                process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                props.product.user.avatar
              }
              width={50}
              height={50}
              alt="Shop's avatar"
              className="aspect-square  object-cover rounded-full"
            />
            <h1>{props.product.user.username}</h1>
          </div>
          <div>3 Products</div>
          {auth.userId !== props.product.userId && (
            <div>
              <Button onClick={joinRoom}>Chat</Button>
            </div>
          )}
        </div>
      </BackgroundContainer>
    );
  }
  return (
    <section className="my-5  text-gray-900">
      <SystemUI>{pageContent}</SystemUI>
    </section>
  );
};
