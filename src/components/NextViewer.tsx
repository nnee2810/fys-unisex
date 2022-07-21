import dynamic from "next/dynamic"
import ViewerProps from "react-viewer/lib/ViewerProps"

const Viewer = dynamic(() => import("react-viewer"), { ssr: false })

export function NextViewer(props: ViewerProps) {
  return <Viewer {...props} zIndex={1500} />
}
