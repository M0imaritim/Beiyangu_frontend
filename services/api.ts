const apiService = {
  get: async function (url: string): Promise<any> {
    console.log(
      `Making GET request to: ${process.env.NEXT_PUBLIC_API_URL}${url}`
    );

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "GET",
        credentials: "include", // Include cookies
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // If you're using CSRF protection, ensure you're sending the token
          // 'X-CSRFToken': getCsrfToken(),
        },
      });

      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          console.log("Could not parse error response as JSON");
        }

        console.error("API error:", {
          status: response.status,
          statusText: response.statusText,
          details: errorData,
        });

        throw new Error(
          JSON.stringify({
            status: response.status,
            statusText: response.statusText,
            details: errorData,
          })
        );
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  },

  post: async function (url: string, data: any): Promise<any> {
    console.log("post", url, data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        body: data,
        credentials: "include", // Include cookies
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Response:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  postWithoutToken: async function (url: string, data: any): Promise<any> {
    console.log("postWithoutToken", url, data);

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        body: data,
        credentials: "include", // Include cookies
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          // console.log("Response:", json);
          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  // Helper method for JSON POST requests
  postJSON: async function (url: string, data: any): Promise<any> {
    console.log("postJSON", url, data);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: "POST",
        credentials: "include", // Include cookies
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          console.log("Could not parse error response as JSON");
        }

        console.error("API error:", {
          status: response.status,
          statusText: response.statusText,
          details: errorData,
        });

        // Return error in expected format instead of throwing
        return {
          success: false,
          error: errorData || response.statusText,
          details: errorData,
        };
      }

      const json = await response.json();
      console.log("Response:", json);
      return json;
    } catch (error) {
      console.error("API request failed:", error);
      return {
        success: false,
        error: "Network error occurred",
      };
    }
  },
};

export default apiService;
