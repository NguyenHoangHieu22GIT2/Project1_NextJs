import {
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Input } from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { Button } from "../UI/Button";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";
import { useDropzone } from "react-dropzone";
import { toBase64 } from "@/utils/toBase64";
import Image from "next/image";
import { motion } from "framer-motion";
const MUTATION_CREATE_USER = gql`
  mutation register($input: CreateUserInput!) {
    register(createUserInput: $input) {
      email
    }
  }
`;

type props = {
  salt: string;
};

export const Register: React.FC<props> = (props) => {
  const [file, setFile] = useState<File>();
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = true;
      if (
        files &&
        !files[0].type.endsWith("jpg") &&
        !files[0].type.endsWith("jpeg") &&
        !files[0].type.endsWith("png")
      ) {
        isValid = false;
      }
      isValid && setFile(files[0]);
    },
    [setFile]
  );
  const dispatch = useAppDispatch();
  const emailInput = useInput((data) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
  });

  const usernameInput = useInput((data) => {
    return data.trim().length > 5;
  });

  const passwordInput = useInput((data) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,.?/])(?=.*[a-zA-Z]).{5,}$/.test(
      data
    );
  });

  const formValid =
    emailInput.isValid && usernameInput.isValid && passwordInput.isValid;

  const [createUser] = useMutation(MUTATION_CREATE_USER);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formValid && file) {
      const result = await createUser({
        variables: {
          input: {
            email: emailInput.value,
            password: passwordInput.value,
            username: usernameInput.value,
            avatar: props.salt + file.name,
          },
        },
      });
      if (result.data) {
        await fetch("http://localhost:4000/uploadFile", {
          method: "POST",
          body: JSON.stringify([
            {
              fileName: props.salt + file.name,
              fileBase64: await toBase64(file),
              mimetype: file.type,
            },
          ]),
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(
          notificationActions.createNotification({
            status: "success",
            title: "Create Account Successfully",
            description:
              "Thank you for registering to our services, hope you will find our helpful",
          })
        );
      }
      if (result.errors)
        dispatch(
          notificationActions.createNotification({
            status: "error",
            title: "Can not create Account...",
            description:
              "You Have to create with a valid email and a strong password...",
          })
        );
    }
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <motion.form
      initial={{ x: 1000 }}
      animate={{ x: -200, display: "hidden" }}
      exit={{ x: 1000 }}
      onSubmit={submit}
      method="post"
      // style={{ transform:  }}
      className="[&>*]:mb-10 absolute left-1/2 bg-white p-5 rounded-lg shadow-xl mx-auto w-[min(30vw,800px)]"
    >
      <h1 className="text-3xl font-bold text-center uppercase">Register</h1>
      <Input label="Email" type="email" input={emailInput} />
      <Input label="Username" type="text" input={usernameInput} />
      <div {...getRootProps()} className="border-b-2 border-b-[#43cea6] py-3">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-sm">Drop the files here ...</p>
        ) : (
          <p className="text-sm">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
        <div className="flex flex-wrap gap-2">
          {file && (
            <div className="relative">
              <Image
                src={`${URL.createObjectURL(file)}`}
                alt=""
                width={200}
                height={200}
              />
              <span
                className="absolute top-0 right-0 px-3 py-1 rounded-full cursor-pointer bg-slate-500"
                onClick={() => {
                  setFile(undefined);
                }}
              >
                X
              </span>
            </div>
          )}
        </div>
      </div>
      <Input label="Password" type="password" input={passwordInput} />
      <Button>Register</Button>
    </motion.form>
  );
};
