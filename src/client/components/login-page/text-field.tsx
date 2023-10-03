import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { COLOR_THEME, FONT_THEME } from '../../themes';

const Input = styled.input`
font-family: ${FONT_THEME.BRAND_FONT};
padding: 10px;
border-radius: 10px;
background-color: ${COLOR_THEME.LOGIN_TEXT_FIELD};
border-width: 0px;
color: ${COLOR_THEME.TEXT};
width: 30vw;
height: 4vh;
max-width: 300px;
font-size: 20px;

::-webkit-input-placeholder { /* Chrome, Edge, Safari */
    color: ${COLOR_THEME.TEXT};
}
::-moz-placeholder { /* Firefox 19+ */
    color: ${COLOR_THEME.TEXT};
}
:-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${COLOR_THEME.TEXT};
}
::placeholder { /* Most modern browsers */
    color: ${COLOR_THEME.TEXT} !important;
}
`

interface TextFieldProps {
  inputID: string;
  placeholder: string;
  hideText: boolean;
}

const TextField: FC<TextFieldProps> = ({ inputID, placeholder, hideText }) => (
  <Input type={hideText ? "password" : "text"} id={inputID} placeholder={placeholder} />
);

export default TextField;
