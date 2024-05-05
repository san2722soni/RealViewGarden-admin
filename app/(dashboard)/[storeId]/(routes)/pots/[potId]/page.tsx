import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

const PotPage = async ({
    params
}: {
    params: {potId: string}
}) => {

    const pot = await prismadb.pot.findUnique({
        where: {
            id: params.potId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeForm initialData={pot}  />
            </div>
        </div>
    )
}

export default PotPage;