
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { ReviewOutput } from './components/ReviewOutput';
import { reviewCode } from './services/geminiService';
import { FeedbackItem } from './types';

const sampleCode = `import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch('https://api.example.com/data')
      .then(res => res.json())
      .then(result => {
        setData(result);
      });
  }

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      {data ? 
        (<ul>{data.items.map(item => <li>{item.name}</li>)}</ul>) 
        : <p>Loading...</p>}
    </div>
  );
}`;


function App(): React.ReactNode {
  const [code, setCode] = useState<string>(sampleCode);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleReview = useCallback(async () => {
    if (!code.trim()) {
      setError("Please enter some code to review.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setFeedback([]);
    try {
      const result = await reviewCode(code);
      setFeedback(result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [code]);

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
          <CodeInput 
            code={code} 
            setCode={setCode} 
            onReview={handleReview} 
            isLoading={isLoading} 
          />
          <ReviewOutput 
            feedback={feedback} 
            isLoading={isLoading} 
            error={error} 
          />
        </div>
      </main>
    </div>
  );
}

export default App;
