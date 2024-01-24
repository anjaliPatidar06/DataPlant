import Schedule from '@models/product';
import connectDB from "@utils/mongoDB";

await connectDB();
export const GET = async (request, { params }) => {
    try {

        console.log("PARAMS", params.id)
        const schedule = await Schedule.findById(params.id)
        if (!schedule) return new Response("schedule Not Found", { status: 404 });

        return new Response(JSON.stringify(schedule), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}

export const PATCH = async (request, { params }) => {
    const { title, description, subject, frequency, time, repeat } = await request.json();

    try {
        const existingSchedule = await Schedule.findById(params.id);
        if (!existingSchedule) {
            return new Response("Schedule not found", { status: 404 });
        }

        existingSchedule.title = title;
        existingSchedule.description = description;
        existingSchedule.subject = subject;
        existingSchedule.time = time;
        existingSchedule.frequency = frequency;
        existingSchedule.repeat = repeat;

        await existingSchedule.save();

        return new Response("Successfully updated the Schedule", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error Updating Schedule", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        const schedule = await Schedule.findById(params.id);
        await Schedule.deleteOne(schedule);

        return new Response("Schedule deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Error deleting schedule", { status: 500 });
    }
};