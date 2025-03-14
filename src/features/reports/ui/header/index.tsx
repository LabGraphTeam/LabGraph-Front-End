import NavBar from '@/features/shared/ui/nav-bar'
import Head from 'next/head'
import { ReportsHeaderProps } from '../../types/Reports'

const ReportsHeader = ({ analyticsType }: ReportsHeaderProps) => (
  <>
    <Head>
      <title>{`LabGraph - ${analyticsType.toUpperCase() || 'Quality-Lab-Pro'}`}</title>
    </Head>
    <NavBar />
  </>
)

export default ReportsHeader
