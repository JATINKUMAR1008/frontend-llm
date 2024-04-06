import type { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    let temp =true
    const body = await req.body
    console.log(body)
        
    res.write("stream start")
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/ai_response/${body.chatId}`, {
        method: 'POST',
        body: JSON.stringify({ input_str: body.input }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const reader = response.body ? response.body.getReader() : null;
    const decoder = new TextDecoder();
        
    if (reader) {
            temp = false
            let chunk = await reader.read();
            while (!chunk.done) {
                let resChunk = decoder.decode(chunk.value, { stream: true });
                //@ts-ignore
                res.write(resChunk)
                chunk = await reader.read();
            }
            res.end()
        }
    else{
        res.end()
    }
  
  } else {
    // Handle any other HTTP method
    res.status(405).json({error: "Method not allowed"})
  }
}