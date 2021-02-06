import http from "../http-common";

const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}
class UploadProductoService {    
    upload(data) {
        return http.post("/newProd", data, config);
    }
    getAllProductos() {
        return http.get("getProd");
    }
    getAllTemporadas() {
        return http.get("/getTemp");
    }
    getAllCatProd() {
        return http.get("/getCat")
    }
}

export default new UploadProductoService();