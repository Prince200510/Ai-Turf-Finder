from flask import Flask, request, jsonify
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from flask_cors import CORS
import google.generativeai as genai
import re

GENAI_API_KEY = YOUR_API_KEY
genai.configure(api_key=GENAI_API_KEY)

TURF_KEYWORDS = [   "turf",   "turf cleaner",   "sports ground",   "artificial grass",   "booking turf",  
                   
    "turf", "turf cleaner", "sports ground", "artificial grass", "booking turf",
    "grass maintenance", "turf management", "astroturf", "synthetic turf", "ground booking",

    "football", "soccer", "cricket", "hockey", "rugby", "tennis", "badminton",
    "basketball", "volleyball", "kabaddi", "golf", "baseball", "softball",
    "lacrosse", "futsal", "handball", "pickleball", "athletics", "track and field",
    "table tennis", "squash", "archery", "cycling", "wrestling", "martial arts",
    "karate", "taekwondo", "swimming", "boxing",

    "fitness", "gym", "workout", "strength training", "yoga", "pilates", 
    "zumba", "crossfit", "HIIT", "calisthenics", "aerobics", "cardio",
    "personal trainer", "gym equipment", "weight training", "muscle building",
    "bodyweight exercise", "flexibility", "endurance", "strength", "core training",

    "goal post", "nets", "boundary markers", "turf shoes", "sportswear",
    "sports equipment", "training cones", "ground lights", "stadium",
    "indoor games", "outdoor games", "turf booking", "sports academy",
    "turf events", "sports tournaments", "match scheduling", 
    "turf maintenance",   "synthetic turf",   "artificial turf",   "turf reservation",   "astro turf",   "turf booking",   "sports turf",   "turf installation",   "football turf",   "cricket turf",   "hockey turf",   "turf management",   "ground booking",   "field booking",   "turf availability",   "indoor turf",   "outdoor turf",   "hybrid turf",   "natural grass turf",   "artificial pitch",   "turf equipment",   "turf surface",   "turf rental",   "turf pricing",   "turf schedule",   "multi-sport turf",   "turf field",   "turf grass",   "astro ground",   "turf maintenance tips",   "artificial lawn",   "turf care",   "turf services",   "sports field"
]

model = load_model("turf_model_v2.h5")  
scaler = joblib.load("scaler_v2.pkl")  
le_city = joblib.load("city_encoder_v2.pkl")  
le_address = joblib.load("address_encoder_v2.pkl")  
le_contact = joblib.load("contact_encoder_v2.pkl")  
le_variety = joblib.load("variety_encoder_v2.pkl")  
le_type = joblib.load("type_encoder_v2.pkl")  

app = Flask(__name__)
CORS(app)  

def is_turf_related(query):
    """Checks if the query contains turf-related keywords."""
    query_lower = query.lower()
    return any(re.search(r"\b" + keyword + r"\b", query_lower) for keyword in TURF_KEYWORDS)

@app.route("/chat-bot/", methods=["POST"])
def detect_turf():
    data = request.json
    query = data.get("query", "").strip()

    if not query:
        return jsonify({"error": "Query cannot be empty", "success": False})

    if not is_turf_related(query):
        return jsonify({"response": "❌ Unauthorized query. Ask something turf-related."})

    try:
        model = genai.GenerativeModel("gemini-1.5-pro-latest")
        response = model.generate_content(query)

        paragraph_response = re.sub(r"[\*\n]", " ", response.text).strip()

        return jsonify({"response": paragraph_response})
    except Exception as e:
        return jsonify({"error": str(e), "success": False})
    
def handle_unseen_labels(value, encoder, label_name):
    """Return a safe default integer if the label is not found in the encoder."""
    if value not in encoder.classes_:
        print(f"⚠️ Warning: Unseen {label_name} '{value}' found. Using default value 0.")
        return 0
    return encoder.transform([value])[0]

@app.route("/predict", methods=["POST"])
def predict_turf():
    """Predicts Turf Rating Based on User Input"""
    try:
        data = request.json

        required_fields = [
            "city", "address", "contact_number", "turf_variety",
            "turf_type", "price_per_hour", "ratings_1_star",
            "ratings_2_star", "ratings_3_star", "ratings_4_star",
            "ratings_5_star", "booking_count"
        ]

        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"❌ Missing field: {field}", "success": False})

        city_encoded = handle_unseen_labels(data["city"], le_city, "city")
        address_encoded = handle_unseen_labels(data["address"], le_address, "address")
        contact_encoded = handle_unseen_labels(data["contact_number"], le_contact, "contact")
        variety_encoded = handle_unseen_labels(data["turf_variety"], le_variety, "variety")
        type_encoded = handle_unseen_labels(data["turf_type"], le_type, "type")

        input_data = np.array(
            [
                [
                    city_encoded, address_encoded, contact_encoded,
                    variety_encoded, type_encoded, float(data["price_per_hour"]),
                    int(data["ratings_1_star"]), int(data["ratings_2_star"]),
                    int(data["ratings_3_star"]), int(data["ratings_4_star"]),
                    int(data["ratings_5_star"]), int(data["booking_count"])
                ]
            ]
        )

        input_scaled = scaler.transform(input_data)
        predicted_rating = model.predict(input_scaled)[0][0]

        return jsonify({
            "success": True,
            "predicted_rating": float(predicted_rating)
        })

    except Exception as e:
        return jsonify({"error": f"❌ Error during prediction: {str(e)}", "success": False})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
