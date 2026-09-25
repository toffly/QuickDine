import React from "react";

const Loader = ({ text }: { text: string }) => {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center">
      <div className="w-12 h-1/2 border-outline-variant/30 border-t-secondary rounded-full animate-spin"></div>
      <p className="font-display text-sm tracking-widest text-black/55 mt-4 animate-pulse uppercase">
        {text}
      </p>
    </div>
  );
};

export default Loader;
