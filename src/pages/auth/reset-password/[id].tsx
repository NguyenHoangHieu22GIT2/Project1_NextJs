import { Layout } from "@/components/Layout/Layout";
import { ResetPassword } from "@/components/auth/reset-password/ResetPassword";
import { useAppDispatch } from "@/store";
import { notificationActions } from "@/store/notification";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

const QUERY_FIND_USER_ID = gql`
  {
    userFindById(id: $input) {
      email
    }
  }
`;

export default function ResetPasswordUser() {
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { loading, data, error } = useQuery(QUERY_FIND_USER_ID, {
    variables: { input: route.query.id },
  });
  if (error || !data) {
    dispatch(
      notificationActions.createNotification({
        status: "error",
        title: "You are not supposed to be here",
        description:
          "Please leave and only come back if you want to reset password",
      })
    );
  }

  return (
    <Layout>
      <ResetPassword />
    </Layout>
  );
}
