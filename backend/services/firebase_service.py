import firebase_admin
from firebase_admin import credentials, firestore, auth
import os

cred = credentials.Certificate("firebase-key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

def add_memory(user_id, memory_data):
    return db.collection('users').document(user_id).collection('memories').add(memory_data)

def get_memories(user_id):
    return [doc.to_dict() for doc in db.collection('users').document(user_id).collection('memories').stream()]

def verify_user_token(id_token):
    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token['uid']
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None