export class ArticleEdit{

    constructor(
        public id_article: any,
        public id_user_article: any,
        public titulo_article: any,
        public imagen_article: any,
        public contenido_article: any,
        public id_categoy_article: any,
        public meta_article: any,
        public status_article: any,        
    ){}

    pruebas(){
        return "Soy el servicio de articulos";
    }
}