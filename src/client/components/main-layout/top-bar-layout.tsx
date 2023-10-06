import { FC, ReactNode } from "react";
import styled from "styled-components";
import './top-bar-layout.css'



interface TopBarLayoutProps {
    centerDiv: ReactNode;
    rightDiv: ReactNode;
}
  

const TopBarLayout: FC<TopBarLayoutProps> = ({centerDiv, rightDiv}) => {
    return (
        <div className="container">
            <div className="centered">
                {centerDiv}
            </div>
            <div className="right">
                {rightDiv}
            </div>
        </div>
    );
}

export default TopBarLayout;
