function showAlert() {
    alert("Learn more about how HealthLink is changing lives!");
  }
  
  function toggleForm() {
    const form = document.getElementById('emergency-form');
    form.classList.toggle('hidden');
  }
  
  function handleRequest(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const description = document.getElementById('description').value;
  
    if (name && contact && description) {
      alert(`🚨 Emergency request submitted!\n\nName: ${name}\nContact: ${contact}`);
      document.getElementById('name').value = '';
      document.getElementById('contact').value = '';
      document.getElementById('description').value = '';
      document.getElementById('emergency-form').classList.add('hidden');
    } else {
      alert("Please complete all fields.");
    }
  }