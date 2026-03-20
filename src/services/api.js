// src/services/api.js

const api = {
  get: async (url) => {
    // Dashboard stats
    if (url === "/analytics/overall") {
      return {
        data: {
          totalQRs: 5,
          totalScans: 120,
        },
      };
    }

    // ✅ QR HISTORY (IMPORTANT FIX)
    if (url === "/history") {
      return {
        data: [
          {
            _id: "1",
            name: "Google Link",
            originalUrl: "https://google.com",
            qrImageUrl:
              "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://google.com",
            isDynamic: true,
            scanCount: 25,
            createdAt: "2024-01-01",
          },
          {
            _id: "2",
            name: "YouTube Link",
            originalUrl: "https://youtube.com",
            qrImageUrl:
              "https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://youtube.com",
            isDynamic: false,
            scanCount: 10,
            createdAt: "2024-01-05",
          },
        ],
      };
    }

    return { data: [] };
  },

  post: async (url, body) => {
    // LOGIN
    if (url === "/auth/login") {
      return {
        data: {
          user: {
            name: "Demo User",
            role: "free",
          },
          token: "fake-jwt-token",
        },
      };
    }

    // REGISTER
    if (url === "/auth/register") {
      return {
        data: {
          user: {
            name: body?.name || "New User",
            role: "free",
          },
          token: "fake-jwt-token",
        },
      };
    }

    return { data: {} };
  },

  put: async () => ({ data: {} }),

  delete: async () => ({ data: {} }),
};

export default api;