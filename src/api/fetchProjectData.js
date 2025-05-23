
export default async function fetchProjectData() {
    try {
        const res = await fetch('/data/projects.json');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const text = await res.text(); // Get raw text to debug
        const data = JSON.parse(text); // Manually parse to catch errors
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}


