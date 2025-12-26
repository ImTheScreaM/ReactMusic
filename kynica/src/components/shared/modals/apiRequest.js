const ApiRequest = async (url, method, data) => {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
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
