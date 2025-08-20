
import React from 'react';
import { FeedbackItem, Severity } from '../types';

interface FeedbackCardProps {
    item: FeedbackItem;
}

const severityConfig = {
    [Severity.CRITICAL]: {
        bgColor: 'bg-red-900/50',
        borderColor: 'border-red-500',
        textColor: 'text-red-400',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        )
    },
    [Severity.WARNING]: {
        bgColor: 'bg-yellow-900/50',
        borderColor: 'border-yellow-500',
        textColor: 'text-yellow-400',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 3.001-1.742 3.001H4.42c-1.53 0-2.493-1.667-1.743-3.001l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
        )
    },
    [Severity.SUGGESTION]: {
        bgColor: 'bg-blue-900/50',
        borderColor: 'border-blue-500',
        textColor: 'text-blue-400',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM12 14a1 1 0 01.968-.728A2.5 2.5 0 0015.5 10.5a1 1 0 11-2 0 1.5 1.5 0 01-3 0 1 1 0 01-.5-1.932V6.5a1 1 0 112 0v.658a2.5 2.5 0 001.5 2.332 1 1 0 11-.968 1.744A1.5 1.5 0 0112 11.5a1 1 0 01-1-1 2.5 2.5 0 00-5 0 1 1 0 01-1 1.732A2.5 2.5 0 006.5 13H8v1z" />
            </svg>
        )
    },
    [Severity.NITPICK]: {
        bgColor: 'bg-gray-700/50',
        borderColor: 'border-gray-600',
        textColor: 'text-gray-400',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z" />
            </svg>
        )
    }
};

export const FeedbackCard = ({ item }: FeedbackCardProps): React.ReactNode => {
    const config = severityConfig[item.severity] || severityConfig[Severity.NITPICK];
    
    return (
        <div className={`border-l-4 p-4 rounded-r-lg ${config.borderColor} ${config.bgColor}`}>
            <div className="flex items-center mb-2">
                <span className={config.textColor}>{config.icon}</span>
                <h3 className={`ml-2 text-md font-bold ${config.textColor}`}>{item.severity}</h3>
                <span className="ml-auto text-sm font-mono bg-gray-700 text-gray-300 px-2 py-1 rounded">Line: {item.line}</span>
            </div>
            <p className="text-gray-300 mb-3">{item.comment}</p>
            <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Suggestion:</h4>
                <pre className="bg-gray-900 p-3 rounded-md text-gray-300 text-sm font-mono overflow-x-auto">
                    <code>{item.suggestion}</code>
                </pre>
            </div>
        </div>
    );
};
