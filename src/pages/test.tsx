import React, { useState } from "react";

const ProductOptions = () => {
  const [options, setOptions] = useState<{ name: string; price: number }[]>([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Function to add an option
  const addOption = () => {
    setOptions([...options, { name: "", price: 0 }]);
  };

  // Function to handle option change
  const handleOptionChange = (index: any, event: any) => {
    const updatedOptions = [...options];
    // @ts-ignore
    updatedOptions[index][event.target.name] = event.target.value;
    setOptions(updatedOptions);
  };

  // Function to handle option selection
  const handleOptionSelect = (index: any, event: any) => {
    const optionValue = event.target.value;
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      // @ts-ignore
      updatedOptions[index] = optionValue;
      return updatedOptions;
    });
  };

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedOptions.forEach((optionIndex) => {
      const option = options[optionIndex];
      totalPrice += option.price;
    });
    return totalPrice;
  };

  return (
    <div>
      <h2>Product Options</h2>
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={option.name}
            onChange={(event) => handleOptionChange(index, event)}
            placeholder="Option Name"
          />
          <input
            type="number"
            name="price"
            value={option.price}
            onChange={(event) => handleOptionChange(index, event)}
            placeholder="Option Price"
          />
        </div>
      ))}
      <button onClick={addOption}>Add Option</button>
      <div>
        <h3>Total Price: {calculateTotalPrice()}</h3>
      </div>
    </div>
  );
};

export default ProductOptions;
