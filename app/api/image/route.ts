// import { auth } from "@clerk/nextjs";
// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const instructionMessage: ChatCompletionMessageParam = {
//   role: "system",
//   content: "Answer questions as short and quickly as possible. You must do it under 75 tokens."
// }

// export async function POST(
//   req: Request
// ) {
//   try {
//     const { userId } = auth();
//     const body = await req.json();
//     const { messages  } = body;

//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }

//     if (!openai.apiKey) {
//       return new NextResponse("OpenAI API Key not configured.", { status: 500 });
//     }

//     if (!messages) {
//       return new NextResponse("Messages are required", { status: 400 });
//     }

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       max_tokens: 75,
//       temperature: 0.5,
//       messages: [instructionMessage, ...messages]
//     });

//     return NextResponse.json(response.choices[0].message);
//   } catch (error) {
//     console.log('[CONVERSATION_ERROR]', error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// };


import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import { auth } from "@clerk/nextjs";

const configuration = {
    apiKey: process.env.OPENAI_API_KEY,
};

const openai = new OpenAI(configuration);

// const openai = new OpenAI();

// export async function POST(
//     req: Request
// ) {
//     try {
//         const { userId } = auth();
//         const body = await req.json();
//         const { prompt, amount = 1, resolution = "512x512" } = body;


//         if (!userId) {
//             return new NextResponse("Unathorized", { status: 401 })
//         }

//         if (!configuration.apiKey) {
//             return new NextResponse("OpenAI key not configured", { status: 500 });
//         }

//         if (!prompt) {
//             return new NextResponse("Prompt is required", { status: 400 });
//         }

//         if (!amount) {
//             return new NextResponse("Amount is required", { status: 400 });
//         }

//         if (!resolution) {
//             return new NextResponse("Resolution is required", { status: 400 });
//         }

//         const response = await openai.createImage({
//             prompt,
//             n: parseInt(amount, 10),
//             size: resolution,
//         });

//         return NextResponse.json(response.data.data);

//     } catch (error) {
//         console.log("image error", error);
//         return new NextResponse("internal error", { status: 500 });
//     }
// } 


export async function POST(
    req: Request
) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount = 1, resolution = "hd" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!configuration.apiKey) {
            return new NextResponse("OpenAI API Key not configured.", { status: 500 });
        }

        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }

        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const response = await openai.images.generate({
            model: "dall-e-2",
            prompt: prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        // console.log(response.data);

        // const response = await openai.images.generate({
        //     model: "dall-e-3",
        //     prompt,
        //     n: parseInt(amount, 10),
        //     size: resolution,
        // });


        return NextResponse.json(response.data);

        // return NextResponse.json(response.data);
    } catch (error) {
        console.log('[IMAGE_ERROR]', error);
        return new NextResponse("Internal Error number 1", { status: 500 });
    }
};