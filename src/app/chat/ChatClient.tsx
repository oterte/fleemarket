"use client";

import { TUserWithChat } from "@/types";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
interface ChatClientProps {
  currentUser?: User | null;
}

const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });

  // 반응형을 위한  state
  const [layout, setLayout] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);

  // 1초마다 다시 요청을 보냄
  const {
    data: users,
    error,
    isLoading,
  } = useSWR(`/api/chat`, fetcher, {
    refreshInterval: 1000,
  });

  console.log(users);

  const currentUserWithMessage = users?.find(
    (user: TUserWithChat) => user.email === currentUser?.email
  );

  if (error) return <p>error!</p>;
  if (isLoading) return <p>Loading...</p>;
  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        <section className={`md:flex ${layout && "hidden"}`}>
          {/* 나에게 메시지 보낸 유저 목록 컴포넌트 */}
          콘택트
        </section>
        <section className={`md:flex ${!layout && "hidden"}`}>
          {/* 현재 대화중인 유저 컴포넌트 */}
          채팅
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
