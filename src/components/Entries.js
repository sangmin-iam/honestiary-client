import { TiChartLineOutline } from "react-icons/ti";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Entries() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <TabWrapper>
        <div>
          <AiOutlineUnorderedList
            onClick={() => navigate("/entries/list")}
            className={pathname === "/entries/list" && "active"}
          />
        </div>
        <div>
          <TiChartLineOutline
            onClick={() => navigate("/entries/graph")}
            className={pathname === "/entries/graph" && "active"}
          />
        </div>
      </TabWrapper>
      <Outlet />
    </>
  );
}

const TabWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 4rem;

  div {
    margin: 1rem;
    cursor: pointer;
  }

  svg {
    color: ${({ theme }) => theme.colors.gray};
  }

  .active {
    color: ${({ theme }) => theme.colors.blueGreen};
  }
`;

export default Entries;
