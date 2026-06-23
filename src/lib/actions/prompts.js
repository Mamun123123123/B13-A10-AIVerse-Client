'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createPrompt = async (newPromptData) => {
  try {
    const res = await fetch(`${baseUrl}/api/prompts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPromptData),
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to create prompt');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('createPrompt error:', error);
    return { success: false, error: error.message };
  }
};