import styled from "styled-components";

const Layout = styled.View`
  ${props => props.padding ? `padding: ${props.padding}px` : "padding: 0px;"}
  ${props => props.color ? `background-color: ${props.color}` : "background-color: transparent;"}
  ${props => props.row ? "flex-direction: row;" : "flex-direction: column;"}
  ${props => props.space && "justify-content: space-between;"}
  ${props => props.positionR && "justify-content: flex-end;"}
  ${props => props.positionL && "justify-content: flex-start;"}
  ${props => props.positionC && "justify-content: center;"}
  ${props => props.center && "align-items: center;"}
  ${props => props.right && "align-items: flex-end;"}
  ${props => props.border && "border-radius:" + props.border + "px" + ";"}
  ${props => props.wrap && "flex-wrap: wrap;"}
  width: 100%;
  height: auto
`;

export { Layout};
