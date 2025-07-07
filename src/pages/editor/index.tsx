import styled from "styled-components";
import Footer from "./Footer";
import Content from "./Content";
import { useNavigate } from "react-router";

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
  cursor: pointer;
`;
const LeftMenuContent = styled.div`
  flex-grow: 1;
`;

const EditorPage = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    const result = window.confirm(
      "페이지를 벗어납니다. 저장되지 않은 변경 사항이 사라질 수 있습니다."
    );
    if (result) {
      navigate("/");
    }
  };
  return (
    <Cnt>
      <LeftMenu>
        <LeftMenuTitle onClick={handleHome}>Pin.</LeftMenuTitle>
        <LeftMenuContent></LeftMenuContent>
        <Footer />
      </LeftMenu>
      <Content />
    </Cnt>
  );
};

export default EditorPage;
