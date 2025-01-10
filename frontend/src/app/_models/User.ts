export interface User{
    username: string;
    password:string;
    firstName : string;
    lastName: string;
    city: string;
    state: string;
    country: string;
    profilePicture: string;
    postalCode: string;
    address: string;
    role?:number
}