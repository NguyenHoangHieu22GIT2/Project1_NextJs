import React, { useState } from "react";

interface Option {
  name: string;
  price: number;
}

interface Options {
  [optionType: string]: Option[];
}

interface Customizations {
  [optionType: string]: string;
}

interface ProductCustomizerProps {
  options: Options;
}

const ProductCustomizer: React.FC<ProductCustomizerProps> = ({ options }) => {
  const [customizations, setCustomizations] = useState<Customizations>({});
  const [totalPrice, setTotalPrice] = useState(0);

  // Handle option selection
  const handleOptionSelect = (optionType: string, optionIndex: number) => {
    const selectedOption = options[optionType][optionIndex];
    setCustomizations((prevCustomizations) => ({
      ...prevCustomizations,
      [optionType]: selectedOption.name,
    }));
    setTotalPrice((prevTotalPrice) => prevTotalPrice + selectedOption.price);
  };

  // Render option select dropdown
  const renderOptionSelect = (optionType: string) => (
    <select
      value={customizations[optionType] || ""}
      onChange={(event) =>
        handleOptionSelect(optionType, parseInt(event.target.value, 10))
      }
    >
      <option value="">Select {optionType}</option>
      {options[optionType].map((option, index) => (
        <option key={index} value={index}>
          {option.name} (+${option.price})
        </option>
      ))}
    </select>
  );

  return (
    <div>
      <h2>Product Customizer</h2>
      {Object.keys(options).map((optionType) => (
        <div key={optionType}>
          <h3>{optionType}:</h3>
          {renderOptionSelect(optionType)}
        </div>
      ))}
      <div>
        <h3>Total Price: ${totalPrice}</h3>
      </div>
    </div>
  );
};

export default ProductCustomizer;
