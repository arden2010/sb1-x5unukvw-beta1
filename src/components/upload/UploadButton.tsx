import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import Button from '../common/Button';
import UploadModal from './UploadModal';

export default function UploadButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2"
      >
        <ArrowUpTrayIcon className="h-5 w-5" />
        上传文件
      </Button>

      {showModal && (
        <UploadModal onClose={() => setShowModal(false)} />
      )}
    </>
  );
}