import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CaptureButton from './components/capture/CaptureButton';
import { useClipboardMonitor } from './hooks/useClipboardMonitor';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Import pages directly without lazy loading for better reliability
import Dashboard from './pages/Dashboard';
import Contents from './pages/Contents';
import Tasks from './pages/Tasks';
import Tags from './pages/Tags';
import Settings from './pages/Settings';

export default function App() {
  useClipboardMonitor();
  useKeyboardShortcuts();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="contents" element={<Contents />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="tags" element={<Tags />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <CaptureButton />
    </Router>
  );
}