import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Layout from './components/Layout';
import ClipboardInspector from './components/ClipboardInspector';

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <ClipboardInspector />
      </Layout>
    </ThemeProvider>
  );
}

export default App;