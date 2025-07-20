import * as S from "./Footer.styles";

export const Footer = () => {
  return (
    <S.Footer>
      <p>
        © mikey diserio 2025
        <br />
        this tool was built as part of the assessment put forward by Firmable.
      </p>
      <p>
        ABN: ## ### ### ## | All data is provided subject to the Australian Open
        Data License
      </p>
      <p>
        Original data set that provided the basis for this app can be found
        here:https://data.gov.au/data/dataset/abn-bulk-extract{" "}
      </p>
    </S.Footer>
  );
};

export default Footer;
