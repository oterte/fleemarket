import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "react-toastify";

interface UseFavorite {
  productId: string;
  currentUser?: User | null;
}

const useFavorite = ({ productId, currentUser }: UseFavorite) => {
  const router = useRouter();
  const hasFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(productId);
  }, [currentUser, productId]);

  const toggleFavorite = async (e: React.MouseEvent<HTMLDivElement>) => {
    // 이벤트 버블링 방지
    e.stopPropagation();
    if (!currentUser) {
      toast.warn('먼저 로그인 해주세요')
      return;
    }
    try {
      let request;
      if (hasFavorite) {
        request = () => axios.delete(`/api/favorites/${productId}`);
      } else {
        request = () => axios.post(`/api/favorites/${productId}`);
      }

      await request();
      // 화면에 즉시 반영을 해주기 위한 refresh
      router.refresh();
      toast.success("성공했습니다");
    } catch (error) {
      toast.error("실패했습니다.");
    }
  };
  return {
    hasFavorite,
    toggleFavorite,
  };
};

export default useFavorite;
