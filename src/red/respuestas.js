exports.success = function (req, res, mensaje= '', status = 200) {
    res.status(status).send({
        error: '',
        status: status,
        body: mensaje
    });
}

exports.error = function (req, res, mensaje ='Internal server error' , status = 500) {
    res.status(status).send({
        error: true,
        status: status,
        body: mensaje
    });
}