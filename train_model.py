import pandas as pd
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.model_selection import train_test_split
import joblib

# Generate or load your dataset
# (Use the synthetic data generation code from earlier)

# Preprocess data
X = df.drop('target_height', axis=1)
y = df['target_height']

# Train model
model = GradientBoostingRegressor(n_estimators=100, random_state=42)
model.fit(X, y)

# Save model
joblib.dump(model, 'height_model.joblib')
print("Model trained and saved!")