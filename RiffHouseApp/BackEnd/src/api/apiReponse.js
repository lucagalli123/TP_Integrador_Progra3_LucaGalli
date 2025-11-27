class ApiResponse {
    constructor(data, message, error) {
        this.data = data;
        this.message = message;
        this.error = error;
    }

    static success(data, message) {
        return new ApiResponse(data, message, null);
    }

    static error(message, error) {
        return new ApiResponse(null, message, error);
    }
}

export default ApiResponse;
