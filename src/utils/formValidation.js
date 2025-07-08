export const validateForm = (values) => {
    console.log("Validating values:", values);
  const errors = {};

  // Name validation
  if (!values.name || !values.name.trim()) {
    errors.name = 'Name is required';
  } else if (values.name.length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  // Email validation
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email format is invalid';
  }

  // Phone validation
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10}$/.test(values.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid 10-digit phone number';
  }



  if (!values.appointmentDate) {
    errors.appointmentDate = 'Appointment date is required';
  } else {
    const appDate = new Date(values.appointmentDate);
    const today = new Date();
    if (appDate < today) {
      errors.appointmentDate = 'Appointment date must be in the future';
    }
  }

  return errors;
};