import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
    onImageSelect: (file: File) => void;
    currentImageUrl?: string;
    onImageRemove?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onImageSelect,
    currentImageUrl,
    onImageRemove,
}) => {
    const [preview, setPreview] = useState<string | null>(currentImageUrl || null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            if (file) {
                // Créer une preview
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result as string);
                };
                reader.readAsDataURL(file);

                // Notifier le parent
                onImageSelect(file);
            }
        },
        [onImageSelect]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'],
        },
        maxFiles: 1,
        multiple: false,
    });

    const handleRemove = () => {
        setPreview(null);
        if (onImageRemove) {
            onImageRemove();
        }
    };

    return (
        <div className="space-y-4">
            {preview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-glass-border">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-64 object-cover"
                    />
                    <Button
                        type="button"
                        onClick={handleRemove}
                        variant="destructive"
                        size="sm"
                        className="absolute top-4 right-4 rounded-full"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${isDragActive
                            ? 'border-primary bg-primary/5'
                            : 'border-glass-border hover:border-primary hover:bg-primary/5'
                        }`}
                >
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center">
                        <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mb-4">
                            {isDragActive ? (
                                <Upload className="h-8 w-8 text-white animate-bounce" />
                            ) : (
                                <ImageIcon className="h-8 w-8 text-white" />
                            )}
                        </div>
                        <p className="text-lg font-semibold mb-2">
                            {isDragActive
                                ? 'Déposez l\'image ici'
                                : 'Glissez-déposez une image'}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            ou cliquez pour sélectionner
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, JPEG, WEBP ou GIF (max. 10MB)
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
