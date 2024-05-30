class ArgumentError extends Error {
    constructor(...params) {
        super();
        this.status = 400;
        this.message = 'Params invalid';
    }
}

export default ArgumentError;