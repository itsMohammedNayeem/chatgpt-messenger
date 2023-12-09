import openai from "@/lib/chatgpt";
import type { NextApiRequest, NextApiResponse } from "next";

type Option = {
  label: string;
  value: string;
};

type Data = {
  modelOptions: Option[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const models = await openai.models.list().then((res) => res.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  res.status(200).json({
    modelOptions,
  });
}
