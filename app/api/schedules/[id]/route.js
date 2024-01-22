
import fs from 'fs';
import path from 'path';


export const GET = async (request, { params }) => {
    // const filePath = path.join('public', 'assets', 'data.json');
    const filePath = path.resolve(process.cwd(), 'public', 'assets', 'data.json');
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    try {
        if (params) {
            schedule = fileData.filter((item) => item.id === params.id)
        } else {
            return new Response(Json.stringify(schedule));
        }
    } catch (error) {
        console.log(error)
    }
};

export const PATCH = async (request, { params }) => {
    // const filePath = path.join('public', 'assets', 'data.json');
    const filePath = path.resolve(process.cwd(), 'public', 'assets', 'data.json');
    const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    try {
        let i = 0;
        const scheduleIdToUpdate = params.id; // Assuming you want to Update the schedule with id 3
        const jsonData = await request.json();
        const indexToUpdate = fileData.schedules.findIndex((schedule) => schedule.id === scheduleIdToUpdate)

        if (indexToUpdate !== -1) {
            fileData.schedules[indexToUpdate] = jsonData;
            fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
            return new Response(JSON.stringify("Data Updated successfully"), { status: 200 });
        }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}

export const DELETE = async (request, { params }) => {
    try {
        // const filePath = path.join('public', 'assets', 'data.json');
        const filePath = path.resolve(process.cwd(), 'public', 'assets', 'data.json');
        const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        let i = 0;
        const scheduleIdToDelete = params.id; // Assuming you want to delete the schedule with id 3
        const updatedData = {
            "schedules": fileData.schedules.filter(schedule => schedule.id !== scheduleIdToDelete)
        };      // const indexToDelete = fileData.schedules.map((schedule) => {

        fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');
        return new Response(JSON.stringify("Data DEleted successfully"), { status: 200 });
        // }
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
