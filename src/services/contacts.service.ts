import { ApiService } from "./api.service";

const getContacts = (params: any) => {
    return ApiService.get('contacts/', params);
};

export const ContactsService = {
    getContacts
};