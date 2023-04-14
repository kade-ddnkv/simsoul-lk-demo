import { GetServerSidePropsContext } from "next";

const serverSideAuthCheck = (context: GetServerSidePropsContext) => {
  const auth = context.req.cookies.auth
  if (!auth) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}

export { serverSideAuthCheck }