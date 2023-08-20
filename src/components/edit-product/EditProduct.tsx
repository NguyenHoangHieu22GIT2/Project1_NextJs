import { useInput } from "@/hooks/useInput";
import { Input } from "../UI/Input";
import { SystemUI } from "../UI/SystemUI";
import { Button } from "../UI/Button";
import { TextArea } from "../UI/Textarea";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useCallback, useEffect, useState } from "react";
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

type props = {
  token: string;
  salt: string;
  _id: string;
};

const MUTATION_EDIT_PRODUCT = gql`
  mutation updateProduct($input: UpdateProductInput!) {
    updateProduct(updateProductInput: $input) {
      title
    }
  }
`;

const QUERY_FIND_PRODUCT_BY_ID = gql`
  query findProductById($input: String!) {
    findProductById(id: $input) {
      title
      price
      description
      images
      discount
      stock
    }
  }
`;

export function EditProduct(props: props) {
  const auth = useAppSelector((state) => state.auth);
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
  const [updateProductGraphQlFn, {}] = useMutation(MUTATION_EDIT_PRODUCT);
  const token = useAppSelector((state) => state.auth.token);
  const { loading, data, error } = useQuery(QUERY_FIND_PRODUCT_BY_ID, {
    variables: {
      input: props._id,
    },
  });

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
  const stockInput = useInput((data) => {
    return +data > 100;
  });
  const discountInput = useInput((data) => {
    return +data >= 0;
  });
  useEffect(() => {
    if (data) {
      titleInput.changeValue(data.findProductById.title);
      priceInput.changeValue(data.findProductById.price);
      descriptionInput.changeValue(data.findProductById.description);
      stockInput.changeValue(data.findProductById.stock);
      discountInput.changeValue(data.findProductById.discount);
    }
  }, [data]);
  let formIsValid =
    titleInput.isValid &&
    descriptionInput.isValid &&
    priceInput.isValid &&
    stockInput.isValid &&
    discountInput.isValid;

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    files?.forEach((file) => {
      if (
        file!.type !== "image/png" &&
        file!.type !== "image/jpg" &&
        file!.type !== "image/jpeg"
      ) {
        console.log("Turns to false", file!.type);
        formIsValid = false;
      }
    });
    console.log(formIsValid);
    console.log(titleInput.isValid);
    console.log(descriptionInput.isValid);
    console.log(priceInput.isValid);
    console.log(stockInput.isValid);
    console.log(discountInput.isValid);
    if (!formIsValid) {
      return;
    }

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

      const result = await updateProductGraphQlFn({
        variables: {
          input: {
            _id: props._id,
            title: titleInput.value,
            price: +priceInput.value,
            description: descriptionInput.value,
            token: props.token,
            stock: +stockInput.value,
            discount: +discountInput.value,
            images: imagesName,
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
        // const formData = new FormData();
        // for (let i = 0; i < files.length; i++) {
        //   formData.append(`file${i}}`, files[i]);
        // }
        // await fetch("http://localhost:4000/uploadFile", {
        //   method: "POST",
        //   body: formData,
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
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
  // function createTagInput() {
  //   setTagElement(tagElement + 1);
  //   setTags((state) => [...state, { name: "", options: [] }]);
  // }
  // console.log(files);
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
        <div className="col-span-12  text-gray-800 bg-white px-5 py-3 rounded-lg shadow-lg ">
          <h1 className="text-center uppercase border-b-2 border-dotted border-b-blue-300 font-bold text-subHeading col-span-12">
            Update Product
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
              <p className="font-bold text-sm">
                Don't put anything if you don't want to change the images.
              </p>
              <p className="font-bold text-sm">
                if you do want to upload another image,please be sure to upload
                all back because we will delete the old ones
              </p>
              <div className="flex gap-2 flex-wrap">
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
                          className="absolute top-0 right-0 bg-slate-500 px-3 py-1 cursor-pointer rounded-full"
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
