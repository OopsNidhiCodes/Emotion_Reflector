import requests

API_KEY = "AIzaSyD5eacFlzlrmF4PNdE9OFSb7HlehijF1Gk"
email = "testuser123@gmail.com"
password = "123456"

url = f"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key={API_KEY}"

payload = {
    "email": email,
    "password": password,
    "returnSecureToken": True
}

response = requests.post(url, json=payload)
data = response.json()

if "idToken" in data:
    print("🔥 Your Firebase Token:", data["idToken"])
else:
    print("Error:", data)
