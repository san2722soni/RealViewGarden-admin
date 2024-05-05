import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE (
    req: Request,
    { params }: {params: {storeId: string, subscriberId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.subscriberId) {
            return new NextResponse("Subscriber id is required", { status: 400});
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

        const subscriber = await prismadb.subscriber.deleteMany({
            where:{
                id: params.subscriberId,
            }
        });
        return NextResponse.json(subscriber);

    } catch (error) {
        console.log('[SUBSCRIBER_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

