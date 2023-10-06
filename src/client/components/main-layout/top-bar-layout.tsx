import { FC, ReactNode } from "react";
import styled from "styled-components";

const Flex1 = styled.div`
`

const StyledTopBarLayout = styled.div`
    width: 100vw; 
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`;

interface TopBarLayoutProps {
    centerDiv: ReactNode;
    rightDiv: ReactNode;
  }
  

const TopBarLayout: FC<TopBarLayoutProps> = ({centerDiv, rightDiv}) => {
    return (
        <StyledTopBarLayout>
            <Flex1/> {/* spacer */}
            <Flex1>
                {centerDiv}
            </Flex1>
            <Flex1>
                {rightDiv}
            </Flex1>
        </StyledTopBarLayout>
    );
}

export default TopBarLayout;
