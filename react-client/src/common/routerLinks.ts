interface ILinks {
    [key: string]: string
}

const routerLinks = (name: string) => {
    const links: ILinks = {
        Home: '/',
        login: '/login',
        signup: '/signup',
    };


    return links[name];
};
export default routerLinks;
