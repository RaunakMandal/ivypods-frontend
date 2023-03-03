import { ApiService } from "./api.service";

const getContacts = (params: any) => {
    return ApiService.get('contacts', params);
};

const addContact = (params: any) => {
    return ApiService.post('contacts/add-contact', params);
};

const updateContact = (_id: string, params: any) => {
    return ApiService.put(`contacts/update-contact/${_id}`, params);
};

const deleteContact = (_id: string, params: any) => {
    return ApiService.delete(`contacts/delete-contact/${_id}`, params);
};

export const ContactsService = {
    getContacts, addContact, updateContact, deleteContact
};