import Image from "next/image";
import { Button } from "../UI/Button";
import { SystemUI } from "../UI/SystemUI";
import { Like } from "../UI/SVG/Like";
import { Dislike } from "../UI/SVG/Dislike";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import {
  ApolloError,
  gql,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { useAppDispatch, useAppSelector } from "@/store";
import useAutosizeTextArea from "@/hooks/useAutoSizeTextArea";
import { Input } from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { LoadingSpinner } from "../UI/Loading";
import { Rating } from "@/types/Rating";
import { User } from "@/types/User.Schema";
import { lightNotificationActions } from "@/store/lightNotification";
import { Star } from "../UI/SVG/Star";
import { TextArea } from "../UI/Textarea";
import { BackgroundContainer } from "../UI/BackgroundContainer";
import { Avatar } from "../UI/Avatar";
const MUTATION_ADD_RATING = gql`
  mutation addRating($input: CreateRatingInput!) {
    AddRating(createRatingInput: $input) {
      _id
      title
      userId
      createdAt
      downvote
      upvote
      stars
      rating
    }
  }
`;

type props = {
  productId: string;
  pageRating: number;
};

const QUERY_PRODUCT_RATINGS = gql`
  query ratings($input: GetRatingInput!) {
    getRatings(getRatingInput: $input) {
      _id
      title
      userId
      createdAt
      downvote
      upvote
      stars
      rating
    }
  }
`;

const QUERY_PRODUCT_RATINGS_COUNT = gql`
  query getRatingsCount($input: String!) {
    getRatingsCount(productId: $input)
  }
`;

const MUTATION_UP_VOTE = gql`
  mutation toggleUpvote($input: ToggleVoteInput!) {
    toggleUpvote(toggleUpvoteInput: $input) {
      _id
      createdAt
      upvote
      downvote
      rating
      stars
      title
      userId
      title
    }
  }
`;

const MUTATION_DOWN_VOTE = gql`
  mutation toggleDownvote($input: ToggleVoteInput!) {
    toggleDownvote(toggleDownvoteInput: $input) {
      _id
      createdAt
      upvote
      downvote
      rating
      stars
      title
      userId
      title
    }
  }
`;

const SKIP = 4;
const LIMIT = 4;
export function Comment(props: props) {
  const dispatch = useAppDispatch();
  const [ratingComments, setRatingComments] = useState<Rating[]>([]);
  const [toggleUpvoteFn] = useMutation(MUTATION_UP_VOTE);
  const [toggleDownvoteFn] = useMutation(MUTATION_DOWN_VOTE);
  const [ratingsCount, setRatingsCount] = useState(0);
  const [getRatingsDataGraphqlFn] = useLazyQuery(QUERY_PRODUCT_RATINGS, {
    fetchPolicy: "no-cache",
  });
  const {
    loading,
    data: ratingsData,
    error,
  } = useQuery(QUERY_PRODUCT_RATINGS, {
    variables: {
      input: {
        productId: props.productId,
        skip: (props.pageRating - 1) * SKIP,
        limit: LIMIT,
      },
    },
  });
  useEffect(() => {
    if (ratingsData) {
      setRatingComments(ratingsData.getRatings);
    }
  }, [ratingsData]);
  const titleInput = useInput((data) => data.length > 10);
  const textAreaInput = useInput((data) => data.length > 20);
  const auth = useAppSelector((state) => state.auth);
  const [text, setText] = useState("");
  const [addRatingFn] = useMutation(MUTATION_ADD_RATING);
  const [stars, setStars] = useState(0);
  const [ratingStars, setRatingStars] = useState(0);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  function changeStar(e: MouseEvent<HTMLInputElement, globalThis.MouseEvent>) {
    setStars(+e.currentTarget.value);
  }
  let ratings: any = <LoadingSpinner />;
  async function downvote(productId: string, ratingId: string) {
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    } else {
      const result = await toggleDownvoteFn({
        variables: {
          input: {
            productId,
            ratingId,
          },
        },
        context: {
          headers: {
            authorization: `bearer ${auth.token}`,
          },
        },
      });
      if (result.errors) {
        setRatingComments([]);
        return;
      }
      const rating = result.data.toggleDownvote as Rating;
      if (rating) {
        setRatingComments((prevArray) => {
          const newRatings = prevArray.map((r) => {
            if (r._id.toString() === rating._id.toString()) {
              r = rating;
            }
            return r;
          });
          return newRatings;
        });
      }
    }
  }

  async function getRatingsBasedOffStars(stars: number) {
    setRatingStars(stars);
    const result = await getRatingsDataGraphqlFn({
      variables: {
        input: {
          limit: 5,
          skip: 0,
          productId: props.productId,
          stars: stars,
        },
      },
    });
    if (result.data) {
      const data = result.data;
      setRatingComments(data.getRatings);
    }
  }
  async function getMoreRatings(stars: number) {
    const result = await getRatingsDataGraphqlFn({
      variables: {
        input: {
          limit: 4,
          skip: ratingComments.length,
          productId: props.productId,
          stars: stars,
        },
      },
    });
    if (result.data) {
      const data = result.data;
      setRatingComments((prevArray) => [...prevArray, ...data.getRatings]);
    }
  }
  async function upvote(productId: string, ratingId: string) {
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    } else {
      const result = await toggleUpvoteFn({
        variables: {
          input: {
            productId,
            ratingId,
          },
        },
        context: {
          headers: {
            authorization: `bearer ${auth.token}`,
          },
        },
      });
      if (result.errors) {
        setRatingComments([]);
        return;
      }
      const rating = result.data.toggleUpvote as Rating;
      if (rating) {
        setRatingComments((prevArray) => {
          const newRatings = prevArray.map((r) => {
            if (r._id.toString() === rating._id.toString()) {
              r = rating;
            }
            return r;
          });
          return newRatings;
        });
      }
    }
  }
  if (ratingComments) {
    ratings = ratingComments.map((rating: Rating, index) => {
      const date = new Date(rating.createdAt).toDateString();
      const user = JSON.parse(rating.userId) as User;
      return (
        <li key={rating._id} className="flex justify-between ">
          <div className="flex gap-5">
            <div>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + user.avatar}
                alt={user.username}
                width={50}
                height={50}
                className="rounded-full object-cover aspect-square"
              />
            </div>
            <div>
              <h1 className="font-bold text-lg">{rating.title}</h1>
              <code>{rating.stars} Star</code>
              <p>{rating.rating}</p>
            </div>
          </div>
          <div>
            <time className="block">{date}</time>
            <div className="flex gap-3">
              <button
                className="flex gap-2"
                onClick={upvote.bind(null, props.productId, rating._id)}
              >
                <span>{rating.upvote.length}</span>
                <Like />
              </button>
              <button
                onClick={downvote.bind(null, props.productId, rating._id)}
                className="flex gap-2"
              >
                <span>{rating.downvote.length}</span>
                <Dislike />
              </button>
            </div>
          </div>
        </li>
      );
    });
  }
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    }
    if (
      titleInput.value.trim().length > 5 &&
      textAreaInput.value.trim().length > 10
    ) {
      try {
        const result = await addRatingFn({
          variables: {
            input: {
              title: titleInput.value,
              productId: props.productId,
              rating: textAreaInput.value,
              stars,
            },
          },
          context: {
            headers: {
              authorization: `bearer ${auth.token}`,
            },
          },
        });
        if (result.data) {
          setRatingComments((prevArray) => [
            result.data.AddRating,
            ...prevArray,
          ]);
          dispatch(
            lightNotificationActions.createNotification({
              status: "success",
              title: "Added Comment",
            })
          );
        }
      } catch (error: unknown) {
        if (error instanceof ApolloError)
          dispatch(
            lightNotificationActions.createNotification({
              status: "error",
              title: error.message,
            })
          );
      }
    }
  }
  useAutosizeTextArea(commentRef.current, text);

  return (
    <section className="col-span-6 grid-cols-12 grid self-start">
      <BackgroundContainer>
        <h1 className="text-4xl col-span-12 font-bold">Ratings:</h1>

        <form onSubmit={submit} className="col-span-12 ">
          <div className="mt-10 gap-10 flex flex-col">
            {/* <Input input={titleInput} label="Subject" type="text" /> */}
            <div className="flex items-center gap-5">
              <div>
                <Avatar
                  alt={auth.username}
                  avatarImageLink={auth.avatar}
                  height={50}
                  width={50}
                  className="object-cover aspect-square rounded-full"
                />
              </div>
              <div className="flex flex-col w-full gap-3">
                <input
                  onChange={(e) => titleInput.changeValue(e.target.value)}
                  value={titleInput.value}
                  placeholder="title"
                  type="text"
                  className="border p-2 outline-none rounded-lg
                  border-slate-400/50"
                />
                <textarea
                  onChange={(e) => textAreaInput.changeValue(e.target.value)}
                  value={textAreaInput.value}
                  className="border p-2 outline-none rounded-lg
                  border-slate-400/50"
                ></textarea>
              </div>
            </div>
            <div className="mb-5">
              <Button>Comment!</Button>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-3">
              <input
                onClick={changeStar}
                type="radio"
                id="1star"
                name="star"
                value="1"
              />
              <label htmlFor="1star">1 Star</label>
            </div>
            <div className="flex gap-3">
              <input
                onClick={changeStar}
                type="radio"
                id="2star"
                name="star"
                value="2"
              />
              <label htmlFor="2star">2 Star</label>
            </div>
            <div className="flex gap-3">
              <input
                onClick={changeStar}
                type="radio"
                id="3star"
                name="star"
                value="3"
              />
              <label htmlFor="3star">3 Star</label>
            </div>
            <div className="flex gap-3">
              <input
                onClick={changeStar}
                type="radio"
                id="4star"
                name="star"
                value="4"
              />
              <label htmlFor="4star">4 Star</label>
            </div>
            <div className="flex gap-3">
              <input
                onClick={changeStar}
                type="radio"
                id="5star"
                name="star"
                value="5"
              />
              <label htmlFor="5star">5 Star</label>
            </div>
          </div>
        </form>
        <div className="w-full h-[1px] my-3 col-span-12 bg-black"></div>
        <div className="col-span-12 my-5 flex flex-wrap gap-5">
          <button
            onClick={getRatingsBasedOffStars.bind(null, 1)}
            className="flex gap-2 items-center px-5 py-2 shadow-xl "
          >
            <Star isFilled={true} />
            <span>1 Star</span>
          </button>
          <button
            onClick={getRatingsBasedOffStars.bind(null, 2)}
            className="flex gap-2 items-center px-5 py-2 shadow-xl "
          >
            <Star isFilled={true} />
            <span>2 Star</span>
          </button>
          <button
            onClick={getRatingsBasedOffStars.bind(null, 3)}
            className="flex gap-2 items-center px-5 py-2 shadow-xl "
          >
            <Star isFilled={true} />
            <span>3 Star</span>
          </button>
          <button
            onClick={getRatingsBasedOffStars.bind(null, 4)}
            className="flex gap-2 items-center px-5 py-2 shadow-xl "
          >
            <Star isFilled={true} />
            <span>4 Star</span>
          </button>
          <button
            onClick={getRatingsBasedOffStars.bind(null, 5)}
            className="flex gap-2 items-center px-5 py-2 shadow-xl "
          >
            <Star isFilled={true} />
            <span>5 Star</span>
          </button>
        </div>
        <div className="col-span-12 flex flex-col gap-5">
          <ul className="flex flex-col gap-5">{ratings}</ul>
          {ratingComments.length != 0 && ratingComments.length % 4 == 0 && (
            <button
              onClick={getMoreRatings.bind(null, ratingStars)}
              className="border-4  rounded-lg px-5 py-2"
            >
              More...
            </button>
          )}
        </div>
      </BackgroundContainer>
    </section>
  );
}
