import React from "react";

interface AlertProps {
  children: React.ReactNode;
  variants: "danger" | "success" | "warning" | "info";
  title: string;
}

export default function Alert({ children, variants, title }: AlertProps) {
  const danger = variants === "danger";
  const info = variants === "info";
  const success = variants === "success";
  const warning = variants === "warning";
  if (danger) {
    return (
      <div className="flex w-full border border-r-0 border-l-8 border-t-0 border-b-0 border-red-300 bg-red-200 rounded-md justify-start items-center p-2 h-full gap-4 cursor-pointer duration-500 hover:bg-red-300 text-red-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-xl ">{children}</p>
        </div>
      </div>
    );
  } else if (info) {
    return (
      <div className="flex w-full border border-r-0 border-l-8 border-t-0 border-b-0 border-blue-300 bg-blue-200 rounded-md justify-start items-center p-2 h-full gap-4 cursor-pointer duration-500 hover:bg-blue-300 text-blue-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-xl ">{children}</p>
        </div>
      </div>
    );
  } else if (success) {
    return (
      <div className="flex w-full border border-r-0 border-l-8 border-t-0 border-b-0 border-green-300 bg-green-200 rounded-md justify-start items-center p-2 h-full gap-4 cursor-pointer duration-500 hover:bg-green-300 text-green-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-xl ">{children}</p>
        </div>
      </div>
    );
  } else if (warning) {
    return (
      <div className="flex w-full border border-r-0 border-l-8 border-t-0 border-b-0 border-yellow-300 bg-yellow-200 rounded-md justify-start items-center p-2 h-full gap-4 cursor-pointer duration-500 hover:bg-yellow-300 text-yellow-900">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
          />
        </svg>

        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="text-xl ">{children}</p>
        </div>
      </div>
    );
  }
}
