import { PageTitle } from "configs/constants"
import { PageProps } from "layout"
import { UserRole } from "modules/users/interfaces"
import { GetStaticPropsResult } from "next"

export async function getStaticProps(): Promise<
  GetStaticPropsResult<PageProps>
> {
  return {
    props: {
      isDashboard: true,
      roles: [UserRole.MOD, UserRole.ADMIN],
      title: PageTitle.DASHBOARD_OVERVIEW,
    },
  }
}

export default function DashboardOverview() {
  return <div>overview</div>
}
