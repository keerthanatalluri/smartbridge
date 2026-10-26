import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { ProjectCard } from '../components/cards/ProjectCard';
import { CATEGORIES, POPULAR_SKILLS } from '../data/sampleData';
import {
  Search,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  Briefcase,
  Users,
  Award,
  DollarSign,
  Code,
  Smartphone,
  Cpu,
  Palette,
  Server,
  Cloud
} from 'lucide-react';

export const Home = () => {
  const { role, loginAs } = useAuth();
  const { projects } = useData();
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchKeyword.trim())}`);
    } else {
      navigate('/projects');
    }
  };

  const openProjects = projects.filter(p => p.status === 'Open');
  const featuredProjects = openProjects.slice(0, 4);

  const getCategoryCount = (catName) => {
    return projects.filter(p => p.category === catName).length;
  };

  const categoryIcons = {
    "Web Development": <Code size={22} color="#2563eb" />,
    "Mobile Apps": <Smartphone size={22} color="#10b981" />,
    "Design & Creative": <Palette size={22} color="#f59e0b" />,
    "AI & Machine Learning": <Cpu size={22} color="#8b5cf6" />,
    "Backend Architecture": <Server size={22} color="#06b6d4" />,
    "DevOps & Cloud": <Cloud size={22} color="#ec4899" />
  };

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        borderBottom: '1px solid var(--slate-200)',
        paddingTop: '4.5rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle background glow */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(37,99,235,0.08) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none'
        }} />

        <div className="max-w-7xl" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.9rem',
            backgroundColor: 'var(--primary-50)',
            border: '1px solid var(--primary-200)',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: 'var(--primary-700)',
            marginBottom: '1.5rem'
          }}>
            <Sparkles size={15} color="var(--primary-600)" />
            Next-Generation Freelance & Escrow Infrastructure
          </div>

          <h1 style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            fontWeight: 800,
            color: 'var(--slate-900)',
            letterSpacing: '-0.03em',
            maxWidth: '900px',
            margin: '0 auto 1.25rem',
            lineHeight: 1.15
          }}>
            Where Elite Clients Meet World-Class <span style={{
              background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Freelance Talent</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--slate-600)',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6
          }}>
            Execute mission-critical software, design systems, and AI models with verified milestone escrow, instant hiring workflows, and direct collaboration.
          </p>

          {/* Search Box */}
          <form
            onSubmit={handleSearch}
            style={{
              maxWidth: '640px',
              margin: '0 auto 1.5rem',
              display: 'flex',
              backgroundColor: '#ffffff',
              padding: '0.4rem',
              borderRadius: 'var(--radius-xl)',
              boxShadow: 'var(--shadow-xl)',
              border: '1px solid var(--slate-300)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '1rem', color: 'var(--slate-400)' }}>
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search projects by skills (e.g. React, Next.js, Python, UI/UX)..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                color: 'var(--slate-800)',
                background: 'transparent'
              }}
            />
            <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-lg)' }}>
              Search Projects
            </button>
          </form>

          {/* Quick Skill Chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', fontWeight: 600 }}>Popular:</span>
            {POPULAR_SKILLS.slice(0, 6).map((skill) => (
              <button
                key={skill}
                onClick={() => navigate(`/projects?skill=${encodeURIComponent(skill)}`)}
                style={{
                  background: '#ffffff',
                  border: '1px solid var(--slate-200)',
                  borderRadius: '9999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--slate-700)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary-400)';
                  e.currentTarget.style.color = 'var(--primary-700)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--slate-200)';
                  e.currentTarget.style.color = 'var(--slate-700)';
                }}
              >
                {skill}
              </button>
            ))}
          </div>

          {/* Live Persona Quick Selectors in Hero */}
          <div style={{
            maxWidth: '680px',
            margin: '3rem auto 0',
            backgroundColor: '#ffffff',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem',
            border: '1px solid var(--slate-200)',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)' }}>
                Instant Interactive Switcher
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-800)' }}>
                Test this marketplace as:
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => { loginAs('freelancer'); navigate('/dashboard/freelancer'); }}
                className="btn btn-secondary btn-sm"
                style={{ borderColor: role === 'freelancer' ? 'var(--primary-500)' : undefined }}
              >
                Freelancer (Alex)
              </button>
              <button
                onClick={() => { loginAs('client'); navigate('/dashboard/client'); }}
                className="btn btn-secondary btn-sm"
                style={{ borderColor: role === 'client' ? 'var(--primary-500)' : undefined }}
              >
                Client (Sarah)
              </button>
              <button
                onClick={() => { loginAs('admin'); navigate('/admin'); }}
                className="btn btn-secondary btn-sm"
                style={{ borderColor: role === 'admin' ? 'var(--danger-500)' : undefined }}
              >
                Admin (Console)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Banner */}
      <section style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '2.5rem 0' }}>
        <div className="max-w-7xl">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            textAlign: 'center'
          }}>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>$4.8M+</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Gross Platform Volume</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#34d399' }}>99.4%</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Milestone Escrow Completion</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>14,200+</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Vetted Tech Specialists</div>
            </div>
            <div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#c084fc' }}>&lt; 24h</div>
              <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Average Time-to-Hire</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section style={{ padding: '4.5rem 0' }}>
        <div className="max-w-7xl">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Expertise Tracks
              </span>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Browse by Specialization
              </h2>
            </div>
            <Link to="/projects" className="btn btn-secondary btn-sm">
              Explore All Categories <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1.5rem'
          }}>
            {CATEGORIES.filter(c => c !== 'All Categories' && c !== 'Writing & Translation').map((cat) => {
              const count = getCategoryCount(cat);
              const icon = categoryIcons[cat] || <Code size={22} color="#2563eb" />;

              return (
                <div
                  key={cat}
                  onClick={() => navigate(`/projects?category=${encodeURIComponent(cat)}`)}
                  className="card card-hover"
                  style={{
                    padding: '1.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    backgroundColor: 'var(--slate-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
                      {cat}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--slate-500)' }}>
                      {count} open project{count === 1 ? '' : 's'} waiting
                    </p>
                  </div>
                  <div style={{
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    color: 'var(--primary-600)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    View listings <ArrowRight size={14} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section style={{ padding: '4.5rem 0', backgroundColor: '#ffffff', borderTop: '1px solid var(--slate-200)', borderBottom: '1px solid var(--slate-200)' }}>
        <div className="max-w-7xl">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Active Opportunities
              </span>
              <h2 style={{ fontSize: '1.875rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Featured Client Projects
              </h2>
            </div>
            <Link to="/projects" className="btn btn-primary">
              View All {openProjects.length} Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Trust & Features */}
      <section style={{ padding: '5rem 0' }}>
        <div className="max-w-7xl">
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase' }}>
              Built for High-Stakes Delivery
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '0.5rem' }}>
              Why Tech Leaders Prefer FreelanceHub
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <ShieldCheck size={26} color="#2563eb" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Milestone Escrow Protection
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Funds remain secure in simulated platform escrow until you inspect deliverables and explicitly authorize fund release.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <TrendingUp size={26} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Instant Hiring Workflows
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Compare candidates side-by-side, inspect previous ratings, and hire with a single click. The system auto-updates pending bidders.
              </p>
            </div>

            <div className="card" style={{ padding: '2rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={26} color="#f59e0b" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                Collaborative Project Workspaces
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
                Unified workspace featuring real-time client-freelancer messaging, milestone status tracking, and deliverable review links.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        padding: '5rem 0',
        borderRadius: 'var(--radius-xl)',
        margin: '0 1.5rem 4rem'
      }}>
        <div className="max-w-5xl" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '1rem' }}>
            Ready to Accelerate Your Product Roadmap?
          </h2>
          <p style={{ fontSize: '1.0625rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Whether you are looking to hire top vetted talent or offer your elite expertise, join FreelanceHub today.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/post-project" className="btn btn-primary btn-lg">
              Post a Project as Client
            </Link>
            <Link to="/projects" className="btn btn-secondary btn-lg" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
              Explore Open Projects
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

