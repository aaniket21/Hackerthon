import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Heart } from 'lucide-react';
import { MetricCard } from './components/MetricCard';
import { DataTable } from './components/DataTable';
import { HealthData } from './types';
import AskAI from './components/AskAI';

function App() {
  const [data, setData] = useState<HealthData[]>([]);
  
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

  const handleAppointment = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSd2cHWhX0knKThcRiekh1Szf4jRzSiltuGtDOkB59UuUg-NQw/viewform', '_blank');
  };

  // Generate ML prediction based on recent data
  const generateMLPrediction = (recentData: HealthData[]) => {
    if (recentData.length < 5) return 'Gathering Data...';
    
    const lastTemp = recentData[recentData.length - 1].temperature;
    const lastHR = recentData[recentData.length - 1].humidity; // using humidity as heart rate
    const lastSpO2 = recentData[recentData.length - 1].spo2;
    
    // Simple rule-based prediction
    if (lastTemp > 38 || lastTemp < 35) {
      return 'Check Required - Temperature';
    }
    if (lastHR > 100 || lastHR < 60) {
      return 'Check Required - Heart Rate';
    }
    if (lastSpO2 < 95) {
      return 'Check Required - SpO2';
    }
    
    return 'Normal';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newData: HealthData = {
        timestamp: new Date(),
        temperature: 36.5 + Math.random() * 2,
        humidity: 75 + Math.random() * 25, // Simulating heart rate (60-100 bpm)
        spo2: 95 + Math.random() * 3,
        prediction: 'Processing...'
      };
      
      setData(prev => {
        const updatedData = [...prev.slice(-20), newData];
        // Update prediction using ML simulation
        updatedData[updatedData.length - 1].prediction = generateMLPrediction(updatedData);
        return updatedData;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const getLatestMetric = (key: keyof HealthData) => {
    if (data.length === 0) return 0;
    return data[data.length - 1][key] as number;
  };

  const calculateTrend = (key: keyof HealthData) => {
    if (data.length < 2) return 0;
    const current = data[data.length - 1][key] as number;
    const previous = data[data.length - 2][key] as number;
    return ((current - previous) / previous) * 100;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'https://drive.google.com/uc?export=download&id=1PEvb3f0asH-4_mlpxiBikSx5Wp3_jADy';
    link.download = 'patient_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Monitoring Dashboard</h1>
            <p className="text-gray-600 mt-1">Real-time health metrics with AI predictions</p>
          </div>
          <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
            Download Report
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MetricCard
            title="Temperature"
            value={Number(getLatestMetric('temperature').toFixed(1))}
            unit="°C"
            icon={<Thermometer className="text-red-500" />}
            trend={Number(calculateTrend('temperature').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
          <MetricCard
            title="Heart Rate"
            value={Number(getLatestMetric('humidity').toFixed(1))}
            unit="bpm"
            icon={<Heart className="text-pink-500" />}
            trend={Number(calculateTrend('humidity').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
          <MetricCard
            title="SpO2"
            value={Number(getLatestMetric('spo2').toFixed(1))}
            unit="%"
            icon={<Droplets className="text-blue-500" />}
            trend={Number(calculateTrend('spo2').toFixed(1))}
            prediction={data[data.length - 1]?.prediction || 'Loading...'}
          />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Metrics Over Time</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={(time) => new Date(time).toLocaleTimeString()} />
                <YAxis />
                <Tooltip labelFormatter={(label) => new Date(label).toLocaleTimeString()} />
                <Line type="monotone" dataKey="temperature" stroke="#ef4444" name="Temperature (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="#ec4899" name="Heart Rate (bpm)" />
                <Line type="monotone" dataKey="spo2" stroke="#3b82f6" name="SpO2 (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Measurements</h2>
          <DataTable data={data} />
        </div>

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

        <AskAI />
      </div>
    </div>
  );
}

export default App;
