import React from 'react';

const TemplateSelector = ({ selected, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>Select Template: </label>
      <select value={selected} onChange={(e) => onChange(e.target.value)}>
        <option value="template1">Template 1</option>
        <option value="template2">Template 2</option>
        <option value="template3">Template 3</option>
        <option value="templateAshokV2">Ashok V2</option>
      </select>
    </div>
  );
};

export default TemplateSelector;
