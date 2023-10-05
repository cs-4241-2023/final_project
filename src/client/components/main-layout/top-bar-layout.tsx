import { FC, ReactNode } from "react";
import styled from "styled-components";

const Flex1 = styled.div`
flex: 1;
align-items: center;
`

const StyledTopBarLayout = styled.div`
    width: 100vw; 
    align-items: center;
`;

interface TopBarLayoutProps {
    centerDiv: ReactNode;
    rightDiv: ReactNode;
  }
  

const TopBarLayout: FC<TopBarLayoutProps> = ({centerDiv, rightDiv}) => {
    return (
        <StyledTopBarLayout className="text-center d-flex w-100" id="div1">
            <Flex1 className="d-flex" /> {/* spacer */}
            <Flex1 className="d-flex justify-content-center" id="div2">
                {centerDiv}
            </Flex1>
            <Flex1 className="d-flex justify-content-end" id="div3">
                {rightDiv}
            </Flex1>
        </StyledTopBarLayout>
    );
}

export default TopBarLayout;
