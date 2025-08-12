import React from "react";
import styles from './InputFileDragDrop.module.scss';

interface FileUploadProps extends React.ComponentPropsWithoutRef<'input'> {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  maxSize?: number;
  error?: { message?: string };
}

const FileUpload = React.forwardRef<HTMLInputElement, FileUploadProps>(
  ({ label, required, disabled, accept = ".pdf", error, ...props }, ref) => {
    const [fileName, setFileName] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        setFileName(e.target.files[0].name);
      }
      props.onChange?.(e);
    };

    return (
      <div className={styles.customFileUploadContainer}>
        {label && (
          <label className={styles.customFileUploadLabel}>
            {label} {required && <span>*</span>}
          </label>
        )}
        
        <div className="flex items-center justify-center w-full">
          <label className={`${styles.fileUploadArea} ${disabled ? styles.disabled : ''}`}>
            <div className={styles.uploadContent}>
              {fileName ? (
                <p className={styles.fileName} title={fileName}>
                  {fileName}
                </p>
              ) : (
                <>
                  <p className={styles.uploadText}>
                    <span className={styles.uploadAction}>Clique para enviar</span> ou arraste o arquivo
                  </p>
                  <p className={styles.fileTypes}>
                    {accept.toUpperCase()} (Max. 5MB)
                  </p>
                </>
              )}
            </div>
            <input
              ref={ref}
              type="file"
              className="hidden"
              accept={accept}
              disabled={disabled}
              onChange={handleFileChange}
              {...props}
            />
          </label>
        </div>

        {error?.message && (
          <small className={styles.errorMessage}>{error.message}</small>
        )}
      </div>
    );
  }
);

export default FileUpload;