import { format } from "date-fns"
import prismadb from "@/lib/prismadb";
import { ReviewClient } from "./components/client"
import { ReviewColumn } from "./components/column";

const ReviewsPage = async({
    params
}: {params: {storeId: string}}) => {
    const reviews = await prismadb.review.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedReviews: ReviewColumn[] = reviews.map((item) => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        email: item.email,
        occupation: item.occupation,
        description: item.description,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ReviewClient  data={formattedReviews}/>
            </div>
        </div>
    )
}

export default ReviewsPage;