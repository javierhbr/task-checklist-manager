import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface PreviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

const PreviewDialog: React.FC<PreviewDialogProps> = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-auto flex-grow">
          <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap break-words">
            <code>{content}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreviewDialog;
