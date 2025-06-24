from flask import Flask, request, jsonify
import joblib
import pandas as pd

app = Flask(__name__)
model = joblib.load('height_model.joblib')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    
    # Create DataFrame from input
    input_data = pd.DataFrame([[
        data['gender'],
        data['age'],
        data['current_height'],
        data['mother_height'],
        data['father_height'],
        data['nutrition'],
        data['physical_activity'],
        data['sleep_hours']
    ]], columns=['gender', 'age', 'current_height', 'mother_height', 
                'father_height', 'nutrition', 'physical_activity', 'sleep_hours'])
    
    # Make prediction
    prediction = model.predict(input_data)[0]
    
    return jsonify({
        'predicted_height': round(prediction, 1),
        'status': 'success'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)