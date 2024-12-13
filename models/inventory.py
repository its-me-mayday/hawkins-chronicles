class InventoryManager:
    inventory = []

    @staticmethod
    def add_item(item):
        InventoryManager.inventory.append(item)

    @staticmethod
    def get_inventory(): 
        return InventoryManager.inventory