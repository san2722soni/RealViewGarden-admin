import prismadb from "@/lib/prismadb";

export async function getSubscribers(storeId: string){
    const subscribers = await prismadb.subscriber.findMany({
        where: {
          storeId: storeId
        }
      })

      return subscribers;
}