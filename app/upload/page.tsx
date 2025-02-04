"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiLoaderCircle, BiSolidCloudUpload } from "react-icons/bi";
import UploadLayout from "../layouts/UploadLayout";
import { UploadError } from "../types";

export default function Upload() {
  const router = useRouter();

  let [fileDisplay, setFileDisplay] = useState<string>("");
  let [caption, setCaption] = useState<string>("");
  let [file, setFile] = useState<File | null>(null);
  let [error, setError] = useState<UploadError | null>(null);
  let [isUploading, setIsUploadng] = useState<boolean>(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      setFileDisplay(fileUrl);
      setFile(file);
    }
  };

  const onSubmit = async (event: React.ChangeEvent<SubmitEvent>) => {
    event.preventDefault();

    setIsUploadng(true);

    try {
      // upsert video to your database here!
      // try to use an api route to handle this in the backend using a POST request in app/api/upload.tsx

      // here I am creating a FormData object to wrap all the file content together (this is necessary for videos to my knowledge)
      const formData = new FormData();
      formData.append("video", file)
      formData.append("caption", caption)

      // note in the api route you need to do something like the below to get the FormData:
      // const formData = await req.formData();
      // const file = formData.get("file");
      // const caption = formData.get("caption");

      // here I am sending the FormData to a POST api endpoint. Here's a good resource:
      // https://www.youtube.com/watch?v=ZusDefqyMrg&ab_channel=ToshVelaga

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

    } catch {
      setError({ message: "Failed to upload video" });
    }

    setIsUploadng(false);
  }

  return (
    <>
      <UploadLayout>
        <div className="w-full mt-[80px] mb-40px bg-white shadow-lg rounded-md py-6 md:px-10 px-4">
          <div>
            <h1 className="text-[23px] font-semibold">Upload video</h1>
            <h2 className="text-gray-400 mt-1">Post a video to your account</h2>
          </div>

          <div className="mt-8 md:flex gap-6">
            {!fileDisplay ? (
              <label
                htmlFor="fileInput"
                className="
                md:mx-0
                mx-auto
                mt-4
                mb-6
                flex
                flex-col
                items-center
                justify-center
                w-full
                max-w-[260px]
                h-[470px]
                text-center
                p-3
                border-2
                border-dashed
                border-gray-300
                rounded-lg
                hover:bg-gray-100
                cursor-pointer
                           "
              >
                <BiSolidCloudUpload size="40" color="#b3b3b1" />
                <p className="mt-4 text-[17px]">Select a video to upload</p>
                <p className="mt-1.5 text-gray-500 text-[13px]">
                  Or drag and drop a file
                </p>
                <p className="mt-12 text-gray-400 text-sm">MP4</p>
                <p className="mt-2 text-gray-400 text-[13px]">
                  Up to 30 minutes
                </p>
                <p className="mt-2 text-gray-400 text-[13px]">Less than 2 GB</p>
                <label
                  htmlFor="fileInput"
                  className="px-2 py-1.5 mt-8 text-[15px] w-[80%] bg-[#F02C56] rounded-sm cursor-pointer"
                >
                  {" "}
                  Select file
                </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={onChange}
                  hidden
                  accept=".mp4"
                />
              </label>
            ) : (
              <div
                className="
                md:mx-0
                mx-auto
                mt-4
                md:mb-12
                mb-16
                flex
                items-center
                justify-center
                w-full
                max-w-[260px]
                h-[540px]
                p-3
                rounded-2xl
                cursor-pointer
                relative
                "
              >
                {isUploading ? (
                  <div className="absolute flex items-center justify-center z-20 bg-black h-full w-full rounded-[50px] bg-opacity-50">
                    <div className="mx-auto flex items-center justify-center gap-1">
                      <BiLoaderCircle
                        className="animate-spin"
                        color="#F12B56"
                        size={30}
                      />
                      <div className="text-white font-bold">Uploading...</div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </UploadLayout>
    </>
  );
}
