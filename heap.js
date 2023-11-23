class Heap {
    constructor(minHeap = true, compare) {
        this.heap = [];
        this.minHeap = minHeap;
        this.compare = compare;
    }

    // Modify the insert and pop methods to use the provided compare method
    insert(value) {
        this.heap.push(value);
        this.heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) {
            return null; // Heap is empty
        }

        const root = this.heap[0];
        const lastElement = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = lastElement;
            this.heapifyDown();
        }

        return root;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    heapifyUp() {
        let currentIndex = this.heap.length - 1;

        while (currentIndex > 0) {
            const parentIndex = Math.floor((currentIndex - 1) / 2);
            if (this.compare(this.heap[currentIndex], this.heap[parentIndex])) {
                this.swap(currentIndex, parentIndex);
                currentIndex = parentIndex;
            } else {
                break;
            }
        }
    }

    heapifyDown() {
        let currentIndex = 0;

        while (true) {
            const leftChildIndex = 2 * currentIndex + 1;
            const rightChildIndex = 2 * currentIndex + 2;
            let swapIndex = null;

            if (leftChildIndex < this.heap.length) {
                if (this.compare(this.heap[leftChildIndex], this.heap[currentIndex])) {
                    swapIndex = leftChildIndex;
                }
            }

            if (rightChildIndex < this.heap.length) {
                if (
                    (swapIndex === null && this.compare(this.heap[rightChildIndex], this.heap[currentIndex])) ||
                    (swapIndex !== null && this.compare(this.heap[rightChildIndex], this.heap[leftChildIndex]))
                ) {
                    swapIndex = rightChildIndex;
                }
            }

            if (swapIndex === null) {
                break;
            }

            this.swap(currentIndex, swapIndex);
            currentIndex = swapIndex;
        }
    }

    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
}

// Helper function to validate the heap
function isHeapValid(heap, isMinHeap) {
    for (let i = 0; i < heap.length; i++) {
        const leftChildIndex = 2 * i + 1;
        const rightChildIndex = 2 * i + 2;

        if (leftChildIndex < heap.length) {
            if (isMinHeap && heap[i] > heap[leftChildIndex]) {
                return false;
            }

            if (!isMinHeap && heap[i] < heap[leftChildIndex]) {
                return false;
            }
        }

        if (rightChildIndex < heap.length) {
            if (isMinHeap && heap[i] > heap[rightChildIndex]) {
                return false;
            }

            if (!isMinHeap && heap[i] < heap[rightChildIndex]) {
                return false;
            }
        }
    }

    return true;
}

module.exports = {Heap};
