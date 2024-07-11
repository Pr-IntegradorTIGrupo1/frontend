import React from 'react'

const Loading = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-t-4 border-gray-200"></div>
    </div>
  )
}

export default Loading
