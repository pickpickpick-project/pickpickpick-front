import { useNavigate } from "react-router";

const MovePage:any = (page:string) => {
    
    const movePage = useNavigate();
    const goToMovePage = () => {
        movePage(`/${page}`);
    }

    return goToMovePage;
}

export default MovePage;