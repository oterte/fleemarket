'use client'
import { TUserWithChat } from "@/types";
import React from "react";
import Input from "./Input";

interface ChatProps {
  currentUser: TUserWithChat;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  setLayout: (layout: boolean) => void;
}

const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  if(!receiver.receiverName || !currentUser){
    return <div className="w-full h-full"></div>
  }
  console.log("currentUser", currentUser)
  console.log("receiver.receiverName", receiver.receiverName)
  return (
    <div className="w-full">
      <div>
        {/* {채팅 헤더} */}
      </div>
      <div className="flex flex-col gap-8 p-4 overflow-hidden h-[calc(100vh_-_60px_-_70px_-_80px)]">
        {/* 채팅 메시지 */}
      </div>
      <div>
        <Input 
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  );
};

export default Chat;
