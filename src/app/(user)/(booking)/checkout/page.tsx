import Payment from "@/components/checkout/payment";
import ScheduleInfo from "@/components/checkout/schedule.info";
import { sendRequest } from "@/utils/api";
import { Box } from "@mui/material";


const CheckOut = async ({ searchParams, }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const scheduleID = searchParams.scheduleID
    let scheduleResponse: ISchedule | null = null;
    let error = null;
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/schedules/${scheduleID}`);
        const res = await sendRequest<IBackendRes<ISchedule>>({
            url: url.toString(),
            method: "GET",
        });
        if (res && res.data) {
            scheduleResponse = res.data;
        }
    } catch (err) {
        error = err;
    }



    return (
        <Box>
            <ScheduleInfo
                scheduleResponse={scheduleResponse!}
            />
            <Payment
                scheduleResponse={scheduleResponse!}
            />
        </Box >
    )
}

export default CheckOut