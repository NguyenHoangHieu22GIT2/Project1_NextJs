import { PropsWithChildren } from 'react';
import Container from './Container';
import Grid from './Grid';

const SystemUI: React.FC<PropsWithChildren> = (props) => {
  return (
    <Container>
      <Grid>{props.children}</Grid>
    </Container>
  );
};

export default SystemUI;
