import { PropsWithChildren } from "react";
import Container from "./Container";
import Grid from "./Grid";

export function SystemUI(props: PropsWithChildren) {
  return (
    <Container>
      <Grid>{props.children}</Grid>
    </Container>
  );
}
