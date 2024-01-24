import Schedule from '@models/product';
import connectDB from "@utils/mongoDB";

await connectDB();
export const GET = async (request) => {
    try {
        if (request.url.includes('search=')) {
            const searchValue = request.url.split('=')[1].replace('%20', ' ');
            const schedules = await Schedule.find({ title: { $regex: searchValue, $options: "i" } });
            return new Response(JSON.stringify(schedules), { status: 200 });
        }
        else {
            const schedules = await Schedule.find({})
            return new Response(JSON.stringify(schedules), { status: 200 })
        }
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all schedules", { status: 500 })
    }
};

export const POST = async (request, res) => {
    const { title, description, subject, frequency, time, repeat } = await request.json();

    const schedule = new Schedule({
        title: title,
        description: description,
        subject: subject,
        frequency: frequency,
        time: time,
        repeat: repeat

    })
    await schedule.save();
    return new Response(JSON.stringify({ message: "Data received successfully" }), { status: 201 });
}
