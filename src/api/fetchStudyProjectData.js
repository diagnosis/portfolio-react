export default async function fetchStudyProjectData() {
    try {
        const res = await fetch('/data/study-projects.json');
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const text = await res.text();
        console.log('Raw Response:', text);
        const data = JSON.parse(text);
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}