import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if the API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error('OPENAI_API_KEY is not set in the environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  console.log('API route called');
  
  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    console.log('Sending request to OpenAI API...');
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Provide your responses in JSON format with keys 'response' and 'additional_info'." },
        ...messages
      ],
    });
    console.log('Received response from OpenAI API:', JSON.stringify(response, null, 2));

    const aiMessage = response.choices[0].message?.content || '';
    console.log('AI response content:', aiMessage);

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(aiMessage);
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
      parsedResponse = { response: aiMessage, additional_info: 'Error: Could not parse JSON' };
    }

    console.log('Parsed response:', parsedResponse);

    if (!parsedResponse.response) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Ensure the response is in the expected format
    const formattedResponse = {
      role: 'assistant',
      content: {
        response: parsedResponse.response,
        additional_info: parsedResponse.additional_info || ''
      }
    };

    return NextResponse.json({ message: formattedResponse });
  } catch (error) {
    console.error('Error in API route:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    return NextResponse.json({ 
      error: 'There was an error processing your request.',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
