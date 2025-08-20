
import React from 'react';

interface CodeInputProps {
    code: string;
    setCode: (code: string) => void;
    onReview: () => void;
    isLoading: boolean;
}

export const CodeInput = ({ code, setCode, onReview, isLoading }: CodeInputProps): React.ReactNode => {
    return (
        <div className="flex flex-col h-full bg-gray-800 rounded-lg border border-gray-700 shadow-lg">
            <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold text-gray-200">Your Code</h2>
            </div>
            <div className="flex-grow p-1">
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste your code here..."
                    className="w-full h-[60vh] lg:h-full bg-gray-900 text-gray-300 font-mono p-4 rounded-b-md resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
                    spellCheck="false"
                />
            </div>
            <div className="p-4 border-t border-gray-700 mt-auto">
                <button
                    onClick={onReview}
                    disabled={isLoading}
                    className="w-full bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-500/50 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Analyzing...</span>
                        </>
                    ) : (
                        <span>Review Code</span>
                    )}
                </button>
            </div>
        </div>
    );
};
