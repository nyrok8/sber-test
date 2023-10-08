export async function getExchangeRate(base: string, target: string) {
    const API_KEY = "7cba521288bc0b7b829e2219";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${base}/${target}`;

    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data.conversion_rate);
        return data.conversion_rate;
    } catch (error) {
        console.error(error);
    }
}