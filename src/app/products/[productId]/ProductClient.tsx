"use client";
import { Product, User } from "@prisma/client";
import React from "react";

interface ProductClientProps {
  // user 데이터도 들어있기 때문에
  // user 프로퍼티 안에 User 타입이 존재
  product: Product & { user: User };
  currentUser?: User | null;
}

const ProductClient = ({ product, currentUser }: ProductClientProps) => {
  return <div>ProductClient</div>;
};

export default ProductClient;
