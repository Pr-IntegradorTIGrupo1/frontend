import VersionTable from '@/components/controlVersion/VersionTable';
import Link from 'next/link'
import React from 'react'
import ForosPage from '@/components/forum/ForumList';
import ForoDetailPage from '@/components/forum/ForumDetail';

const Forum = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 w-full">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Foros de Documentos
        </h1>
        <ForoDetailPage />
      </div>
    </div>
  );
}

export default Forum
