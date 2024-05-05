import { format } from "date-fns"
import prismadb from "@/lib/prismadb";
import { ReviewClient } from "./components/client"
import { SubscriberColumn } from "./components/column";

const SubscribersPage = async({
    params
}: {params: {storeId: string}}) => {
    const subscribers = await prismadb.subscriber.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });
    console.log("here is the subscriber data:", subscribers)

    const formattedSubscriber: SubscriberColumn[] = subscribers.map((item) => ({
        id: item.id,
        email: item.email,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ReviewClient  data={formattedSubscriber}/>
            </div>
        </div>
    )
}

export default SubscribersPage;