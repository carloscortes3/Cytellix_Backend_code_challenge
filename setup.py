#library to send requests. Do note that you may need to install pip and this library to run setup.py
import requests

url = 'http://localhost:5000/api/'

#default company for users in this webapplication
company = {
    'name': 'Cytellix',
    'address': '123 Aliso Viejo Drive, Aliso Viejo, CA',
    'customer_quantity': 476
}

#default roles available for users in this webapplication
roles = [
    { "name": "Admin" },
    { "name": "Viewer"}
]

x = requests.post(url+'company/', data= company)
print(x.text)

for role in roles:
    roles_request_ret = requests.post(url+"role/", data= role)
    print(roles_request_ret.text)
