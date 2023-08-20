import { useAppSelector } from "@/store";
import { gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

const MUTATION_CREATE_TOKEN = gql`
  mutation createCsrfToken($input: String!) {
    createCsrfToken(userId: $input) {
      token
    }
  }
`;

export function useToken() {
  const [count, setCount] = useState(0);
  const authStore = useAppSelector((state) => state.auth);
  const [token, setToken] = useState("");
  const [createTokenFn, {}] = useMutation(MUTATION_CREATE_TOKEN, {
    variables: { input: authStore.userId },
  });
  useEffect(() => {
    console.log(authStore.userId && typeof window !== undefined && count == 0);
    if (authStore.userId && typeof window !== undefined && count == 0) {
      createTokenFn().then((result) => {
        console.log(result.data.createCsrfToken.token);
        setToken(result.data.createCsrfToken.token);
      });
    }
    setCount(count + 1);
  }, []);
  return token;
}
