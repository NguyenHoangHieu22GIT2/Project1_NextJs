import {
  Dispatch,
  FormEvent,
  PropsWithChildren,
  SetStateAction,
  useEffect,
} from "react";
import { Input } from "../UI/Input";
import { useInput } from "@/hooks/useInput";
import { Button } from "../UI/Button";
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";

const MUTATION_CREATE_USER = gql`
  mutation register($input: CreateUserInput!) {
    register(createUserInput: $input) {
      email
    }
  }
`;

export const Register: React.FC<PropsWithChildren> = (props) => {
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
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValid) {
      createUser({
        variables: {
          input: {
            email: emailInput.value,
            password: passwordInput.value,
            username: usernameInput.value,
          },
        },
      }).then((result) => {
        if (result.data)
          dispatch(
            notificationActions.createNotification({
              status: "success",
              title: "Create Account Successfully",
              description:
                "Thank you for registering to our services, hope you will find our helpful",
            })
          );
        if (result.errors)
          dispatch(
            notificationActions.createNotification({
              status: "error",
              title: "Can not create Account...",
              description:
                "You Have to create with a valid email and a strong password...",
            })
          );
      });
    }
  }
  return (
    <form onSubmit={submit} method="post" className="[&>*]:mb-10 gap-10">
      <Input label="Email" type="email" input={emailInput} />
      <Input label="Username" type="text" input={usernameInput} />
      <Input label="Password" type="password" input={passwordInput} />
      <Button>Register</Button>
    </form>
  );
};
