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
  imageLoading,
  setImageLoading,
  isEditMode,
  setImageURL,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.target.files?.[0];

    if (droppedFile) setImageFile(droppedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageLoading(true);
    const data = new FormData();

    data.append("my-file", imageFile);

    const res = await axios.post(
      "http://localhost:8003/api/admin/products/image-upload",
      data
    );

    if (res?.data?.success) {
      setImageURL(res?.data?.result?.url);
      setImageLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-mx  mx-auto p-5">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed p-4 rounded-lg mt-4`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          disabled={isEditMode}
          onChange={handleImageFileChange}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={` ${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="text-shadow-muted mb-2 size-10" />
            <span className="">Drag and Drop or Click to Upload Image</span>
          </Label>
        ) : imageLoading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="size-8 mr-2 text-primary" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              onClick={handleRemoveImage}
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
            >
              <XIcon className="size-4 " />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
