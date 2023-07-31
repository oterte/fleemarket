import React from "react";
import Avatar from "../Avatar";

interface MessageProps {
  isSender: boolean;
  messageTest?: string | null;
  messageImage?: string | null;
  receiverName: string;
  receiverImage: string;
  senderImage: string | null;
  time: Date;
}

const Message = ({
  isSender,
  messageTest,
  messageImage,
  receiverName,
  receiverImage,
  senderImage,
  time,
}: MessageProps) => {
  return (
    <div>
      <div>
        <Avatar src={senderImage && isSender ? senderImage : receiverImage}/>
      </div>
      <div>
        <div>
          <span>{isSender ? "You" : receiverName}</span>
        </div>
      </div>
    </div>
  );
};

export default Message;
