'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { callAPI } from '@/app/actions';

export default function FunNotesForm() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setOutput(''); // Clear previous output

    try {
      const result = await callAPI(input);
      setOutput(result);
    } catch (error) {
      setOutput('Error: ' + (error instanceof Error ? error.message : 'An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      alert('Note copied to clipboard!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your note here..."
        className="w-full"
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Make My Note Fun!'}
      </Button>
      {output && (
        <div className="mt-4">
          <pre className="p-4 bg-gray-100 rounded overflow-auto">{output}</pre>
          <Button onClick={handleCopy} className="mt-2">
            Copy Note
          </Button>
        </div>
      )}
    </form>
  );
}