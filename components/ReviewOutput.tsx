
import React from 'react';
import { FeedbackItem } from '../types';
import { FeedbackCard } from './FeedbackCard';
import { Loader } from './Loader';

interface ReviewOutputProps {
    feedback: FeedbackItem[];
    isLoading: boolean;
    error: string | null;
}

const WelcomeMessage = (): React.ReactNode => (
    <div className="text-center text-gray-400">
        <div className="flex justify-center mb-4">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-300">Code Review Feedback</h3>
        <p className="mt-2">Your code analysis results will appear here.</p>
        <p className="mt-1 text-sm">Paste your code on the left and click "Review Code" to start.</p>
    </div>
);

export const ReviewOutput = ({ feedback, isLoading, error }: ReviewOutputProps): React.ReactNode => {
    return (
        <div className="flex flex-col bg-gray-800 rounded-lg border border-gray-700 shadow-lg min-h-[70vh] lg:min-h-0">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-gray-200">Analysis Report</h2>
            </div>
            <div className="flex-grow p-4 overflow-y-auto">
                {isLoading && <Loader />}
                {error && <div className="text-red-400 bg-red-900/50 p-4 rounded-lg">{error}</div>}
                {!isLoading && !error && feedback.length === 0 && <WelcomeMessage />}
                {!isLoading && !error && feedback.length > 0 && (
                    <div className="space-y-4">
                        {feedback.map((item, index) => (
                            <FeedbackCard key={index} item={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
