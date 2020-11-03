import {useRouter} from "next/router"
import path from "path"

export default function Slug(props) {
  const router = useRouter()

  if (router.isFallback || !props) {
    return "Skeleton page..."
  }

  return <pre>
    {JSON.stringify(props, null, 2)}
  </pre>

}

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true
//   }
// }

export async function getServerSideProps(ctx) {
  const url = ctx.req.url
  if (url.includes("not-found")) {
    return {
      notFound: true
    }
  }

  if (url.includes("should-redirect")) {
    return {
      redirect: {
        destination: "/redirected",
        permanent: true
      }
    }
  }

  if (url.includes("redirected")) {
    return {
      props: {
        content: "This is a page we redirected to"
      }
    }
  }
  
  return {
    props: {
      content: "This is a page without redirect"
    }
  }
}