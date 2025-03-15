import React from 'react';
import { TeamMemberCard } from './Cards';

const teamMembers = [
  {
    name: '#',
    role: 'Desenvolvedora Frontend',
    image: '/team/member1.jpg',
    bio: 'Especialista em React e TypeScript com 5 anos de experiência.',
    social: {
      linkedin: 'https://linkedin.com/in/#',
      github: 'https://github.com/#'
    }
  },
  {
    name: '#',
    role: 'UX Designer',
    image: '/team/member2.jpg',
    bio: 'Designer com foco em experiências digitais e interfaces intuitivas.',
    social: {
      linkedin: 'https://linkedin.com/in/#',
      github: 'https://github.com/#'
    }
  },
  {
    name: '#',
    role: 'Desenvolvedora Backend',
    image: '/team/member3.jpg',
    bio: 'Especialista em Node.js e arquitetura de microsserviços.',
    social: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    name: '#',
    role: 'DevOps',
    image: '/team/member4.jpg',
    bio: 'Especialista em CI/CD e infraestrutura como código.',
    social: {
      linkedin: 'https://linkedin.com/in/#',
      github: 'https://github.com/#'
    }
  }
];

const Team = () => {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-textPrimary sm:text-4xl">
            Our Team
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-xl text-textSecondary sm:mt-4">
            Let me show you.
          </p>
        </div>
        
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
