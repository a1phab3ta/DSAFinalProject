const { LinkedList, LIterator } = require('./LinkedList');
const { Heap } = require('./heap');

class Inventory {
    constructor() {
        this.list = new LinkedList();
    }

    add(id, name, price, quantity) {
        const slot = new InventorySlot(id, name, price, quantity);
        this.list.add(slot);
        // TODO: Database add method + Display onto screen
    }

    remove(id) {
        this.list.remove(id);
        // TODO: Database remove method + Display onto screen
    }

    search(prompt) {
        const iter = new LIterator(this.list);
        const newList = new LinkedList();

        while (iter.hasNext()) {
            const node = iter.next();
            if (node.getMatch(prompt)) {
                newList.add(node);
            }
        }

        if (this.list.tail !== this.list.head && this.list.tail.getMatch(prompt)) {
            newList.add(this.list.tail);
        }

        // TODO: Display newList
    }

    sort(field, isAscending = true) {
        const heap = new Heap(isAscending, (a, b) => {
            if (field === 2) {
                return isAscending ? a.name.localeCompare(b.name) < 0 : a.name.localeCompare(b.name) > 0;
            } 
            else if (field === 1) {
                return isAscending ? a.id < b.id : a.id > b.id;
            }
            else if (field === 3) {
                return isAscending ? a.price < b.price : a.price > b.price;
            }
            else if (field === 4) {
                return isAscending ? a.quantity < b.quantity : a.quantity > b.quantity;
            }
        });

        const iter = new LIterator(this.list);
        while (iter.hasNext()) {
            const node = iter.next();
            heap.insert(node);
        }

        const sortedList = new LinkedList();
        while (heap.peek() !== null) {
            sortedList.add(heap.pop());
        }

        //TODO: Display sortedList to the screen
        this.list = sortedList;
    }

    
}

class InventorySlot {
    constructor(id, name, price, quantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    getMatch(prompt) {
        try {
            if (this.id == Number(prompt) || this.price == Number(prompt) || this.quantity == Number(prompt)) {
                return true;
            }
        } catch {}

        if (this.name.toLowerCase().includes(prompt.toLowerCase())) {
            return true;
        }

        return false;
    }

    compare(other, field) {
        switch (field){
            case 1:
                return other.id < this.id;
            
            case 2:
                return other.name < this.name;
            case 3:
                return other.price < this.price;
            case 4:
                return other.quantity < this.quantity;
            
        }
    }

    // TODO: Method that adds the inventory slot to the html table
}

