import styled from "styled-components";

function HeaderHome() {
  return (
    <Layout>
      <div className="header-logo">{"SecondNORD"}</div>
    </Layout>
  );
}

export default HeaderHome;

const Layout = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
  padding-left: 2rem;
  border-bottom: 1px solid #d9d9d9;
  background-color: #fff;

  & .header-logo {
    font-size: 1.25rem;
    font-weight: 800;
    color: #9852f9;
    cursor: pointer;
  }
`;
