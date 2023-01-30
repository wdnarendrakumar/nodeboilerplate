class ApiError extends Error {
    constructor(statuscode, message, isoperational = true, stack = '') {
        super(message)
        this.statuscode = statuscode
        this.isoperational = isoperational
        if(stack){
            this.stack = stack
        }
        else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}


module.exports = ApiError