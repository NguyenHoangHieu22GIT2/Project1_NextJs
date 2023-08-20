import { useInput } from "@/hooks/useInput";
import { Input } from "../UI/Input";
import { SystemUI } from "../UI/SystemUI";
import { Button } from "../UI/Button";
import { TextArea } from "../UI/Textarea";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { notificationActions } from "@/store/notification";
import { NotificationCard } from "../UI/NotificationCard";
import { useRouter } from "next/router";
import { Stream } from "stream";
import Dropzone, { useDropzone } from "react-dropzone";
import { toBase64 } from "@/utils/toBase64";
import Image from "next/image";
import axios from "axios";
import Rule from "../UI/SVG/Rule";
import { AccentButton } from "../UI/AccentButton";

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
  const [options, setOptions] = useState<
    { optionName: string; price: number }[]
  >([]);
  const addOption = () => {
    setOptions([...options, { optionName: "", price: 0 }]);
  };
  const handleOptionChangeName = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setOptions((oldOptions) => {
      oldOptions[index].optionName = event.target.value;
      return oldOptions;
    });
  };
  const handleOptionChangePrice = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setOptions((oldOptions) => {
      oldOptions[index].price = +event.target.value;
      return oldOptions;
    });
  };
  // console.log(options);
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = true;
      files.forEach((file) => {
        if (
          !file.type.endsWith("jpg") &&
          !file.type.endsWith("jpeg") &&
          !file.type.endsWith("png")
        ) {
          isValid = false;
        }
      });
      isValid &&
        setFiles((prevArray) => {
          return [...prevArray, ...files];
        });
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const dispatch = useAppDispatch();
  const [createProductFn, {}] = useMutation(MUTATION_CREATE_PRODUCT);
  const token = useAppSelector((state) => state.auth.token);
  console.log(token);
  const titleInput = useInput((data) => {
    return data.length > 10;
  });
  const priceInput = useInput((data) => {
    return +data > 0;
  });
  const descriptionInput = useInput((data) => {
    return data.length > 20;
  });
  const stockInput = useInput((data) => {
    return +data > 100;
  });
  const discountInput = useInput((data) => {
    return +data >= 0;
  });

  let formIsValid =
    titleInput.isValid && descriptionInput.isValid && priceInput.isValid;

  // console.log(props.token);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    files?.forEach((file) => {
      if (
        file!.type !== "jpg" &&
        file!.type !== "jpeg" &&
        file!.type !== "png"
      ) {
        formIsValid = false;
      }
    });
    if (!formIsValid && files && files.length <= 0) {
      return;
    }
    // const formData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   formData.append(`files`, files[i]);
    // }

    // await fetch("http://localhost:4000/uploadFile", {
    //   method: "POST",
    //   body: formData,
    // });
    // await fetch("http://localhost:4000/test").then((data) => console.log(data));
    try {
      const images = files?.map(async (file) => {
        return {
          fileName: props.salt + file.name,
          fileBase64: await toBase64(file),
          mimetype: file.type,
        };
      });
      const updatedImages = await Promise.all(images);
      const imagesName = files?.map((file) => {
        return props.salt + file.name;
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
            images: imagesName,
            options,
          },
        },
        context: {
          headers: {
            authorization: `bearer ${token}`,
          },
        },
      });
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
        await fetch("http://localhost:4000/uploadFile", {
          method: "POST",
          body: JSON.stringify(updatedImages),
          headers: {
            "Content-Type": "application/json",
          },
        });

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
      console.log(error);
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
    <section className="my-10 ">
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
        <div className="col-span-12 px-5 py-3 text-gray-800 bg-white rounded-lg shadow-lg ">
          <h1 className="col-span-12 font-bold text-center uppercase border-b-2 border-dotted border-b-blue-300 text-subHeading">
            Create Product
          </h1>
          <div className="flex mt-10 [&>*]:basis-1/2 gap-5">
            <form
              encType="multipart/form-data"
              className="col-span-12  [&>*]:mb-10"
              onSubmit={submit}
            >
              <Input label="Title" type="text" input={titleInput} />
              <Input label="Price" type="text" input={priceInput} />
              <TextArea label="Description" input={descriptionInput} />
              {/* <Input label="Image Url" type="file" input={imageInput} /> */}
              <div
                {...getRootProps()}
                className="border-b-2 border-b-[#43cea6] py-3"
              >
                <input name="file0" {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {files.length > 0 &&
                  files.map((image, index) => {
                    return (
                      <div key={index} className="relative">
                        <Image
                          src={`${URL.createObjectURL(image)}`}
                          alt=""
                          width={200}
                          height={200}
                        />
                        <span
                          className="absolute top-0 right-0 px-3 py-1 rounded-full cursor-pointer bg-slate-500"
                          onClick={() => {
                            setFiles((prevArray) => {
                              return prevArray.filter(
                                (file) => file.name !== image.name
                              );
                            });
                          }}
                        >
                          X
                        </span>
                      </div>
                    );
                  })}
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
              {options.map((option, index) => (
                <div key={index} className="flex gap-5">
                  <input
                    className="p-2 font-bold border rounded-sm outline-none"
                    type="text"
                    name="name"
                    onChange={(event) => handleOptionChangeName(index, event)}
                    placeholder="Option Name"
                  />
                  <div className="flex gap-3 p-2 font-bold border rounded-sm outline-none">
                    <span>$</span>
                    <input
                      className="outline-none"
                      type="number"
                      name="price"
                      onChange={(event) =>
                        handleOptionChangePrice(index, event)
                      }
                      placeholder="Option Price"
                    />
                  </div>
                </div>
              ))}
              {/* <AccentButton onClick={addOption}>Add Option</AccentButton> */}
              <button
                type="button"
                onClick={addOption}
                className="mr-5 text-lg font-bold text-[#9a3762]"
              >
                Add Options
              </button>
              <Button>Create now</Button>
            </form>

            <div>
              <ul className="sticky top-28">
                <li className="flex gap-3">
                  <Rule />
                  <span>The title should at least be 10 characters long.</span>
                </li>
                <li className="flex gap-3">
                  <Rule />
                  <span>The price should at least be greater than 0.</span>
                </li>
                <li className="flex gap-3">
                  <Rule />
                  <span>
                    The description should at least be 20 characters long.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Rule />
                  <span>
                    the product should at least have 1 image to visualize.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Rule />
                  <span> Stocks should be higher than 100.</span>
                </li>
                <li className="flex gap-3">
                  <Rule />
                  <span>Discount can vary from 0 to 100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </SystemUI>
    </section>
  );
}
