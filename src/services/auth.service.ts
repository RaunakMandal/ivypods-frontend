import { ApiService } from "./api.service";

const user_exists = (params: any) => {
   return ApiService.post('user/user-exists', params);
};

const signin = (params: any) => {
    return ApiService.post('user/signin', params);
};

const signup = (params: any) => {
    return ApiService.post('user/signup', params);
};

export const AuthService = {
    user_exists, signin, signup
};
