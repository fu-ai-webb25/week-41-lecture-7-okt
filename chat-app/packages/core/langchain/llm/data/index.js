import { ChatOllama } from '@langchain/ollama';

export const llm = new ChatOllama({
    model : 'gemma3:4b'
});