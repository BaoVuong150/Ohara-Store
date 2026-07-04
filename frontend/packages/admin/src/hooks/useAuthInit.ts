import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthStore } from 'shared';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Thực hiện Silent Refresh để lấy token mới từ Cookie khi tải trang
        const response = await axios.post(
          `${API_URL}/api/auth/refresh`,
          { accessToken: null },
          { withCredentials: true }
        );

        const { accessToken, user } = response.data;
        setToken(accessToken);
        setUser(user);
      } catch (error) {
        // Không đăng nhập trước đó hoặc token hết hạn, không làm gì
      } finally {
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, [setToken, setUser]);

  return { isInitialized };
};
