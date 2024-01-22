import fs from 'fs';
import path from 'path';



const searchScheduleByTitle = (fileData, title) => {
    const matchingSchedule = fileData.schedules.filter((schedule) => schedule?.title.toLowerCase().includes(title.toLowerCase()));
    return matchingSchedule || null;
};

export const GET = async (request) => {
    // const filePath = path.join('public', 'assets', 'data.json');
    const filePath = path.resolve(process.cwd(), 'public', 'assets', 'data.json');
    if (!fs.existsSync(filePath)) {
        // If the file doesn't exist, create an empty one
        const emptyData = { schedules: [] };
        fs.writeFileSync(filePath, JSON.stringify(emptyData, null, 2), 'utf-8');
    }
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    try {
        if (request.url.includes('search=')) {
            const searchValue = request.url.split('=')[1].replace("%20", " ");

            const result = searchScheduleByTitle(fileData, searchValue);

            return new Response(JSON.stringify(result));
        } else {

            return new Response(JSON.stringify(fileData));
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}

export const POST = async (request) => {
    // const filePath = path.join('public', 'assets', 'data.json'); 
    const filePath = path.resolve(process.cwd(), 'public', 'assets', 'data.json');
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    try {
        const jsonData = await request.json();
        fileData.schedules.push(jsonData);
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return new Response(JSON.stringify({ message: "Data received successfully" }), { status: 201 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
};

