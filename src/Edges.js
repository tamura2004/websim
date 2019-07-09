import { Right, Left, None, Both } from '@/Direction';

export default class Edges {
    constructor() {
        this.right = [];
        this.left = [];
    }

    get shape() {
        return this.right.length > 0 ? (this.left.length > 0 ? Both : Right) : (this.left.length > 0 ? Left : None);
    }

    get both() {
        return this.right.concat(this.left);
    }
}
