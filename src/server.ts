import { serverHttp } from "./app";

const PORT = 4000;
serverHttp.listen(PORT, () => console.log(`Server is run in port ${PORT}`));