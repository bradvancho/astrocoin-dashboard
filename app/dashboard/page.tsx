'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import RiskScoreChart from '../components/RiskScoreChart';

interface RiskScoreData {
  timestamp: string;
  risk_score: number;
}

export default function Dashboard() {
  const [riskData, setRiskData] = useState<RiskScoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRiskData() {
      try {
        const { data, error } = await supabase
          .from('risk_events')
          .select('timestamp, risk_score')
          .order('timestamp', { ascending: true });

        if (error) throw error;

        setRiskData(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchRiskData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Risk Score Dashboard</h1>
      <div className="grid grid-cols-1 gap-8">
        <RiskScoreChart data={riskData} />
      </div>
    </div>
  );
} 