import { Sparkles } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <header className='bg-neutral-800 border-b border-neutral-700 w-full h-16 flex items-center justify-center'>
        <div className="w-full px-4 flex">
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-white">AI Assistant</h1>
              <p className="text-sm text-gray-300">Always here to help</p>
            </div>
          </div>
        </div>
    </header>
  )
}

export default Header
