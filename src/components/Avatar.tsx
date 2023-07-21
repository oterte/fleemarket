import Image from "next/image";
import React from "react";

interface AvatarProps {
  src: string | null;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Image
      className="w-10 h-10 rounded-full"
      height={30}
      width={30}
      alt="Avatar"
      src={src || "https://i.stack.imgur.com/l60Hf.png"}
    />
  );
};

export default Avatar;
