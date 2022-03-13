import styled from "styled-components";

const StyledButton = styled.button`
  padding: ${({ padding }) => padding || "1em"};
  border: ${({ border }) => border || "none"};
  border-radius: 3px;
  background-color: ${({ primary, theme }) =>
    primary ? theme.colors.orange : theme.colors.white};
  color: ${({ primary, theme }) =>
    primary ? theme.colors.white : theme.colors.orange};
  box-shadow: 1px 1px 5px 0.5px rgba(0, 0, 0, 0.2);
  cursor: pointer;

  &:hover {
    filter: brightness(98%);
  }
`;

export default StyledButton;
