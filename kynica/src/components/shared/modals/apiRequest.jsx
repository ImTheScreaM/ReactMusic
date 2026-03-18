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

        const result = await response.json();
        console.log("API Response:", result);
        return result
    } catch (err) {
        console.error("API Request failed:", err);
    }
};

export default ApiRequest;
