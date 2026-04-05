const ApiRequest = async (url, method, data) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
          body: data ? JSON.stringify(data) : undefined,
            credentials: 'include',
            mode: 'cors',
        });

      return await response.json()
    } catch (err) {
        console.error("API Request failed:", err);
    }
};

export default ApiRequest;
