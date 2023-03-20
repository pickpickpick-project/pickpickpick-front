import { useNavigate } from "react-router";

const MovePage = (page:string) => {
    
    const movePage = useNavigate();
    const goToMovePage = () => {
        movePage(`/${page}`);
    }

    return goToMovePage;
}

export default MovePage;