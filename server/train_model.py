# # Import Required Libraries
# import pandas as pd
# import numpy as np
# from sklearn.preprocessing import LabelEncoder, StandardScaler
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# from flask import Flask, request, jsonify

# # 📚 Load Data from Excel
# data = pd.read_excel("Turf1_Data.xlsx")

# # 🎯 Encode Categorical Columns
# le_city = LabelEncoder()
# le_address = LabelEncoder()
# le_contact = LabelEncoder()
# le_variety = LabelEncoder()
# le_type = LabelEncoder()

# data["City"] = le_city.fit_transform(data["City"])
# data["Address"] = le_address.fit_transform(data["Address"])
# data["Contact_Number"] = le_contact.fit_transform(data["Contact_Number"])
# data["Turf_Variety"] = le_variety.fit_transform(data["Turf_Variety"])
# data["Turf_Type"] = le_type.fit_transform(data["Turf_Type"])

# # 🎯 Prepare Input (X) and Output (y)
# X = data[
#     [
#         "City",
#         "Address",
#         "Contact_Number",
#         "Turf_Variety",
#         "Turf_Type",
#         "Price_Per_Hour",
#         "Ratings_1_Star",
#         "Ratings_2_Star",
#         "Ratings_3_Star",
#         "Ratings_4_Star",
#         "Ratings_5_Star",
#         "Booking_Count",
#     ]
# ]
# y = data["Ratings_5_Star"]  # 🎯 Predicting 5-Star Ratings for Best Turf

# # 📏 Scale the Data
# scaler = StandardScaler()
# X_scaled = scaler.fit_transform(X)

# # 🚀 Define Neural Network Model
# model = Sequential()
# model.add(Dense(64, input_dim=X_scaled.shape[1], activation="relu"))
# model.add(Dense(32, activation="relu"))
# model.add(Dense(1, activation="linear"))

# # 🧠 Compile Model
# model.compile(optimizer="adam", loss="mean_squared_error", metrics=["mae"])

# # 🎯 Train Model
# model.fit(X_scaled, y, epochs=50, batch_size=16, verbose=1)

# # ✅ Save Model and Encoders
# model.save("turf_model_v2.h5")
# import joblib

# joblib.dump(scaler, "scaler_v2.pkl")
# joblib.dump(le_city, "city_encoder_v2.pkl")
# joblib.dump(le_address, "address_encoder_v2.pkl")
# joblib.dump(le_contact, "contact_encoder_v2.pkl")
# joblib.dump(le_variety, "variety_encoder_v2.pkl")
# joblib.dump(le_type, "type_encoder_v2.pkl")

# print("✅ Model Training Complete & Saved!")


# Import Required Libraries
import pandas as pd
import numpy as np
import random
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from flask import Flask, jsonify

# 🎯 Load Data from Excel
data = pd.read_excel("Turf1_Data.xlsx")

# 🎯 Encode Categorical Columns
le_city = LabelEncoder()
le_address = LabelEncoder()
le_contact = LabelEncoder()
le_variety = LabelEncoder()
le_type = LabelEncoder()

data["City"] = le_city.fit_transform(data["City"])
data["Address"] = le_address.fit_transform(data["Address"])
data["Contact_Number"] = le_contact.fit_transform(data["Contact_Number"])
data["Turf_Variety"] = le_variety.fit_transform(data["Turf_Variety"])
data["Turf_Type"] = le_type.fit_transform(data["Turf_Type"])

# 🎯 Prepare Input (X) and Output (y)
X = data[
    [
        "City",
        "Address",
        "Contact_Number",
        "Turf_Variety",
        "Turf_Type",
        "Price_Per_Hour",
        "Ratings_1_Star",
        "Ratings_2_Star",
        "Ratings_3_Star",
        "Ratings_4_Star",
        "Ratings_5_Star",
        "Booking_Count",
    ]
]
y = data["Ratings_5_Star"]  # 🎯 Predicting 5-Star Ratings for Best Turf

# 📏 Scale the Data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 🚀 Define Neural Network Model
model = Sequential()
model.add(Dense(64, input_dim=X_scaled.shape[1], activation="relu"))
model.add(Dense(32, activation="relu"))
model.add(Dense(1, activation="linear"))  # 🎯 Linear Activation for Regression

# 🧠 Compile Model
model.compile(optimizer="adam", loss="mean_squared_error", metrics=["mae"])

# 🎯 Train Model
model.fit(X_scaled, y, epochs=50, batch_size=16, verbose=1)

# ✅ Save Model and Encoders
model.save("turf_model_v2.h5")

import joblib

joblib.dump(scaler, "scaler_v2.pkl")
joblib.dump(le_city, "city_encoder_v2.pkl")
joblib.dump(le_address, "address_encoder_v2.pkl")
joblib.dump(le_contact, "contact_encoder_v2.pkl")
joblib.dump(le_variety, "variety_encoder_v2.pkl")
joblib.dump(le_type, "type_encoder_v2.pkl")

print("✅ Model Training Complete & Saved!")

# ----------------------------------------------------
# 🎯 Shuffle Top 5 Turfs Function
def get_top_turfs(X_scaled, data, model, top_n=5):
    predictions = model.predict(X_scaled).flatten()

    # 🎯 Sort by Ratings & Price
    data["Predicted_Rating"] = predictions
    sorted_data = data.sort_values(
        by=["Predicted_Rating", "Price_Per_Hour"], ascending=[False, True]
    )

    # 🎯 Get Top N Turfs & Shuffle to Avoid Same Results
    top_turfs = sorted_data.head(top_n)
    shuffled_turfs = top_turfs.sample(frac=1).reset_index(drop=True)  # Shuffle Results

    return shuffled_turfs


# 🚀 Get Top 5 Shuffled Turfs and Save to New Excel
top_turfs = get_top_turfs(X_scaled, data, model, top_n=5)
top_turfs.drop(["Predicted_Rating"], axis=1, inplace=True)

print("✅ Top 5 Turfs Exported with Shuffled Results!")
