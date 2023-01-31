
import { useNavigate } from "react-router";



const useMovePage:any = (page:string) => {
    
    const movePage = useNavigate();
    const goToMovePage = () => {
        movePage(`/${page}`);
    }

    return goToMovePage;
}

export default useMovePage;