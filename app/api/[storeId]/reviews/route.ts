import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    {params} : {params: {storeId: string}}
) {
    try{
        const body = await req.json();
        const { name , email , occupation, description, image} = body;
        const imageUrl = image[0].url;
        console.log('Incoming body:', imageUrl);

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!email) {
            return new NextResponse("Email is required", {status: 400});
        }

        if(!occupation) {
            return new NextResponse("Occupation is required", {status: 400});
        }

        if (!description) {
            return new NextResponse("Description is required", {status: 400})
        }

        if (!imageUrl) {
            return new NextResponse("Image url is required", {status: 400});
        }
        
        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400});
        }
        
        const review = await prismadb.review.create({
            data: {
                name,
                email,
                imageUrl,
                occupation,
                description,
                storeId: params.storeId
            }
        });

        return NextResponse.json(review);
    } catch (error) {
        console.log('[REVIEWS_POST]', error);
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
        
        const reviews = await prismadb.review.findMany({
            where: {
                storeId: params.storeId
            }
        });
        return NextResponse.json(reviews);
    } catch (error) {
        console.log('[REVIEWS_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

