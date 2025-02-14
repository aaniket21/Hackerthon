import React from 'react';

const team = [
  {
    name: 'Vitthal Choudhary',
    role: 'Cardiologist',
    education: 'M.D in Heart Transplant',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Lakshay Chhabra',
    role: 'Neurologist',
    education: 'Ph.D in Brain',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Suresh Khanna',
    role: 'Dental',
    education: 'MDS/BDS',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300&h=300'
  },
  {
    name: 'Ronak Sharma',
    role: 'Physiologist',
    education: 'PhD in physiology',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300&h=300'
  }
];

const TeamSection = () => {
  const handleAppointment = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2cHWhX0knKThcRiekh1Szf4jRzSiltuGtDOkB59UuUg-NQw/viewform', '_blank');
  };

  return (
    <section className="py-20 bg-white rounded-xl shadow-lg" id="team">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Schedule an Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-600 rounded-xl p-6 text-center shadow-lg hover:shadow-emerald-500/10 transition-all hover:-translate-y-1 cursor-pointer"
              onClick={handleAppointment}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleAppointment();
                }
              }}
            >
              <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" />
              <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
              <p className="text-emerald-500 mb-2">{member.role}</p>
              <p className="text-white text-sm">{member.education}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
