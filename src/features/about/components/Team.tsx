import { teamMembers } from '../constants/teamMembers'
import { TeamMemberCard } from './Cards'

const Team = () => {
  return (
    <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='mb-4 text-center text-3xl font-semibold text-textPrimary'>Our Team</h2>
      <p className='mx-auto mb-12 max-w-2xl text-center text-textSecondary'>
        Meet the experts behind our platform
      </p>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} {...member} />
        ))}
      </div>
    </div>
  )
}

export default Team
