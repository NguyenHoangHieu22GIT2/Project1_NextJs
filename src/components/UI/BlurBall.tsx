import React, { FC, PropsWithChildren, ReactNode } from 'react';

export function BlurBall(props: {
  position: { x: string; y: string };
}): JSX.Element {
  return (
    <div
      className={`absolute ${props.position.x} ${props.position.y} w-64 h-64 rounded-full  -z-10 blur-3xl  bg-primary `}
    ></div>
  );
}
