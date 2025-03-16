import NavBar from '@/features/shared/ui/nav-bar'
import { ReportsHeaderProps } from '@/types/Reports'
import Head from 'next/head'

const ReportsHeader = ({ analyticsType }: ReportsHeaderProps) => (
  <>
    <Head>
      <title>{`LabGraph - ${analyticsType.toUpperCase() || 'Quality-Lab-Pro'}`}</title>
    </Head>
    <NavBar />
  </>
)

export default ReportsHeader
