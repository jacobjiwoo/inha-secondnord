import styled from "styled-components";
import { LeftArrow } from "../../assets/svg";
import { useNavigate } from "react-router-dom";

function HeaderPrev({ prevPath }) {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="prev-button" onClick={() => navigate(prevPath)}>
        <LeftArrow fill={"black"} />
      </div>
    </Layout>
  );
}

export default HeaderPrev;

const Layout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  background-color: #fff;
  border-bottom: 1px solid #d9d9d9;

  & .prev-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1.5rem;
    cursor: pointer;
  }

  & svg {
    width: 1rem;
    height: 1.5rem;
  }
`;
