"use client";

import { FC, useEffect, useRef, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  value?: string;
  onPickerChange: (color: string) => void;
};

const ColorPicker: FC<ColorPickerProps> = ({
  value = "#000000",
  onPickerChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscapeKey);
    };
  }, []);

  return (
    <div className="relative" ref={pickerRef}>
      <div
        className="color-picker cursor-pointer"
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <div
          style={{ backgroundColor: value }}
          className="size-6 rounded-sm border border-gray-300"
        />
        <span className="ml-2 text-dark-400 font-bebas-neue">#</span>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>

      {isOpen && (
        <div className="hex-color-picker">
          <HexColorPicker color={value} onChange={onPickerChange} />
        </div>
      )}
    </div>
  );
};

export default ColorPicker;
