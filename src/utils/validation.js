export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());
};

export const validateProjectForm = (formData) => {
  const errors = {};
  if (!formData.title || formData.title.trim().length < 5) {
    errors.title = 'Project title must be at least 5 characters long.';
  }
  if (!formData.description || formData.description.trim().length < 20) {
    errors.description = 'Description must be at least 20 characters to describe the scope accurately.';
  }
  if (!formData.category || formData.category === 'All Categories') {
    errors.category = 'Please select a valid project category.';
  }
  if (!formData.requiredSkills || formData.requiredSkills.length === 0) {
    errors.requiredSkills = 'Specify at least one required skill.';
  }
  if (!formData.budget || Number(formData.budget) <= 0) {
    errors.budget = 'Please enter a valid positive budget amount.';
  }
  if (!formData.deadline) {
    errors.deadline = 'Please choose a target completion deadline.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProposalForm = (formData) => {
  const errors = {};
  if (!formData.coverLetter || formData.coverLetter.trim().length < 30) {
    errors.coverLetter = 'Cover letter must be at least 30 characters explaining your approach.';
  }
  if (!formData.proposedPrice || Number(formData.proposedPrice) <= 0) {
    errors.proposedPrice = 'Proposed price must be greater than $0.';
  }
  if (!formData.deliveryDays || Number(formData.deliveryDays) <= 0) {
    errors.deliveryDays = 'Delivery timeframe must be at least 1 day.';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

