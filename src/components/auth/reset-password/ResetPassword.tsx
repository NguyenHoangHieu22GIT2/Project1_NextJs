import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { SystemUI } from "@/components/UI/SystemUI";
import { useInput } from "@/hooks/useInput";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { FormEvent } from "react";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";
import { NotificationCard } from "@/components/UI/NotificationCard";

const MUTATION_CHANGE_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(resetPasswordInput: $input) {
      email
    }
  }
`;

export function ResetPassword() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [changePassword] = useMutation(MUTATION_CHANGE_PASSWORD);
  const tokenInput = useInput((data) => {
    return data.length > 0;
  });
  const passwordInput = useInput((data) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]\\:;'<>,.?/])(?=.*[a-zA-Z]).{5,}$/.test(
      data
    );
  });
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    changePassword({
      variables: {
        input: {
          userId: router.query.id,
          token: tokenInput.value,
          password: passwordInput.value,
        },
      },
    }).then((result) => {
      if (result.errors)
        dispatch(
          notificationActions.createNotification({
            status: "error",
            title: "Change password Failed",
            description: "Please check again your token and your new password!",
          })
        );
      if (result.data)
        dispatch(
          notificationActions.createNotification({
            status: "success",
            title: "Change password successfully",
            description:
              "Alright, Now We hope you won't forget your password again!",
          })
        );
    });
  }
  function turnOff() {
    dispatch(notificationActions.deleteNotification({}));
    router.replace("/");
  }
  return (
    <section className="my-5">
      <NotificationCard buttonContent="Okay!" onClickFunction={turnOff} />
      <SystemUI>
        <h1 className="col-span-12 text-white sm:text-center mb-10 text-subHeading font-bold">
          Reset password Time!
        </h1>
        <div className="col-span-12 grid grid-cols-12">
          <form
            onSubmit={submit}
            action="post"
            className="sm:col-span-6 col-span-12 [&>*]:mb-10"
          >
            <Input label="Password" type="password" input={passwordInput} />
            <Input label="Token" type="text" input={tokenInput} />
            <Button>Reset Password</Button>
          </form>
        </div>
      </SystemUI>
    </section>
  );
}
