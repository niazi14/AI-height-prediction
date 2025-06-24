document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('heightForm');
    const resultSection = document.getElementById('result');
    const predictedHeightElement = document.getElementById('predictedHeight');
    const resultDescriptionElement = document.getElementById('resultDescription');
    const resetBtn = document.getElementById('resetBtn');

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Predicting...';
        
        // Simulate AJAX request to PHP backend
        setTimeout(() => {
            // In a real application, you would use fetch() to send data to predict.php
            // For this example, we'll simulate a response
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Send data to PHP (commented out for this example)
            // fetch('predict.php', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => showResult(data))
            // .catch(error => console.error('Error:', error));
            
            // Simulated response (in a real app, this would come from PHP)
            const simulatedResponse = simulatePrediction(data);
            showResult(simulatedResponse);
            
            submitBtn.disabled = false;
            submitBtn.textContent = 'Predict My Height';
        }, 1500);
    });

    // Reset button functionality
    resetBtn.addEventListener('click', function() {
        form.reset();
        resultSection.classList.add('hidden');
        form.classList.remove('hidden');
    });

    // Function to display prediction results
    function showResult(data) {
        form.classList.add('hidden');
        resultSection.classList.remove('hidden');
        
        predictedHeightElement.textContent = `${data.predictedHeight} cm`;
        
        // Add descriptive text based on prediction
        let description = `Based on your input, our AI predicts your adult height will be approximately ${data.predictedHeight} cm. `;
        
        if (data.gender === 'male') {
            if (data.predictedHeight > 185) {
                description += "This is considered very tall for a male.";
            } else if (data.predictedHeight > 175) {
                description += "This is above average height for a male.";
            } else if (data.predictedHeight > 165) {
                description += "This is average height for a male.";
            } else {
                description += "This is below average height for a male.";
            }
        } else {
            if (data.predictedHeight > 175) {
                description += "This is considered very tall for a female.";
            } else if (data.predictedHeight > 165) {
                description += "This is above average height for a female.";
            } else if (data.predictedHeight > 155) {
                description += "This is average height for a female.";
            } else {
                description += "This is below average height for a female.";
            }
        }
        
        resultDescriptionElement.textContent = description;
    }

    // Simulate prediction (in a real app, this would be done in PHP)
    function simulatePrediction(data) {
        // Simple height prediction formula (mid-parental height)
        // This is a simplified version - real AI would be more complex
        let midParentalHeight;
        if (data.gender === 'male') {
            midParentalHeight = (parseInt(data.fatherHeight) + parseInt(data.motherHeight) + 13) / 2;
        } else {
            midParentalHeight = (parseInt(data.fatherHeight) + parseInt(data.motherHeight) - 13) / 2;
        }
        
        // Adjust for current age and height (simplified)
        const ageFactor = 1 + (25 - parseInt(data.currentAge)) * 0.02;
        const currentHeightFactor = parseInt(data.currentHeight) * 0.3;
        
        // Nutrition factor (1-5 scale)
        const nutritionFactor = 1 + (parseInt(data.nutrition) - 3) * 0.03;
        
        // Calculate final prediction
        const predictedHeight = Math.round(
            (midParentalHeight * 0.7 + currentHeightFactor * 0.3) * ageFactor * nutritionFactor
        );
        
        return {
            predictedHeight: predictedHeight,
            gender: data.gender
        };
    }
});