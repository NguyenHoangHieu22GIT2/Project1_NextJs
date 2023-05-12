import { useAppSelector } from "@/store";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

const QUERY_CHECK_VALIDATION = gql`
  query checkToken($input: String!) {
    checkToken(token: $input) {
      email
    }
  }
`;
export function useCheckAuth() {
  let token;
  token = useAppSelector((state) => state.auth.token);

  const [checkAuthLazy, { data }] = useLazyQuery(QUERY_CHECK_VALIDATION, {
    context: {
      headers: {
        authorization: `bearer ${token}`,
      },
    },
    variables: { input: `${token}` },
  });
  useEffect(() => {
    checkAuthLazy();
  }, []);
  if (data && data.checkToken.email.includes("@")) {
    return true;
  } else if (!data) return false;
}
