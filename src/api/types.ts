
//포트폴리오
export interface Portfolio {
    portfolioNum: number;
    userNum: number;
    portfolioDetail:string;
    portfolioType:number;
    portfolioDate:string;
}

export interface PortfolioImg {
    portfolioImgNum: number;
    portfolioNum: number;
    portfolioImgOriginName: string;
    portfolioImgName: string;
    portfolioImgAddr: string;
    // 지우기
    url: string;
}

//좋아요
export interface Favorites {
    favoritesNum: number;
    userNum: number;
    portfolioNum: number;
}