import { PropsWithChildren } from 'react';

const Grid: React.FC<PropsWithChildren> = (props) => {
  return <div className="grid grid-cols-12">{props.children}</div>;
};

export default Grid;
