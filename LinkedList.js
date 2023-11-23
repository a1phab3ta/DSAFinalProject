class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.sizeVal = 0;
    }

    size() {
        return this.sizeVal;
    }

    add(data) {
        const node = new LNode(data);
    
        if (this.head === null) {
            // If the list is empty, set both head and tail to the new node
            this.head = node;
            this.tail = node;
        } else {
            // If the list is not empty, append the new node to the tail
            this.tail.next = node;
            this.tail = node;
        }
    
        this.sizeVal++;
    }
    

    remove(index) {
        if (index < 0 || index >= this.sizeVal) {
            return null
        }

        let prev = null;
        let toRemove = this.head;
        for (let i = 0; i < index; i++) {
            prev = toRemove;
            toRemove = toRemove.next;
        }

        if (prev === null) {
            this.head = toRemove.next;
        } else {
            prev.next = toRemove.next;
        }

        if (toRemove === this.tail) {
            this.tail = prev;
        }

        toRemove.next = null;
        this.sizeVal--;
        return toRemove.data;
    }

    get(index) {
        if (index < 0 || index >= this.sizeVal) {
            return null;
        }
        let curr = this.head; // Use 'let' to declare 'curr'
        for (let i = 0; i < index; i++) {
            curr = curr.next;
        }
        return curr.data;
    }
    

    insert(data, index) {
        if (index < 0 || index > this.sizeVal) {
            return null;
        }
        const node = new LNode(data);
        if (index === this.sizeVal) {
            this.add(data);
            return;
        }
        let curr = this.head;
    
        // Check if the list is empty or if the index is 0
        if (index === 0 || curr === null) {
            node.next = curr;
            this.head = node;
            this.sizeVal++;
            return;
        }
    
        for (let i = 0; i < index - 1; i++) {
            if (curr === null) {
                // Handle the case where the index is out of bounds
                return null;
            }
            curr = curr.next;
        }
    
        // Check if curr is not null before accessing its next property
        if (curr !== null) {
            node.next = curr.next;
            curr.next = node;
            this.sizeVal++;
        }
    }
}

class LNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LIterator {
    constructor(linkedList) {
        this.curr = linkedList.head;
    }

    hasNext() {
        return this.curr !== null;
    }

    next() {
        const data = this.curr.data;
        this.curr = this.curr.next;
        return data;
    }

    reset(linkedList) {
        this.curr = linkedList.head;
    }
}

module.exports = { LinkedList, LIterator };
