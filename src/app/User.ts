export class User {

    constructor(public id: number,
        public email: String,
        public active: boolean,
        public name: String,
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