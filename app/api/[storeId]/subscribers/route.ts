import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params} : {params: {storeId: string}}
) {
    try{
        const body = await req.json();
        const { email} = body;

        if (!email) {
            return new NextResponse("Email is required", {status: 400});
        }
        
        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }
        
        const subscriber = await prismadb.subscriber.create({
            data: {
                email,
                storeId: params.storeId
            }
        });
        
        return NextResponse.json(subscriber);
    } catch (error) {
        console.log('[SUBSCRIBER_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(
    req: Request,
    {params} : {params: {storeId: string}}
    ) {
        try{
            if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }
        
        const subscribers = await prismadb.subscriber.findMany({
            where: {
                storeId: params.storeId
            }
        });
        return NextResponse.json(subscribers);
    } catch (error) {
        console.log('[SUBCRIBERS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

