import { useAppSelector } from "@/store";
import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";

const QUERY_CHECK_VALIDATION = gql`
  query checkToken($input: String!) {
    CheckJwtToken(token: $input) {
      email
    }
  }
`;
[].reduce
export function   useCheckAuth() {
  let [count, setCount] = useState(0)
  let token = useAppSelector((state) => state.auth.token);
  const [checkAuthLazy, { data, loading }] = useLazyQuery(QUERY_CHECK_VALIDATION, {
    context: {
      headers: {
        authorization: `bearer ${token}`,
      },
    },
    variables: { input: `${token}` },
  });
  useEffect(() => {
    checkAuthLazy();
    setCount(count++)
  }, []);
  if (data) {
    return true;
  } else if (!loading && !data && count) return false;
}
