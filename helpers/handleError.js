module.exports = function (err) {
    if (err.name == 'SequelizeValidationError') {
        return {errors: err.errors}
    } else {
        return {message: err.message};
    }
};