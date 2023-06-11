import { Layout } from "@/components/Layout/Layout";
import { SystemUI } from "@/components/UI/SystemUI";
import { Messages } from "@/components/chat/Messages";
import { useAppDispatch, useAppSelector } from "@/store";
import { lightNotificationActions } from "@/store/lightNotification";
import Image from "next/image";
import { socket } from "../_app";
import { GetServerSideProps } from "next";
import { gql, useQuery } from "@apollo/client";
import { User } from "@/types/User.Schema";
import { useEffect, useState } from "react";
import { message } from "@/types/message";
const QUERY_ALL_USERS_MESSAGES = gql`
  {
    getAllMessages {
      _id
      username
      avatar
      isOnline
    }
  }
`;

export default function MessagePage() {
  const [history, setHistory] = useState<message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roomId, setRoomId] = useState<string>("");
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on("sendRoomFull", (data) => {
      console.log(data);
      setRoomId(data.roomId);
      setHistory(data.history);
    });
    socket.on("userOnline", (data) => {
      setUsers((prevArray) => {
        const filteredArray = prevArray.filter(
          (user) => user._id.toString() !== data.userId.toString()
        );

        const chosenUser = JSON.parse(
          JSON.stringify(
            prevArray.filter((user) => {
              return user._id.toString() === data.userId.toString();
            })[0]
          )
        );

        chosenUser.isOnline = data.isOnline;
        return [...filteredArray, chosenUser];
      });
    });
    socket.on("userOffline", (data) => {
      setUsers((prevArray) => {
        const filteredArray = prevArray.filter(
          (user) => user._id.toString() !== data.userId.toString()
        );
        const chosenUser = JSON.parse(
          JSON.stringify(
            prevArray.filter((user) => {
              return user._id.toString() === data.userId.toString();
            })[0]
          )
        );
        chosenUser.isOnline = data.isOnline;
        return [...filteredArray, chosenUser];
      });
    });
    socket.on("sendMessage", (data) => {
      setHistory((prevHistory) => [...prevHistory, data]);
    });
    return () => {
      socket.off("sendMessage");
    };
  }, [socket]);

  const {
    data: dataUserMessages,
    loading: loadingUserMessages,
    error: errorUserMessages,
  } = useQuery(QUERY_ALL_USERS_MESSAGES, {
    context: {
      headers: {
        authorization: `bearer ${auth.token}`,
      },
    },
  });
  useEffect(() => {
    if (
      !loadingUserMessages &&
      !errorUserMessages &&
      dataUserMessages.getAllMessages[0]
    ) {
      socket.emit("joinRoomFull", {
        users: [dataUserMessages.getAllMessages[0]._id, auth.userId],
        joinerId: auth.userId,
      });
    }
    if (dataUserMessages && dataUserMessages.getAllMessages) {
      setUsers(dataUserMessages.getAllMessages);
    }
  }, [dataUserMessages]);

  function joinRoom(userId: string) {
    if (!auth.userId) {
      dispatch(
        lightNotificationActions.createNotification({
          status: "error",
          title: "You have to login first!!!",
        })
      );
      return;
    }
    socket.emit("joinRoomFull", {
      users: [userId, auth.userId],
      joinerId: auth.userId,
    });
  }

  return (
    <Layout>
      <section className="my-5">
        <SystemUI>
          <div className="col-span-12 h-[80vh] flex [&>*]:w-full">
            <div className="bg-slate-200 basis-1/3 px-5 py-2">
              <ul>
                {users.map((user: User) => {
                  return (
                    <li key={user._id} className="flex">
                      <button
                        className="flex cursor-pointer items-center gap-5 w-full"
                        onClick={joinRoom.bind(null, user._id)}
                      >
                        <div className="w-12">
                          <Image
                            width={50}
                            height={50}
                            className="rounded-full aspect-square object-cover"
                            src={
                              process.env.NEXT_PUBLIC_SERVER_IMAGE_URI +
                              user.avatar
                            }
                            alt={user.username}
                          ></Image>
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                          color="green"
                          // fill="rgb(34 197 94)"
                          fill="red"
                        >
                          <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                        </svg>
                      </button>

                      <div>
                        <h1 className="font-bold">{user.username}</h1>
                        <p
                          className={`font-semibold  ${
                            user.isOnline ? "text-green-500" : "text-gray-500"
                          }  flex items-center gap-2 `}
                        >
                          <span className="inline">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height="1em"
                              viewBox="0 0 512 512"
                              color="green"
                              // fill="rgb(34 197 94)"
                              fill={`${
                                user.isOnline
                                  ? "rgb(34 197 94)"
                                  : " rgb(107 114 128)"
                              }`}
                            >
                              <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                            </svg>
                          </span>
                          {user.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="bg-stone-900 px-5 py-2">
              <Messages
                history={history}
                roomId={roomId}
                senderId={auth.userId}
              />
            </div>
          </div>
        </SystemUI>
      </section>
    </Layout>
  );
}
