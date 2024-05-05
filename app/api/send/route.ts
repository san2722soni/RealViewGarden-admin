import fs from "fs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { mailOptions, transpoter } from "@/components/config/nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { storeId } = body;

    const subscribers = await prismadb.subscriber.findMany({
      where: {
        storeId: storeId,
      },
    });

    // Fetching the latest product added
    const product = await prismadb.product.findFirst({
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
        pot: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!subscribers) {
      return new NextResponse("No Subscribers", { status: 401 });
    }

    // const htmlFile = fs.readFileSync('./EmailTemplate.html', 'utf-8');

    const sendMail = async (MailOptions: {}) => {
      await transpoter.sendMail({
        ...MailOptions,
        subject: "I DK",
        text: `Recived an email from website."`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="card" style="width: 650px; height: 375px; position: absolute; background: white; margin: 0 auto; top: 50%; left: 50%; transform: translate(-50%, -50%); box-shadow: 0 2px 5px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12); transition: all 0.3s;">
                <nav style="width: 100%; color: #727272; text-transform: uppercase; padding: 20px; border-bottom: 2px solid #efefef; font-size: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-external-link" style="height: 24px; width: 24px; float: left; margin-right: 10px;"><path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>
                    <span style="margin-left: 5px;">Open in website</span>
                </nav>
                <div class="photo" style="padding: 30px; width: 45%; text-align: center; float: left;">
                    <img src="${product?.images[0]?.url}" width="250px" height="250px">
                </div>
                <div class="description" style="padding: 30px; float: left; width: 55%; border-left: 2px solid #efefef;">
                    <h2 style="color: #515151; margin: 0; text-transform: uppercase; font-weight: 500;">${product?.name}</h2>
                    <h4 style="margin: 0; color: #727272; text-transform: uppercase; font-weight: 500;">${product?.category?.name}</h4>
                    <h1 style="color: #515151; font-weight: 300; padding-top: 15px; margin: 0; font-size: 30px; font-weight: 300;">₹${product?.price}</h1>
                    <br/>
                    <h4 style="color: #727272; margin: 0; text-transform: uppercase; font-weight: 500; font-size: 12px;">Size: ${product?.size?.name}</h4>
                    <h4 style="color: #727272; margin: 0; text-transform: uppercase; font-weight: 500; font-size: 12px;">Color: ${product?.color?.name}</h4>
                    <h4 style="color: #727272; margin: 0; text-transform: uppercase; font-weight: 500; font-size: 12px;">Material: ${product?.pot?.name}</h4>
                </div>
            </div>
        </body>
        </html>
        
        `,
      });
    };

    // Dynamically changing email field by subscribers . To send message
    subscribers.forEach(async (elem, index) => {
      const MailOptions = { ...mailOptions, to: elem.email };
      console.log(MailOptions);
      await sendMail(MailOptions);
    });

    return new NextResponse("Fetching...", { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal server error", { status: 400 });
  }
}
