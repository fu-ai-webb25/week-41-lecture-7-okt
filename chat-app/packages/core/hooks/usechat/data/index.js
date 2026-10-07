import { useState, useEffect } from 'react';
import { llm } from '@chat-app/llm';
import {
    HumanMessage,
    AIMessage,
    SystemMessage
} from '@langchain/core/messages';

export const useChat = () => {
    const [messages, setMessages] = useState(() => {
        const chatHistory =
            JSON.parse(localStorage.getItem('messages')) || [
                {
                    role: 'assistant',
                    content: 'Hallå där, köp blåbär!'
                }
            ];
        
        return chatHistory.map((message) => {
            if (message.role === 'user') {
                return new HumanMessage(message.content);
            }
            
            return new AIMessage(message.content);
        });
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const chatHistory = messages.map((message) => ({
            role: message.getType() === 'human'
                ? 'user'
                : 'assistant',
            content: message.content
        }));

        localStorage.setItem(
            'messages',
            JSON.stringify(chatHistory)
        );
    }, [messages]);

    const getAnswer = async (question) => {
        const userMessage = new HumanMessage(question);

        const history = [
            ...messages,
            userMessage
        ];
        setMessages(history);
        setIsLoading(true);
        setError(false);

        try {
            const systemMessage = new SystemMessage('Du är en hjälpsam AI-assistent, som enbart kan och får svara på frågor som rör pokemon. Om en fråga ställs om något annat ämne, så svarar du otrevligt tillbaks!');

            const answer = await llm.invoke([
                systemMessage,
                ...history
            ]);
            
            const aiMessage = new AIMessage(answer.content);
            setMessages([
                ...history,
                aiMessage
            ]);
        } catch(error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    const clearHistory = () => {
        setMessages([]);
    }

    return { 
        messages, 
        getAnswer,
        isLoading,
        error
    }

}