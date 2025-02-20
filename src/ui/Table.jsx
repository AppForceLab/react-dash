/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../services/apiCabins";
import Spinner from "./Spinner";
import { createContext, useContext } from "react";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 1.2rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

// eslint-disable-next-line react/prop-types
function Table({ columns, children, ...props }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table" {...props}>
        {children}
      </StyledTable>
    </TableContext.Provider>
  );
}

Table.Header = function Header({ children, ...props }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" as='header' columns={columns}>
      {children}
    </StyledHeader>
  );
};

Table.Row = function Row({ children, ...props }) {
  const { columns } = useContext(TableContext);
  return <StyledRow role="row" columns={columns}>{children}</StyledRow>;
};

Table.Body = function Body({ data, columns, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
};

Table.Footer = Footer;

export default Table;
