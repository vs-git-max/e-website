import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

const ImageUpload = ({
  imageFile,
  setImageFile,
  isEditMode,
  uploadedImageUrl,
  imageLoadingState,
  setUploadedImageUrl,
  setImageLoadingState,
}) => {
  const handleImageUploadChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  const inputRef = useRef(null);

  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);
    const data = new FormData();

    data.append("my_file", imageFile);

    const res = await axios.post(
      "http://localhost:8003/api/auth/admin/products/upload-image",
      data
    );

    if (res?.data?.success) {
      setUploadedImageUrl(res.data.result.url);
      setImageLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`border-2 border-dashed rounded-xl p-4 ${
          isEditMode ? "opacity-60" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          disabled={isEditMode}
          onChange={handleImageUploadChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${
              isEditMode ? "cursor-not-allowed" : ""
            }`}>
            <UploadCloudIcon className="size-10 text-muted-foreground mb-2" />
            <span>Drag and drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between ">
            <div className="flex items-center">
              <FileIcon className="size-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={() => handleRemoveImage}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground">
              <XIcon className="size-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
