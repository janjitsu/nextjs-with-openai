// ./src/pages/api/v1/chat.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const key: string = INSERT_OPENAI_KEY_HERE;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  if (body?.input.length === 0 || !body) {
    res.status(400).json({ error: "Missing input value!" });
    return;
  }

  const configuration = new Configuration({
    apiKey: key,
  });
  const openia = new OpenAIApi(configuration);

  console.log("< CHAT API : REQ > ", body?.input);

  interface RawResponseReturn {
    data: {
      id: string;
      object: string;
      model: string;
      choices: {
        message: {
          role: string;
          content: string;
        };
      }[0];
      usage?: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
      };
    };
    status: number;
  }

  try {
    const rawResponse: RawResponseReturn = await openia.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: [...body?.input],
      temperature: 0.1,
      max_tokens: 600,
    });

    if (rawResponse?.status == 200) {
      const { message } = rawResponse?.data?.choices[0];

      res.status(200).json(message);
    } else {
      res.status(400).json({ error: "something got wrong" });
    }
  } catch (e: any) {
    res.status(400).json({ error: e });
  }
}

