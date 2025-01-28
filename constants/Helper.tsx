const STORAGE_KEY = "nda-form-data";

export const getStorageData = () => {
    try {
        if (typeof window !== "undefined") {
            const storedData = sessionStorage.getItem(STORAGE_KEY);
            return storedData ? JSON.parse(storedData) : null;
        }
    } catch (error) {
        console.error('Error parsing session storage data:', error);
    }
    return null;
};