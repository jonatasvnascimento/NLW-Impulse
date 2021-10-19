import axios from "axios";

/*
    Receber code(String)
    Recuperar o acesso_token no github
    Recuperar infos do uer no github
    Verificar se o usuario existe no DB
        Sim = Gera um tokem
        Não = Cria no DB, gera um token
    Retorna o token com infos do user
*/

interface IAccessTokenResponse{
    access_token: string
}

interface IUserResponse{
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data:acessoTokenResponse} = await axios.post<IAccessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        const response = await axios.get<IUserResponse>("https://api.github.com/user", {
            headers: {
                authorization: `Bearer ${acessoTokenResponse.access_token}`
            }
        });

        return response.data;
    }
}

export { AuthenticateUserService }