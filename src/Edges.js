export default class Edges {
    constructor() {
        this.right = [];
        this.left = [];
    }

    get shape() {
        return this.right.length > 0 ? (this.left.length > 0 ? 'BOTH' : 'RIGHT') : (this.left.length > 0 ? 'LEFT' : 'NONE');
    }

    get both() {
        return this.right.concat(this.left);
    }
}
