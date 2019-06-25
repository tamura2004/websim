export default class Nodes {
    constructor() {
        this.right = null;
        this.left = null;
    }

    get shape() {
        return this.right ? (this.left ? 'BOTH' : 'RIGHT') : (this.left ? 'LEFT' : 'NONE');
    }
}
