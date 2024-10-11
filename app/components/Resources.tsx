'use client'

import React from 'react'

interface Resource {
  title: string;
  description: string;
  link: string;
  category: string;
}

const resources: Resource[] = [
  {
    title: "Music Theory Basics",
    description: "A comprehensive guide to music theory fundamentals.",
    link: "https://example.com/music-theory",
    category: "Education"
  },
  {
    title: "Top 10 DAWs for Beginners",
    description: "Compare the best Digital Audio Workstations for new producers.",
    link: "https://example.com/daw-comparison",
    category: "Production"
  },
  {
    title: "Music Marketing Strategies",
    description: "Learn how to promote your music effectively in the digital age.",
    link: "https://example.com/music-marketing",
    category: "Marketing"
  },
  {
    title: "Royalties and Copyright Guide",
    description: "Understand music royalties and copyright laws for artists.",
    link: "https://example.com/royalties-guide",
    category: "Business"
  },
  // Add more resources as needed
]

const Sources: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Music Industry Resources</h1>
      <p className="mb-8">Explore these valuable resources to enhance your music career.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
            <p className="text-gray-600 mb-2">{resource.description}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {resource.category}</p>
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 hover:underline"
            >
              Learn More
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sources
