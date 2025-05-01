import React, { useMemo } from 'react';
import ResumeTemplate from './ResumeTemplate';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import TemplateAshokV2 from '../templates/TemplateAshokV2';

const ResumePreview = ({ data, template = 'template1', theme }) => {
  // Define templates mapping using an object for better scalability
  const templates = useMemo(() => ({
    template1: ResumeTemplate,
    template2: Template2,
    template3: Template3,
    templateAshokV2: TemplateAshokV2
  }), []);

  // Get the selected template component, fallback to the default template
  const SelectedTemplate = templates[template] || templates.template1;
  
  // Error boundary to handle template rendering issues
  try {
    return <SelectedTemplate data={data} theme={theme} />;
  } catch (error) {
    console.error(`Error rendering template "${template}":`, error);
    return (
      <div className="template-error">
        <h2>Unable to render the selected resume template</h2>
        <p>Please try selecting a different template or check your data.</p>
      </div>
    );
  }
};

export default React.memo(ResumePreview);