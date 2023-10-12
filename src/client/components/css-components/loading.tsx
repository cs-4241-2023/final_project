import styled from "styled-components";
import { FONT_THEME } from "../../themes";
import { FC } from "react";

const LoadingContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const LoadingText = styled.p`
font-size: 60px;
font-family: ${FONT_THEME.BRAND_FONT}};
`

export const Loading: FC = () => {

    return <LoadingContainer><LoadingText>Loading...</LoadingText></LoadingContainer>

};