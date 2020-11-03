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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps(ctx) {
  const slug = ctx.params.slug
  const url = slug && path.join("/", ...(Array.isArray(slug) ? slug : [slug]))
  if (url.includes("not-found")) {
    return {
      notFound: true,
      revalidate: 1
    }
  }

  if (url.includes("should-redirect")) {
    return {
      redirect: {
        destination: "/redirected",
        permanent: true
      },
      revalidate: 1
    }
  }

  if (url.includes("redirected")) {
    return {
      props: {
        content: "This is a page we redirected to"
      },
      revalidate: 1
    }
  }
  
  return {
    props: {
      content: "This is a page without redirect"
    },
    revalidate: 1
  }
}