import styled from "styled-components";

const TagStyle = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 16px;
  color: rgb(154, 155, 167);
  border: 1px solid rgb(228, 229, 237);
  background-color: transparent;
  display: flex;
  line-height: normal;
  cursor: pointer;
`;

interface Tag {
  tag: string;
}

const ModalTag = ({ tag }: Tag) => {
  return <TagStyle># {tag}</TagStyle>;
};

export default ModalTag;
