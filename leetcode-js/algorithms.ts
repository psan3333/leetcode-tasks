// B-Tree Typescript implementation
export type Comparator<T> = (a: T, b: T) => number;

export function defaultComparator<T>(a: T, b: T): number {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}

export interface BTreeOptions<T> {
    degree: number;
    comparator?: Comparator<T>;
}

export class BTreeNode<T> {
    keys: T[];
    children: BTreeNode<T>[];
    leaf: boolean;

    constructor(leaf: boolean = true) {
        this.keys = [];
        this.children = [];
        this.leaf = leaf;
    }
}

export class BTree<T> {
    private root: BTreeNode<T>;
    private degree: number;
    private comparator: Comparator<T>;

    constructor(options: BTreeOptions<T>) {
        if (options.degree < 2) {
            throw new Error("Degree must be >= 2");
        }
        this.degree = options.degree;
        this.comparator = options.comparator ?? defaultComparator;
        this.root = new BTreeNode(true);
    }

    private compare(a: T, b: T): number {
        return this.comparator(a, b);
    }

    private searchNode(
        node: BTreeNode<T>,
        key: T,
    ): { node: BTreeNode<T>; index: number } | null {
        let i = 0;
        while (i < node.keys.length && this.compare(key, node.keys[i]) > 0) {
            i++;
        }
        if (i < node.keys.length && this.compare(key, node.keys[i]) === 0) {
            return { node, index: i };
        }
        if (node.leaf) {
            return null;
        }
        return this.searchNode(node.children[i], key);
    }

    public search(key: T): T | null {
        const result = this.searchNode(this.root, key);
        if (result) {
            return result.node.keys[result.index];
        }
        return null;
    }

    public contains(key: T): boolean {
        return this.search(key) !== null;
    }

    private splitChild(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const newNode = new BTreeNode<T>(child.leaf);

        const midIndex = Math.floor(this.degree - 1);
        const midKey = child.keys[midIndex];

        newNode.keys = child.keys.slice(this.degree);
        child.keys = child.keys.slice(0, midIndex);

        if (!child.leaf) {
            newNode.children = child.children.slice(this.degree);
            child.children = child.children.slice(0, this.degree);
        }

        parent.children.splice(index + 1, 0, newNode);
        parent.keys.splice(index, 0, midKey);
    }

    private insertNonFull(node: BTreeNode<T>, key: T): void {
        let i = node.keys.length - 1;

        if (node.leaf) {
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            node.keys.splice(i + 1, 0, key);
        } else {
            while (i >= 0 && this.compare(key, node.keys[i]) < 0) {
                i--;
            }
            i++;
            if (node.children[i].keys.length === 2 * this.degree - 1) {
                this.splitChild(node, i);
                if (this.compare(key, node.keys[i]) > 0) {
                    i++;
                }
            }
            this.insertNonFull(node.children[i], key);
        }
    }

    public insert(key: T): void {
        const root = this.root;
        if (root.keys.length === 2 * this.degree - 1) {
            const newRoot = new BTreeNode<T>(false);
            this.root = newRoot;
            newRoot.children.push(root);
            this.splitChild(newRoot, 0);
            this.insertNonFull(newRoot, key);
        } else {
            this.insertNonFull(root, key);
        }
    }

    public insertMany(keys: T[]): void {
        for (const key of keys) {
            this.insert(key);
        }
    }

    private mergeChildren(parent: BTreeNode<T>, index: number): void {
        const child = parent.children[index];
        const sibling = parent.children[index + 1];

        child.keys.push(parent.keys[index]);
        child.keys.push(...sibling.keys);
        child.children.push(...sibling.children);

        parent.keys.splice(index, 1);
        parent.children.splice(index + 1, 1);
    }

    private deleteFromLeaf(node: BTreeNode<T>, index: number): void {
        node.keys.splice(index, 1);
    }

    private deleteFromNonLeaf(node: BTreeNode<T>, index: number): void {
        const key = node.keys[index];

        if (node.children[index].keys.length >= this.degree) {
            const predecessor = this.getPredecessor(node.children[index]);
            node.keys[index] = predecessor;
            this.deleteInternal(node.children[index], predecessor);
        } else if (node.children[index + 1].keys.length >= this.degree) {
            const successor = this.getSuccessor(node.children[index + 1]);
            node.keys[index] = successor;
            this.deleteInternal(node.children[index + 1], successor);
        } else {
            this.mergeChildren(node, index);
            this.deleteInternal(node.children[index], key);
        }
    }

    private getPredecessor(node: BTreeNode<T>): T {
        let current = node;
        while (!current.leaf) {
            current = current.children[current.children.length - 1];
        }
        return current.keys[current.keys.length - 1];
    }

    private getSuccessor(node: BTreeNode<T>): T {
        let current = node;
        while (!current.leaf) {
            current = current.children[0];
        }
        return current.keys[0];
    }

    private fillChild(node: BTreeNode<T>, index: number): void {
        if (index > 0 && node.children[index - 1].keys.length >= this.degree) {
            this.borrowFromPrev(node, index);
        } else if (
            index < node.children.length - 1 &&
            node.children[index + 1].keys.length >= this.degree
        ) {
            this.borrowFromNext(node, index);
        } else {
            if (index < node.children.length - 1) {
                this.mergeChildren(node, index);
            } else {
                this.mergeChildren(node, index - 1);
            }
        }
    }

    private borrowFromPrev(node: BTreeNode<T>, index: number): void {
        const child = node.children[index];
        const sibling = node.children[index - 1];

        child.keys.unshift(node.keys[index - 1]);
        node.keys[index - 1] = sibling.keys.pop()!;

        if (!child.leaf) {
            child.children.unshift(sibling.children.pop()!);
        }
    }

    private borrowFromNext(node: BTreeNode<T>, index: number): void {
        const child = node.children[index];
        const sibling = node.children[index + 1];

        child.keys.push(node.keys[index]);
        node.keys[index] = sibling.keys.shift()!;

        if (!child.leaf) {
            child.children.push(sibling.children.shift()!);
        }
    }

    private findKeyIndex(node: BTreeNode<T>, key: T): number {
        let index = 0;
        while (
            index < node.keys.length &&
            this.compare(key, node.keys[index]) > 0
        ) {
            index++;
        }
        return index;
    }

    public delete(key: T): void {
        this.deleteInternal(this.root, key);
        if (this.root.keys.length === 0 && !this.root.leaf) {
            this.root = this.root.children[0];
        }
    }

    private deleteInternal(node: BTreeNode<T>, key: T): void {
        const index = this.findKeyIndex(node, key);

        if (
            index < node.keys.length &&
            this.compare(key, node.keys[index]) === 0
        ) {
            if (node.leaf) {
                this.deleteFromLeaf(node, index);
            } else {
                this.deleteFromNonLeaf(node, index);
            }
        } else {
            if (node.leaf) {
                return;
            }

            let childIndex = index < node.keys.length ? index : index - 1;

            if (node.children[childIndex].keys.length < this.degree) {
                this.fillChild(node, childIndex);
            }

            if (childIndex > node.keys.length) {
                childIndex = node.keys.length;
            }

            this.deleteInternal(node.children[childIndex], key);
        }
    }

    public remove(key: T): void {
        this.delete(key);
    }

    public toArray(): T[] {
        const result: T[] = [];
        this.inOrderTraversal(this.root, result);
        return result;
    }

    private inOrderTraversal(node: BTreeNode<T>, result: T[]): void {
        for (let i = 0; i < node.keys.length; i++) {
            if (!node.leaf) {
                this.inOrderTraversal(node.children[i], result);
            }
            result.push(node.keys[i]);
        }
        if (!node.leaf) {
            this.inOrderTraversal(
                node.children[node.children.length - 1],
                result,
            );
        }
    }

    public size(): number {
        return this.countKeys(this.root);
    }

    private countKeys(node: BTreeNode<T>): number {
        let count = node.keys.length;
        if (!node.leaf) {
            for (const child of node.children) {
                count += this.countKeys(child);
            }
        }
        return count;
    }

    public isEmpty(): boolean {
        return this.root.keys.length === 0;
    }

    public clear(): void {
        this.root = new BTreeNode(true);
    }

    public min(): T | null {
        if (this.isEmpty()) return null;
        let current = this.root;
        while (!current.leaf) {
            current = current.children[0];
        }
        return current.keys[0];
    }

    public max(): T | null {
        if (this.isEmpty()) return null;
        let current = this.root;
        while (!current.leaf) {
            current = current.children[current.children.length - 1];
        }
        return current.keys[current.keys.length - 1];
    }

    public height(): number {
        return this.getHeight(this.root);
    }

    private getHeight(node: BTreeNode<T>): number {
        if (node.leaf) return 1;
        return 1 + this.getHeight(node.children[0]);
    }

    public toString(): string {
        return JSON.stringify(this.toArray());
    }
}
