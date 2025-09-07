import React from 'react';
import { Button } from './ui/button';

interface ImportConfirmationDialogProps {
  isOpen: boolean;
  onExport: () => void;
  onImport: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  Icon?: React.ElementType;
}

const ImportConfirmationDialog: React.FC<ImportConfirmationDialogProps> = ({ 
  isOpen, 
  onExport, 
  onImport, 
  onCancel, 
  title, 
  message, 
  Icon 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex items-start gap-4">
          {Icon && (
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                <Icon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
            </div>
          )}
          <div className="text-left">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{message}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-2">
          <Button onClick={onImport} variant="destructive" className="w-full sm:w-auto">
            Import
          </Button>
          <Button onClick={onExport} variant="default" className="w-full sm:w-auto">
            Export Current Data
          </Button>
          <Button onClick={onCancel} variant="outline" className="w-full sm:w-auto">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImportConfirmationDialog;
