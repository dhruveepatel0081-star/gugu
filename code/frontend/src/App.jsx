import React from 'react';
import { Toaster } from 'react-hot-toast';
import Deck from './pages/Deck.jsx';

export default function App() {
  return (
    <>
      <Deck />
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: '#0F172A',
            color: '#fff',
            borderRadius: '9999px',
            fontSize: '13px',
            fontWeight: 600,
          },
          iconTheme: { primary: '#A3E635', secondary: '#0F172A' },
        }}
      />
    </>
  );
}
