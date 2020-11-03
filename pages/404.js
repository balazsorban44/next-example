export default function NotFound(props) {

  return (
    <div>
This is a not found page
  <pre>
    {JSON.stringify(props, null, 2)}
  </pre>
    </div>
  )
}