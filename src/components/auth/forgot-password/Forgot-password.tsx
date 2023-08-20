import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { NotificationCard } from "@/components/UI/NotificationCard";
import { SystemUI } from "@/components/UI/SystemUI";
import { useInput } from "@/hooks/useInput";
import { useAppDispatch, useAppSelector } from "@/store";
import { notificationActions } from "@/store/notification";
import { gql, useLazyQuery } from "@apollo/client";
import { FormEvent } from "react";

const QUERY_FORGOT_PASSWORD = gql`
  query forgetPassword($input: String!) {
    forgetPassword(email: $input) {
      email
    }
  }
`;

export function ForgotPassword() {
  const dispatch = useAppDispatch();
  const emailInput = useInput((data) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data);
  });

  const [sendMail, { loading, data, error }] = useLazyQuery(
    QUERY_FORGOT_PASSWORD
  );

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (emailInput.isValid) {
      sendMail({ variables: { input: emailInput.value } }).then((result) => {
        if (result.data)
          dispatch(
            notificationActions.createNotification({
              status: "success",
              title: "Send Email successfully",
              description:
                "Please check your email inbox to see more details...",
            })
          );
        if (result.error)
          dispatch(
            notificationActions.createNotification({
              status: "error",
              title: "Send Email Failed...",
              description:
                "Email not found, Please check your credentials again...",
            })
          );
      });
    }
  }

  function turnOff() {
    dispatch(notificationActions.deleteNotification({}));
  }
  return (
    <section className="my-5">
      <NotificationCard buttonContent="Okay" onClickFunction={turnOff} />
      <SystemUI>
        <h1 className="col-span-12 mb-10 font-bold text-white sm:text-center text-subHeading">
          Forget password ? Restore again!
        </h1>
        <div className="grid grid-cols-12 col-span-12">
          <form
            onSubmit={submit}
            className="sm:col-span-6 col-span-12 [&>*]:mb-5"
            action=""
            method="post"
          >
            <Input label="Email" type="email" input={emailInput} />
            <Button classNames=" col-span-12">Send Mail!</Button>
          </form>
        </div>
      </SystemUI>
    </section>
  );
}
