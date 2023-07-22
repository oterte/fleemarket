"use client";

import { User } from "@prisma/client";
import React, { useState } from "react";
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
