import textJson from '@public/assets/data.json';
import fs from 'fs';
import path from 'path';

const filePath = path.join('public', 'assets', 'data.json'); // Adjust the path based on your project structure
const fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

export const GET = async (request, { params }) => {
    try {
        if (params) {
            schedule = schedules.filter((item) => item.id === params.id)
        } else {
            return new Response(Json.stringify(schedule));
        }
    } catch (error) {
        console.log(error)
    }
};

export const PATCH = async (request, { params }) => {
    try {
        const scheduleIdToUpdate = params.id; // Assuming you want to Update the schedule with id 3
        const jsonData = await request.json();
        // console.log("data", data)
        const indexToUpdate = fileData.schedules.findIndex(schedule => schedule.id == scheduleIdToUpdate);
        console.log("indexToUpdate", indexToUpdate)
        if (indexToUpdate !== -1) {
            // Remove the schedule at the found index
            fileData.schedules[indexToUpdate] = jsonData;
        }
        console.log("uu", fileData.schedules[indexToUpdate])
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return new Response(JSON.stringify("Data Updated successfully"), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }

}

export const DELETE = async (request, { params }) => {
    try {
        const scheduleIdToDelete = params.id; // Assuming you want to delete the schedule with id 3

        const indexToDelete = fileData.schedules.findIndex(schedule => schedule.id == scheduleIdToDelete);
        console.log("indexToDelete", indexToDelete)
        if (indexToDelete !== -1) {
            // Remove the schedule at the found index
            fileData.schedules.splice(indexToDelete, 1);
        }
        fs.writeFileSync(filePath, JSON.stringify(fileData, null, 2), 'utf-8');
        return new Response(JSON.stringify("Data DEleted successfully"), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
