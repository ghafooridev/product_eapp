const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function fetcher<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  const response = await fetch(url, options);
  console.log('url', url)
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}
