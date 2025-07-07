import { useNavigate } from "react-router";
import styled from "styled-components";

const Cnt = styled.div``;
const Button = styled.button`
  padding: 8px 12px;
`;

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <Cnt>
      <span>landing page</span>
      <Button onClick={() => navigate("/editor")}>Editor</Button>
    </Cnt>
  );
};

export default LandingPage;
