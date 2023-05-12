import { useInput } from "@/hooks/useInput";
import { Input } from "../UI/Input";
import SystemUI from "../UI/SystemUI";
import { Button } from "../UI/Button";
import { TextArea } from "../UI/Textarea";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";
import { NotificationCard } from "../UI/NotificationCard";
import { useRouter } from "next/router";

type props = {
  token: string;
};

const MUTATION_CREATE_PRODUCT = gql`
  mutation createProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
      title
    }
  }
`;

export function CreateProduct(props: props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [createProductFn, {}] = useMutation(MUTATION_CREATE_PRODUCT);
  const titleInput = useInput((data) => {
    return data.length > 10;
  });
  const priceInput = useInput((data) => {
    return +data > 0;
  });
  const descriptionInput = useInput((data) => {
    return data.length > 20;
  });
  const imageInput = useInput((data) => {
    return /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
      data
    );
  });

  const formIsValid =
    titleInput.isValid &&
    descriptionInput.isValid &&
    priceInput.isValid &&
    imageInput.isValid;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    try {
      const result = await createProductFn({
        variables: {
          input: {
            title: titleInput.value,
            price: +priceInput.value,
            description: descriptionInput.value,
            imageUrl: imageInput.value,
            token: props.token,
          },
        },
        context: {
          headers: {
            authorization: `bearer ${sessionStorage.getItem("token")}`,
          },
        },
      });
      console.log(result);
      if (result.errors) {
        dispatch(
          notificationActions.createNotification({
            status: "error",
            title: "Create Product Failed...",
            description: "Please check your information, thank you.",
          })
        );
      }
      if (result.data) {
        dispatch(
          notificationActions.createNotification({
            status: "success",
            title: "Create Product Successfully",
            description:
              "Your product is now on the deals, let's wait and get some bread",
          })
        );
      }
    } catch (error: any) {
      dispatch(
        notificationActions.createNotification({
          status: "error",
          title: "Create Product Failed...",
          description: error.message,
        })
      );
    }
  }
  function turnOffNotificationCard() {
    dispatch(notificationActions.deleteNotification({}));
  }
  return (
    <section className="my-10">
      <NotificationCard
        buttonContent="Okay"
        onClickFunction={(status) => {
          turnOffNotificationCard();
          if (status === "success") {
            router.replace("/");
          }
        }}
      ></NotificationCard>
      <SystemUI>
        <div className="col-span-12 grid grid-cols-12 ">
          <h1 className="text-center uppercase border-b-2 border-dotted border-b-blue-300 text-white text-subHeading col-span-12">
            Create Product
          </h1>
          <form className="col-span-12 mt-14 [&>*]:mb-10" onSubmit={submit}>
            <Input label="Title" type="text" input={titleInput} />
            <Input label="Price" type="text" input={priceInput} />
            <TextArea label="Description" input={descriptionInput} />
            <Input label="Image Url" type="text" input={imageInput} />
            <Button>Create now</Button>
          </form>
        </div>
      </SystemUI>
    </section>
  );
}
