"use client";

import { useState } from "react";

export default function MultiFileInput() {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    if (e.target.files[0].size > 4194304) {
      alert("File is too big!");
      e.target.value = "";
    }
  };

  const [media, setMedia] = useState<(File | null)[]>([null]);

  return (
    <div className="text-[1.2rem] text-white">
      <div className="font-header">Additional Media</div>
      {media.map((_e, i) => {
        return (
          <AddBox
            mediaId={i}
            key={i}
            changeEvent={handleImageUpload}
            addCallback={() => {
              if (media.length >= 3) return;
              setMedia((prev) => [...prev, null]);
            }}
          />
        );
      })}
    </div>
  );
}

interface AddBox {
  mediaId: number;
  changeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addCallback: () => void;
}

function AddBox({ mediaId, changeEvent, addCallback }: AddBox) {
  const [isFileUpload, setIsFileUpload] = useState(false);

  return (
    <>
      {isFileUpload && (
        <div className="my-5 h-16">
          <input
            type="file"
            id={`media${mediaId}`}
            name={`media${mediaId}`}
            title="maximum 4 MB"
            accept="image/png, image/jpeg"
            onChange={changeEvent}
          ></input>
        </div>
      )}
      {!isFileUpload && (
        <button
          className="my-4 flex h-16 w-full items-center justify-center border-4 border-dashed border-gray-700 font-header text-gray-600 transition-opacity hover:opacity-50"
          onClick={() => {
            setIsFileUpload(true);
            addCallback();
          }}
        >
          <svg className="relative right-[5px] top-[1px]" height="15px" width="15px" viewBox="0 0 16.726 16.726">
            <g>
              <path
                d="M8.363,0C3.744,0,0,3.744,0,8.363s3.744,8.363,8.363,8.363s8.363-3.744,8.363-8.363   S12.982,0,8.363,0z M13.626,9.754c0,0.275-0.224,0.498-0.498,0.498H10.32v2.877c0,0.273-0.224,0.498-0.498,0.498H6.947   c-0.275,0-0.498-0.225-0.498-0.498v-2.877h-2.85c-0.275,0-0.498-0.223-0.498-0.498V6.878c0-0.274,0.223-0.498,0.498-0.498h2.85   V3.598c0-0.275,0.223-0.498,0.498-0.498h2.875c0.274,0,0.498,0.222,0.498,0.498V6.38h2.808c0.274,0,0.498,0.224,0.498,0.498V9.754z   "
                fill="#4c575f"
              />
            </g>
          </svg>
          Add Image
        </button>
      )}
    </>
  );
}
