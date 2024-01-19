import textJson from '@public/assets/data.json';
import fs from 'fs';
import path from 'path';

const filePath = path.join('public', 'assets', 'data.json'); // Adjust the path based on your project structure
const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

const searchScheduleByTitle = (title) => {
    console.log("hello", title, fileData)
    const matchingSchedule = fileData.schedules.filter((schedule) => schedule?.title.toLowerCase().includes(title.toLowerCase()));
    return matchingSchedule || null;
};

export const GET = async (request) => {
    try {
        if (request.url.includes('search=')) {
            const searchValue = request.url.split('=')[1];
            console.log(searchValue)
            const result = searchScheduleByTitle(searchValue);
            console.log(result);
            return new Response(JSON.stringify(result));
        } else {
            console.log("hello")
            return new Response(JSON.stringify(textJson));
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
export const GET_search = async (request) => {
    try {
        if (request.query.search) {
            console.log("Search query:", request.query.search);
            // Perform search logic here and return the appropriate response
            return new Response(JSON.stringify(searchResults));
        } else {
            return new Response(JSON.stringify({ error: "Search query parameter is required" }), { status: 400 });
        }
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        const jsonData = await request.json();
        fileData.schedules.push(jsonData);
        console.log(fileData)
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return new Response(JSON.stringify({ message: "Data received successfully" }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};

