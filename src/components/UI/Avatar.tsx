import Image from "next/image";

type props = {
  avatarImageLink: string;
  width: number;
  height: number;
  alt: string;
  className: string;
};

export function Avatar(props: props) {
  return (
    <Image
      src={
        props.avatarImageLink
          ? process.env.NEXT_PUBLIC_SERVER_IMAGE_URI + props.avatarImageLink
          : "/default-user.jpeg"
      }
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={props.className}
    ></Image>
  );
}
