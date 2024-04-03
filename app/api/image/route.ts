import OpenAI from "openai";

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = "edge";

const openai = new OpenAI({
   apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
   // Extract the `messages` from the body of the request
   const { prompt } = await req.json();
   // Request the OpenAI API for the response based on the prompt
   const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
   });
   const image_url = response.data[0].url;
   console.log(image_url);

   // Convert the response into a friendly text-stream
   return new Response(JSON.stringify({ url: image_url }));
}
