export class Article{

    constructor(
        public id_article: number,
        public titulo_article: string,
        public imagen_article: string,
        public contenido_article: string,
        public meta_article: string,
        public id_user: number,
        public foto_user: string,
        public name_user: string,
        public lastname_user: string,
        public id_category: number,
        public name_category: string,
        public status_article: number,
        public date_created_article: any,
        public date_updated_article: any
    ){}

    pruebas(){
        return "Soy el servicio de articulos";
    }
}