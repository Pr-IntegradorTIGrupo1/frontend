'use client';
import React from 'react';
import Image from 'next/image';

export default function HelpInfo() {
  return (
    <div className="h-screen overflow-y-auto flex justify-center items-start">
      <div className="relative w-full h-auto">
        <Image
          src="/img/Ayuda.png"
          alt="Ayuda"
          layout="responsive"
          width={1200}
          height={1600}
          className="object-cover"
        />
      </div>
    </div>
  );
}
