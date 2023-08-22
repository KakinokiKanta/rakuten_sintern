import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #bf0000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  color: white;
  position: relative;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 15px;
  cursor: pointer;
`;

export default function Header({ title, onExit }) {
  return (
    <StyledHeader>
      {title}
      <CloseButton onClick={onExit}>✕</CloseButton>
    </StyledHeader>
  );
}
