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
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);
`;

export default StyledButton;
