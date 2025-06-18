import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://rxvrwxpljkpjsczlkikp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4dnJ3eHBsamtwanNjemxraWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMDc3MjYsImV4cCI6MjA2NTc4MzcyNn0.FyJqiFkPTzcPRslde2QUmYsT0ppHZXthCs6Q2zMBhwI"
);

export default function Search() {
  const router = useRouter();
  const { zip } = router.query;
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    if (!zip) return;
    const fetchAgents = async () => {
      const { data, error } = await supabase
        .from("agents")
        .select("name, zip, nmls")
        .eq("zip", String (zip));
      if (error) console.error(error);
      else setAgents(data);
    };
    fetchAgents();
  }, [zip]);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>Top Loan Agents in {zip}</h1>
      {agents.length ? (
        agents.map((agent, i) => (
          <div key={i}>
            <h2>{agent.name}</h2>
            <p>NMLS #{agent.nmls}</p>
          </div>
        ))
      ) : (
        <p>No agents found for this ZIP code.</p>
      )}
    </div>
  );
}

