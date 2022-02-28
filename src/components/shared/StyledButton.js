import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${({ padding }) => padding || "1rem"};
  border: ${({ border }) => border || "none"};
  border-radius: 3px;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.orange : theme.colors.white};
  color: ${({ primary, theme }) =>
    primary ? theme.colors.white : theme.colors.orange};
  cursor: pointer;
`;

export default StyledButton;
