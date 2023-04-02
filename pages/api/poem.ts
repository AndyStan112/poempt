// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import keyword_extractor from 'keyword-extractor';
const configuration = new Configuration({
  apiKey: process.env.GPT,
});
const openai = new OpenAIApi(configuration);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    let prompt = 'make a poem';
    const data = req.body;
    console.log(data);
    const keywords = keyword_extractor
      .extract(data.subject, {
        language: 'english',
        remove_digits: true,
        return_changed_case: false,
        remove_duplicates: true,
      })
      .join(',');

    console.log(prompt);

    prompt =
      'Write a ' +
      data.mood +
      ' ' +
      data.stanzaStyle +
      ' ' +
      data.rhyme +
      ' poem  with ' +
      data.verses +
      ' verses' +
      ' belonging to the ' +
      data.writingStyle +
      ' style. Make a sugestive title separated by spaces. Base your creation on the following comma-separated keywords: ' +
      keywords +
      '.';

    console.log(prompt);
    const poemCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      max_tokens: 128,
    });
    const response = poemCompletion.data.choices[0].text || '';
    const title = response
      .trim()
      .split('\n')[0]
      .replace('title', '')
      .replace('Title', '')
      .replace(':', '')
      .replace('"', '');
    const verseArray = response
      .trim()
      .split('\n')
      .filter((e) => !e.toLowerCase().startsWith('verse'));
    verseArray.splice(0, 1);
    const poem = verseArray.join('\n');

    console.log(title, poem);
    res.status(200).send({ title: title, poem: poem });
  } catch (error) {
    console.log(error);
    res.status(500).send({ result: 'error' });
  }
}
