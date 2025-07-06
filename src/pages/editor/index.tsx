import styled from "styled-components";
import Footer from "./Footer";
import Content from "./Content";

const Cnt = styled.div`
  color: #eee;
  display: flex;
  height: 100vh;
`;
const LeftMenu = styled.div`
  width: 300px;
  height: 100%;
  border-right: 1px solid #333;
  display: flex;
  flex-direction: column;
`;
const LeftMenuTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 42px;
  padding: 30px;
`;
const LeftMenuContent = styled.div`
  flex-grow: 1;
`;

const EditorPage = () => {
  return (
    <Cnt>
      <LeftMenu>
        <LeftMenuTitle>Pin.</LeftMenuTitle>
        <LeftMenuContent></LeftMenuContent>
        <Footer />
      </LeftMenu>
      <Content />
    </Cnt>
  );
};

export default EditorPage;
