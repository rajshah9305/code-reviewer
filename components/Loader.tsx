
import React from 'react';

export const Loader = (): React.ReactNode => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-400">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-500"></div>
            <p className="mt-4 text-lg font-semibold">Analyzing your code...</p>
            <p className="text-sm">Gemini is thinking.</p>
        </div>
    );
};
