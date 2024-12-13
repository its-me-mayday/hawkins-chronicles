from flask import Flask, jsonify, request
from models.user import UserManager
from models.missions import MissionManager
from models.inventory import InventoryManager

app = Flask(__name__)

# User routes
@app.route('/user', methods=['GET', 'POST'])
def user():
    if request.method == 'POST':
        name = request.json.get('name')
        UserManager.register_user(name)
        return jsonify({'message': f'Welcome, {name}!'}), 201
    return jsonify({'user': UserManager.get_user_name()}), 200

# Missions routes
@app.route('/missions', methods=['GET', 'POST'])
def missions():
    if request.method == 'POST':
        mission_id = request.json.get('mission_id')
        result = MissionManager.complete_mission(mission_id)
        return jsonify(result), 200
    return jsonify({'missions': MissionManager.list_missions()}), 200

# Inventory routes
@app.route('/inventory', methods=['GET', 'POST'])
def inventory():
    if request.method == 'POST':
        item = request.json.get('item')
        InventoryManager.add_item(item)
        return jsonify({'message': f'{item} added to inventory!'}), 201
    return jsonify({'inventory': InventoryManager.get_inventory()}), 200

if __name__ == '__main__':
    app.run(debug=True)