class MissionManager:
    missions = [
        {'id': 1, 'title': "Find Will Byers", 'completed': False},
        {'id': 2, 'title': "Explore the Upside Down", 'completed': False},
        {'id': 3, 'title': "Help Eleven find waffles", 'completed': False}
    ]

    @staticmethod
    def list_missions():
        return MissionManager.missions

    @staticmethod
    def complete_mission(mission_id):
        for mission in MissionManager.missions:
            if mission['id'] == mission_id:
                if mission['completed']:
                    return {'message': "Mission already completed!"}
                mission['completed'] = True
                return {'message': f"Mission '{mission['title']}' completed!"}
        return {'error': "Mission not found."}