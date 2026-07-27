//import { NextPageContext } from "next";
import { Layout } from "features/layout";
import { PageProps } from "main";

function Error({
  statusCode,
  message,
  ...props
}: PageProps & {
  statusCode: number;
  message: string;
}) {
  return (
    <Layout {...props}>
      {/* {`Une erreur ${
        statusCode ? `(${statusCode})` : ""
      } est survenue : ${message}`} */}
      Erreur !
    </Layout>
  );
}

// Error.getInitialProps = (ctx: NextPageContext) => {
//   const { res, err } = ctx;
//   const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
//   const message = err?.message || "aucun message d'erreur";
//   console.log("🚀 ~ message:", message);
//   return { statusCode, message };
// };

export default Error;
