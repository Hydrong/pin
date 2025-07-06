import styled from "styled-components";

const Cnt = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  gap: 4px;
`;
const Sec = styled.div``;
const SecTitle = styled.div`
  color: #b0b0b0;
  font-size: 12px;
  display: block;
  text-align: center;
`;
const SecContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 4px;
`;
const P = styled.p`
  color: #b0b0b0;
  font-size: 12px;
  display: block;
  width: fit-content;
`;

export default function Footer() {
  return (
    <Cnt>
      <Sec>
        <SecTitle>폰트</SecTitle>
        <SecContent>
          <P>한국기계연구원, kimm.re.kr</P>
          <P>비트로, vitro.co.kr</P>
        </SecContent>
      </Sec>
    </Cnt>
  );
}
