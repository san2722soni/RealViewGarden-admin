import { format } from "date-fns"
import prismadb from "@/lib/prismadb";
import { PotsClient } from "./components/client"
import { PotColumn } from "./components/column";

const PotsPage = async({
    params
}: {params: {storeId: string}}) => {
    const pots = await prismadb.pot.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy:{
            createdAt: 'desc'
        }
    });

    const formattedPots: PotColumn[] = pots.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <PotsClient  data={formattedPots}/>
            </div>
        </div>
    )
}

export default PotsPage

;