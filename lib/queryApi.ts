import openai from "./chatgpt";

const query = async (prompt: string, model: string) => {
  const res = await openai.completions
    .create({
      model,
      prompt,
      temperature: 0.9,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false,
      n: 1,
    })
    .then((res: any) => res.data.choices[0].text)
    .catch(
      (err: any) => `ChatGPT Error: 
            ${err.message}`
    );

  return res;
};

export default query;
