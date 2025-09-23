import { FC, useState } from "react";
import { HexColorInput, HexColorPicker } from "react-colorful";

type ColorPickerProps = {
  value?: string;
  onPickerChange: (color: string) => void;
};

const ColorPicker: FC<ColorPickerProps> = ({ value, onPickerChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex flex-row items-center">
        <p>#</p>
        <HexColorInput
          color={value}
          onChange={onPickerChange}
          className="hex-input"
        />
      </div>
      <HexColorPicker color={value} onChange={onPickerChange} />
    </div>
  );
};

export default ColorPicker;
