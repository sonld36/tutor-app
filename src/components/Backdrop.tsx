import React, { useEffect, useRef } from "react";

interface BackdropProps {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
  children?: React.ReactNode;
}

function Backdrop({ isShow, children, setIsShow }: BackdropProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsShow(isShow);
  }, [isShow]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === backdropRef.current) {
      // Chỉ xử lý khi click vào backdrop
      setIsShow(false);
      // Reset trạng thái dừng video khi tắt backdrop
    }
  };

  return (
    <>
      {isShow && (
        <div
          ref={backdropRef}
          className="backdrop-opacity-10 backdrop-invert bg-white/30 h-screen w-screen fixed z-50 bg-black top-0 left-0 flex justify-center items-center"
          onClick={handleBackdropClick}
        >
          {children}
        </div>
      )}
    </>
  );
}

export default Backdrop;
