import React, { useState } from "react";

const InputComponent = ({ data, onChange, onSubmit }) => {
  const [firstSelect, setFirstSelect] = useState("noun");
  const [secondSelect, setSecondSelect] = useState("der");
  const [firstText, setFirstText] = useState("");
  const [secondText, setSecondText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      firstSelect,
      secondSelect,
      firstText,
      secondText,
    };
    if (onSubmit) onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white rounded shadow space-y-4"
    >
      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Select object type</label>
        <select
          value={firstSelect}
          onChange={(e) => setFirstSelect(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="verb">verb</option>
          <option value="noun">noun</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Select article</label>
        <select
          value={secondSelect}
          onChange={(e) => setSecondSelect(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          
          <option value="der">der</option>
          <option value="die">die</option>
          <option value="das">das</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Enter your word</label>
        <input
          type="text"
          value={firstText}
          onChange={(e) => setFirstText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 font-semibold">Enter sample sentence</label>
        <input
          type="text"
          value={secondText}
          onChange={(e) => setSecondText(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default InputComponent;
