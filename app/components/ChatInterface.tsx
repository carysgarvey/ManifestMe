'use client';

import React, { useState, useEffect, KeyboardEvent } from 'react';

interface AIResponse {
  response: string;
  additional_info?: string;
}

interface Message {
  role: 'user' | 'assistant';
  content: string | AIResponse;
}

const ChatInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('ChatInterface rendered');
  }, []);

  const handleSendMessage = async () => {
    console.log('handleSendMessage called');
    if (!input.trim()) return;

    setIsLoading(true);
    const userMessage: Message = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMessage]);

    try {
      console.log('Sending request to /api/chat');
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...chatHistory, userMessage],
        }),
      });

      console.log('Response received:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Parsed data:', data);

      if (typeof data.message === 'object' && 'response' in data.message) {
        const aiMessage: Message = { 
          role: 'assistant', 
          content: data.message as AIResponse 
        };
        setChatHistory(prev => [...prev, aiMessage]);
      } else {
        throw new Error('Unexpected response format from AI');
      }

      setInput('');
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      alert('An error occurred while sending the message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div>
      <div className="chat-history">
        {chatHistory.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
            {message.role === 'assistant' && typeof message.content === 'object' ? (
              <div>
                <p>{message.content.response}</p>
                {message.content.additional_info && (
                  <p><em>Additional info: {message.content.additional_info}</em></p>
                )}
              </div>
            ) : (
              <p>{typeof message.content === 'string' ? message.content : JSON.stringify(message.content)}</p>
            )}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          id="chat-input"
          name="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button 
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
