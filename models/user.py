class UserManager:
    user_name = None

    @staticmethod
    def register_user(name):
        UserManager.user_name = name

    @staticmethod
    def get_user_name():
        return UserManager.user_name