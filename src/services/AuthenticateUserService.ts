import axios from "axios";

/*
    Receber code(String)
    Recuperar o acesso_token no github
    Verificar se o usuario existe no DB
        Sim = Gera um tokem
        Não = Cria no DB, gera um token
    Retorna o token com infos do user
*/


class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const reponse = await axios.post(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json"
            }
        });

        return reponse.data;
    }
}

export { AuthenticateUserService }