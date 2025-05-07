'use client';
import Script from 'next/script';
import React from 'react';

export default function VoiceAssistant() {
  return (
    <div className="call-assistant-container">
      {/* Use JSX type assertion to avoid TypeScript errors */}
      {React.createElement('embeddable-voice', { id: "b3038f80-c256-405b-b352-5a533840dfc1" })}
      
      <Script
        src="https://cdn.247aireceptionist.com/call-embeddable-widget-v2.js"
        strategy="afterInteractive"
        onLoad={() => console.log('Script cargado correctamente')}
        onError={(e) => console.error('Error al cargar el script', e)}
      />
    </div>
  );
}
