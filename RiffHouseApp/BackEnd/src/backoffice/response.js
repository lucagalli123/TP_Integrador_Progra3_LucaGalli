class Response {
    constructor(data, message, error) {
        this.data = data;
        this.message = message;
        this.error = error;
    }

    static success(data, message) {
        return new Response(data, message, null);
    }

    static error(message, error) {
        return new Response(null, message, error);
    }
}

export default Response;
