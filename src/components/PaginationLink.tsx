import { PRODUCTS_PER_PAGE } from "@/constants";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import React, { PropsWithChildren } from "react";
import qs from "query-string";

type PaginationLinkProps = {
  page?: number | string;
  active?: boolean;
  disabled?: boolean;
} & PropsWithChildren;

const PaginationLink = ({
  page,
  active,
  disabled,
  children,
}: PaginationLinkProps) => {
  const params = useSearchParams();
  const limit = PRODUCTS_PER_PAGE;
  const skip = page ? (Number(page) - 1) * limit : 0;

  let currentQuery = {};
  if (params) {
    currentQuery = qs.parse(params.toString());
  }
  console.log(currentQuery);
  const updatedQuery: any = {
    ...currentQuery,
    page,
    skip,
  };
  return (
    <Link
      href={{ query: updatedQuery }}
      className={`p-2 text-2xl
      ${active ? "font-bold text-orange-500" : "text-gray-500"}
      ${disabled ? "pointer-events-none text-gray-200" : ""}
      `}
    >
      {children}
    </Link>
  );
};

export default PaginationLink;
