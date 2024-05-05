import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET (
    req: Request,
    { params }: {params: {potId: string}}
) {
    try {
        if (!params.potId) {
            return new NextResponse("Pot id is required", { status: 400});
        }

        const pot = await prismadb.pot.findUnique({
            where: {
                id: params.potId,
            }
        })

        return NextResponse.json(pot);

    } catch (error) {
        console.log('[POT_GET]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function PATCH(
    req: Request,
    { params }: {params: {storeId: string, potId: string}}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name , value} = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 400 });
        }

        if (!name) {
            return new NextResponse("Name is required", {status: 400});
        }

        if (!value) {
            return new NextResponse("Value is required", {status: 400});
        }

        if (!params.potId) {
            return new NextResponse("Pot id is required", { status: 400});
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 400});
        }

        const pot = await prismadb.pot.updateMany({
            where:{
                id: params.potId,
            }, 
            data: {
                name,
                value
            }
        });

        return NextResponse.json(pot);

    } catch (error) {
        console.log('[POT_PATCH]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

export async function DELETE (
    req: Request,
    { params }: {params: {storeId: string, potId: string}}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!params.potId) {
            return new NextResponse("Pot id is required", { status: 400});
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

        const pot = await prismadb.pot.deleteMany({
            where:{
                id: params.potId,
            }
        });
        return NextResponse.json(pot);

    } catch (error) {
        console.log('[POT_DELETE]', error);
        return new NextResponse("Internal error", {status: 500});
    }
};

