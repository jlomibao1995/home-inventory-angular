export class User {

    constructor(public name: String,
        public email: String,
        public active: boolean,
        public id: number,
        public password: String,
        public role: {
             id: number,
             roleName: String 
        },
        public items: {
            itemName: String,
            price: number,
            category: {
                id: number,
                categoryName: String
            }
        }){

        }
}