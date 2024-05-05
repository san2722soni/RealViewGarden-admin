import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE (
    req: Request,
    { params }: {params: {storeId: string, reviewId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.reviewId) {
            return new NextResponse("Review id is required", { status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403});
        }

        const review = await prismadb.review.deleteMany({
            where:{
                id: params.reviewId,
            }
        });
        return NextResponse.json(review);

    } catch (error) {
        console.log('[REVIEW_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

