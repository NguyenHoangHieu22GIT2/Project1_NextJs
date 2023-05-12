import { NotificationCard } from "@/components/UI/NotificationCard";
import { CreateProduct } from "@/components/create-product/Create-Product";
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

export default function CreateProductPage() {
  const auth = useAppSelector((state) => state.auth);
  const [csrfToken, setCsrfToken] = useState<string>("");
  const [createCsrfToken, { loading, data, error }] = useMutation(
    MUTATION_CREATE_TOKEN
  );

  useEffect(() => {
    if (auth.token && typeof window != undefined) {
      createCsrfToken({
        variables: { input: sessionStorage.getItem("userId") },
      }).then((result) => {
        setCsrfToken(result.data.createCsrfToken.token);
      });
    }
  }, []);
  console.log(csrfToken);
  if (loading) {
  }
  return (
    <>
      <CreateProduct token={csrfToken} />
    </>
  );
}
