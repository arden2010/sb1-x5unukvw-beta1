import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { DocumentArrowUpIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useContentCapture } from '../../hooks/useContentCapture';
import { processFile } from '../../utils/fileProcessing';
import { toast } from 'react-hot-toast';
import TagInput from '../tag/TagInput';

interface FileUploadProps {
  onComplete?: () => void;
}

export default function FileUpload({ onComplete }: FileUploadProps) {
  const { captureImage, captureText, isCapturing } = useContentCapture();
  const [tags, setTags] = React.useState<string[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    let success = true;
    
    for (const file of acceptedFiles) {
      try {
        const processedFile = await processFile(file);
        const metadata = {
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          tags
        };
        
        if (processedFile.type === 'image') {
          await captureImage(processedFile.content, metadata);
        } else {
          await captureText(processedFile.content, metadata);
        }
        
        toast.success(`文件 ${file.name} 已上传`);
      } catch (error) {
        console.error('File processing failed:', error);
        toast.error(`处理文件 ${file.name} 失败`);
        success = false;
      }
    }

    if (success && onComplete) {
      onComplete();
    }
  }, [captureImage, captureText, onComplete, tags]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    disabled: isCapturing
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center
          transition-colors duration-200
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isCapturing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <PhotoIcon className="h-8 w-8 text-gray-400" />
            <DocumentArrowUpIcon className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            {isCapturing ? (
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                <p className="text-base text-gray-600">正在处理文件...</p>
              </div>
            ) : (
              <>
                <p className="text-base text-gray-600">
                  {isDragActive ? (
                    '释放文件以上传'
                  ) : (
                    <>
                      拖放文件到此处，或点击<span className="text-blue-500">选择文件</span>
                    </>
                  )}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  支持图片、文本、PDF和Word文档
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          添加标签
        </label>
        <TagInput
          tags={tags}
          onTagsChange={setTags}
          placeholder="输入标签并按回车添加"
        />
      </div>
    </div>
  );
}