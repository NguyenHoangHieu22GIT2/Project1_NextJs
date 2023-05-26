import { useInput } from "@/hooks/useInput";
import { Input } from "../UI/Input";
import { SystemUI } from "../UI/SystemUI";
import { Button } from "../UI/Button";
import { TextArea } from "../UI/Textarea";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { notificationActions } from "@/store/notification";
import { NotificationCard } from "../UI/NotificationCard";
import { useRouter } from "next/router";
import { Stream } from "stream";
import { useDropzone } from "react-dropzone";
import { toBase64 } from "@/utils/toBase64";

type props = {
  token: string;
  salt: string;
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
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    ([file]: [File]) => {
      setFile(file);
    },
    [setFile]
  );
  //@ts-ignore
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const dispatch = useAppDispatch();

  const [createProductFn, {}] = useMutation(MUTATION_CREATE_PRODUCT);
  const token = useAppSelector((state) => state.auth.token);
  const [tags, setTags] = useState<any[]>([]);
  const updateTagName = (index: number, newName: string) => {
    const newTags = [...tags];
    newTags[index].name = newName;
    setTags(newTags);
  };
  const updateTagOptions = (index: number, newOptions: string[]) => {
    const newTags = [...tags];
    newTags[index].options = newOptions;
    setTags(newTags);
  };
  const [tagElement, setTagElement] = useState<number>(0);
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
  const stockInput = useInput((data) => {
    return +data > 100;
  });
  const discountInput = useInput((data) => {
    return +data >= 0;
  });

  const formIsValid =
    titleInput.isValid && descriptionInput.isValid && priceInput.isValid;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }
    if (file!.type !== "jpg" && file!.type !== "jpeg" && file!.type !== "png") {
      return;
    }
    try {
      await fetch("http://localhost:4000/uploadFile", {
        method: "POST",
        body: JSON.stringify({
          fileName: props.salt + file!.name,
          fileBase64: await toBase64(file!),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await createProductFn({
        variables: {
          input: {
            title: titleInput.value,
            price: +priceInput.value,
            description: descriptionInput.value,
            token: props.token,
            stock: +stockInput.value,
            discount: +discountInput.value,
            image: props.salt + file!.name,
          },
        },
        context: {
          headers: {
            authorization: `bearer ${token}`,
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
  function createTagInput() {
    setTagElement(tagElement + 1);
    setTags((state) => [...state, { name: "", options: [] }]);
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
        <div className="col-span-12 grid grid-cols-12 text-gray-800 ">
          <h1 className="text-center uppercase border-b-2 border-dotted border-b-blue-300 font-bold text-subHeading col-span-12">
            Create Product
          </h1>
          <form
            encType="multipart/form-data"
            className="col-span-12 mt-14 [&>*]:mb-10"
            onSubmit={submit}
          >
            <Input label="Title" type="text" input={titleInput} />
            <Input label="Price" type="text" input={priceInput} />
            <TextArea label="Description" input={descriptionInput} />
            {/* <Input label="Image Url" type="file" input={imageInput} /> */}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
              )}
            </div>

            <Input
              label="How Many Stock do you have ?"
              type="text"
              input={stockInput}
            />
            <Input
              label="Want to discount ?"
              type="text"
              input={discountInput}
            />
            {/* {tags.map((tag, index) => (
              <section key={Math.random()}>
                <input
                  onChange={(e) => {
                    updateTagName(index, e.target.value);
                  }}
                  value={tag.name}
                  type="text"
                  placeholder="Tag"
                />
                <input
                  onChange={(e) => {
                    const valueSplit = e.target.value.split(" ");
                    const convertToOptions = valueSplit.filter(
                      (letter) => letter !== " "
                    );
                    console.log(convertToOptions);
                    updateTagOptions(index, convertToOptions);
                  }}
                  value={tag.options.toString().replaceAll(",", " ")}
                  type="text"
                  placeholder="options"
                />
              </section>
            ))}
            <button onClick={createTagInput}>Want to add some Tags ?</button> */}
            <Button>Create now</Button>
          </form>
        </div>
      </SystemUI>
    </section>
  );
}
