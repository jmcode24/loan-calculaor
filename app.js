// Listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
  // Part - 2 = Remove calculateResults and create new function with (e)
  // Hide results
  document.getElementById('results').style.display = 'none';

  // Show loader
  document.getElementById('loading').style.display = 'block';

  // Set timeout
  setTimeout(CalculateResults, 2000);

  e.preventDefault();
});

// Calculate Results
function CalculateResults() {
  console.log('calculating...')
  // UI Vars
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');
  const monthlyPayment = document.getElementById('monthly-payment');
  const totalPayment = document.getElementById('total-payment');
  const totalInterest = document.getElementById('total-interest');

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayemnts = parseFloat(years.value) * 12;

  // Compute monthly payemnts
  const x = Math.pow(1 + calculatedInterest, calculatedPayemnts);
  const monthly = (principal * x * calculatedInterest) / (x-1);

  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    totalPayment.value = (monthly * calculatedPayemnts).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    totalInterest.value = ((monthly * calculatedPayemnts) - principal).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2});

    // Part - 2 = Show results
    document.getElementById('results').style.display = 'block';

    // Part - 2 = Hide loader
    document.getElementById('loading').style.display = 'none';
  } else {
    showError('Please Fill Out All Input Field');
  }

  // Part - 2 = Get rid of (e) in function above and prevent default
  // e.preventDefault();
};

// Show Error
function showError(error) {
   // Part - 2 = hide results
   document.getElementById('results').style.display = 'none';

   // Part - 2 = Hide loader
   document.getElementById('loading').style.display = 'none';

  // create a div
  const errorDiv = document.createElement('div');

  // Get elements
  const card = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  // Add class
  errorDiv.className = 'alert alert-danger';

  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  // Insert error above heading
  card.insertBefore(errorDiv, heading);

  // clear error after 3 seconds
  setTimeout(clearError, 5000);
};

// Clear error
function clearError() {
  document.querySelector('.alert').remove();
};


// Added personally by me (Smiles)
document.getElementById('cal-again').addEventListener('click', function(){
  window.location.reload();
  amount.value = '';
  interest.value = '';
  years.value = '';
});